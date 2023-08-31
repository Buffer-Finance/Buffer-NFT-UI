import { Navbar } from './Views/Common/Navbar';
import { Routes, Route } from 'react-router-dom';
import Background from './AppStyles';
import { Alert, Snackbar } from '@mui/material';
import { atom, useAtom } from 'jotai';
import { Warning } from '@Views/Common/Notification/warning';
import TnCModal from '@Views/Common/TnCModal';
import SideBar from '@Views/Common/Sidebar';
import { NFTView } from '@Views/NFTView';
import { useProvider, useSigner } from 'wagmi';
import { ThirdwebSDKProvider } from '@thirdweb-dev/react';

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
        clientId="c34920df0ebf0f6933080ee61bb43db5"
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
          <div>
            Buffer{' '}
            <a href="https://app.buffer.finance/" target="_blank">
              <span className="underline underline-offset-2">V2.5 </span>
            </a>
            is live on Mainnet.{' '}
            {/* <a href="https://app.buffer.finance/" target="_blank">
                    <span className="underline underline-offset-2">
                      Learn More
                    </span>{' '}
                    <ShareIcon className=" scale-[0.65] w-fit inline" />
                  </a> */}
          </div>
        }
        closeWarning={() => {}}
        shouldAllowClose={false}
        state={true}
        className="disclaimer"
      />

      <TnCModal />
      <SideBar />
    </Background>
  );
}

export default App;
