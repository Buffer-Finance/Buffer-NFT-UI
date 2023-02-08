import { Navbar } from './Views/Common/Navbar';
import { Routes, Route, Link } from 'react-router-dom';
import Background from './AppStyles';
import { Alert, Snackbar } from '@mui/material';
import { atom, useAtom } from 'jotai';
import { Warning } from '@Views/Common/Notification/warning';
import TnCModal from '@Views/Common/TnCModal';
import SideBar from '@Views/Common/Sidebar';
import { NFTView } from '@Views/NFTView';
import { useProvider, useSigner } from 'wagmi';
import { ThirdwebSDKProvider } from '@thirdweb-dev/react';

function AppComponent() {
  return (
    <div className=" text-blue-1 font-bold">
      <div className="main">
        <ul>
          <Link to={'/faucet'}>Faucet</Link>
          <Link to={'/home'}>Home</Link>
        </ul>
      </div>
    </div>
  );
}

export const desiredChainId =
  import.meta.env.VITE_ENV.toLowerCase() === 'mainnet' ? 42161 : 421613;

const AppRoutes = () => {
  return (
    <div className="root w-[100vw]">
      <Routes>
        <Route path="/*" element={<NFTView />} />
      </Routes>
    </div>
  );
};

export const snackAtom = atom<{
  message: null | React.ReactNode;
  severity?: 'success' | 'warning' | 'info' | 'error';
}>({
  message: null,
});

function App() {
  const [snack, setSnack] = useAtom(snackAtom);
  const provider = useProvider({ chainId: desiredChainId });
  const { data: signer } = useSigner({ chainId: desiredChainId });
  return (
    <Background>
      <Navbar />
      <ThirdwebSDKProvider
        desiredChainId={desiredChainId}
        provider={provider}
        signer={signer}
      >
        <AppRoutes />
      </ThirdwebSDKProvider>

      <Snackbar
        open={snack.message ? true : false}
        autoHideDuration={3500}
        onClose={() => setSnack({ message: null })}
        action={null}
      >
        <Alert
          onClose={() => setSnack({ message: null })}
          severity={snack.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
      <Warning
        body={
          <>
            $BFR token 0x1A5B0aaF478bf1FDA7b934c76E7692D722982a6D has been
            listed on Uniswap V3 Arbitrum. Don't trade $iBFR token on
            PancakeSwap or Apeswap on BNB chain.
          </>
        }
        closeWarning={() => {}}
        shouldAllowClose={false}
        state={true}
        className="disclaimer"
      />
      {/* <ConnectionDrawer className="open" /> */}

      <TnCModal />
      <SideBar />
    </Background>
  );
}

export default App;
