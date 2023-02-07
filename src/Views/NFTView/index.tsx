import { divide } from '@Utils/utils/NumString/stringArithmatics';
import Drawer from '@Views/Common/V2-Drawer';
import { ClaimedNFT } from './Claimed';
import { MoleAnimatedSection } from './MoleAnimatedSection';
import { ClaimButton, PhaseData, WhiteListTag } from './PhaseData';
// import Head from "next/head";
import { useNFTData } from './useNFTData';
import FrontArrow from 'src/SVG/frontArrow';
import { BuyNFTodal } from './BuyNFTModal';
import { atom } from 'jotai';
import BufferInput from '@Views/Common/BufferInput';
import { useRef, useState } from 'react';
import { BlueBtn } from '@Views/Common/V2-Button';
import WhitelistData from './whitelist.json';
import { useToast } from '@Contexts/Toast';
import useStopWatch from '@Hooks/Utilities/useStopWatch';
import { CONTRACTS } from './Address';
import { TimerBox } from './TimerBox';
import { getDistance } from '@Hooks/Utilities/stakingUtilities';
import { ThirdwebSDKProvider } from '@thirdweb-dev/react';
import { useProvider, useSigner } from 'wagmi';

export const nftAtom = atom<{ isBuyModalOpen: boolean }>({
  isBuyModalOpen: false,
});

export const NFTContract =
  import.meta.env.VITE_ENV.toLowerCase() === 'mainnet'
    ? CONTRACTS[42161].nft
    : CONTRACTS[421613].nft;

const nftSaleTimeStamp = 1674144000;

export const nftGraphqlURL =
  import.meta.env.VITE_ENV.toLowerCase() === 'mainnet'
    ? 'https://api.thegraph.com/subgraphs/name/bufferfinance/mainnet-lite'
    : 'https://api.thegraph.com/subgraphs/name/bufferfinance/sandbox-lite';

// const nftSaleTimeStamp = 1673954750;

interface INFTView {}
const NFTView: React.FC<{}> = ({}) => {
  return (
    <>
      <main className="content-drawer">
        <NFTViewPage />
      </main>
      <Drawer open={false}>
        <></>
      </Drawer>
    </>
  );
};

// value x 100
const NFTViewPage: React.FC<INFTView> = ({}) => {
  const {
    conditions,
    currentPhase,
    isLoading,
    whitelistData,
    mintNFT,
    supply,
    contract,
    isConditionsLoading,
    NftsInCurrentPhase,
  } = useNFTData();
  const distance = getDistance(nftSaleTimeStamp);
  const stopwatch = useStopWatch(nftSaleTimeStamp);
  const scollToRef = useRef(null);
  const isSaleStarted = distance <= 0;
  let content;

  if (!isSaleStarted) {
    content = (
      <div ref={scollToRef}>
        <PreSaleSection launchTimeStamp={nftSaleTimeStamp} />
      </div>
    );
  } else {
    content = (
      <>
        <div ref={scollToRef}>
          <PhaseData
            conditions={conditions}
            currentPhase={currentPhase}
            wishlistData={whitelistData}
            totalMinted={supply?.toNumber()}
            isDisabled={!contract || !conditions}
            isConditionsLoading={isConditionsLoading}
            NftsInCurrentPhase={NftsInCurrentPhase}
          />
        </div>
        <ClaimedNFT />
      </>
    );
  }

  return (
    <div className=" transition-all duration-[5000ms] ease-out">
      <BuyNFTodal
        onClick={mintNFT}
        price={
          whitelistData.data?.price
            ? whitelistData.data?.price
            : conditions && conditions.length > 0
            ? divide(
                conditions[currentPhase].price as any,
                conditions[currentPhase].currencyMetadata.decimals
              )
            : null
        }
        isLoading={isLoading}
        isDisabled={isLoading || !contract || !conditions}
      />
      <div className="nft-wrapper w-full nsm:overflow-y-hidden">
        {/* <Head>
          <title>Buffer | Prime Club</title>
        </Head>{' '} */}
        <div className="nft-container w-full   relative  !overflow-hidden">
          <h1 className="text-center text-[60px] font-semibold sm:mb-3 sm:mt-3 sm:text-[30px] mb-7">
            The{' '}
            <span className="text-buffer-blue blue-text-shadow">
              Optopi Collection
            </span>
          </h1>
          <MoleAnimatedSection />

          <svg
            width={'100vw'}
            className="absolute bottom-[-1px] "
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1039.29 82.9506C831.497 82.9506 794.487 32.0969 587 32.0969C379.203 32.0969 416.214 82.9506 208.727 82.9506C104.208 82.9506 52.4144 41.4752 0 0V99.5H385.5H723.5H1440V10.6707C1247.09 18.2745 1242.13 82.9506 1039.29 82.9506Z"
              fill="#232334"
            />
          </svg>
        </div>
        <div className="pb-8 w-full flex-col sm:flex bg-[#232334] pt-4 flex-1 h-full sm:justify-evenly">
          <div className="text-3 text-f18 m-auto w-[900px] leading-relaxed sm:leading-normal sm:text-f16 my-5 b1000:w-auto b1000:px-4">
            <p className="mt-3 text-center">
              Optopi is a collection of 8,888 unique, collectible PFP-friendly
              NFTs on Arbitrum it offers key utility to traders on the Buffer
              Finance Platform. The Optopi collection is divided into four
              tiers:
              <span className="font-semibold text-[#fff]">
                &nbsp; Diamond, Platinum, Gold,{' '}
              </span>{' '}
              and&nbsp;
              <span className="font-semibold text-[#fff]">Silver</span>. Diamond
              is the rarest to mint, and Silver is the most common.
              <span
                className="light-blue-text  whitespace-nowrap ml6  hover:underline  cursor-pointer"
                onClick={() => {
                  window.open(
                    'https://buffer-finance.medium.com/introducing-optopi-48bdc705e53',
                    '_blank'
                  );
                }}
              >
                <span className="whitespace-nowrap">
                  Read more
                  <FrontArrow className="tml w-fit inline" />
                </span>
              </span>
            </p>
          </div>

          <div className="flex justify-center items-center gap-x-[25px] sm:gap-5 sm:flex-col-reverse">
            {isSaleStarted && (
              <>
                <WhiteListTag
                  wishlistData={whitelistData}
                  NftsInCurrentPhase={NftsInCurrentPhase}
                />{' '}
                <ClaimButton
                  isDisabled={!contract || !conditions}
                  conditions={conditions}
                  currentPhase={currentPhase}
                  NftsInCurrentPhase={NftsInCurrentPhase}
                  shouldNotShowMints
                  price={
                    whitelistData.data?.price
                      ? whitelistData.data?.price
                      : conditions && conditions.length > 0
                      ? divide(
                          conditions[currentPhase].price as any,
                          conditions[currentPhase].currencyMetadata.decimals
                        )
                      : null
                  }
                />
                <div
                  className={`flex items-center justify-center hover:brightness-125 h-[fit-content]`}
                >
                  <a
                    href="https://opensea.io/collection/the-optopi-collection"
                    target={'_blank'}
                    className="flex items-center "
                  >
                    <img
                      className="w-[42px] h-[40px] sm:w-[32px] sm:h-[30px]"
                      src="/NFTS/OpenSea.png"
                    ></img>
                    <span className="nowrap font-bold text-[24px] ml-[6px] sm:text-[18px]">
                      OpenSea
                    </span>
                  </a>
                </div>
              </>
            )}
          </div>
          <div
            className="mt-6 hover:scale-110 animate-bounce m-auto w-fit"
            role={'button'}
            onClick={() =>
              scollToRef.current.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <svg
              width="42"
              height="41"
              viewBox="0 0 42 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="42" height="40.5" rx="5" fill="#303044" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.2363 16.9888C28.2363 18.1246 28.2363 19.2604 28.2363 20.3962C28.2296 23.7235 26.173 26.4562 22.9879 27.3715C19.2419 28.4472 15.1754 26.1221 14.254 22.3472C14.1004 21.7258 14.0203 21.0777 14.0136 20.4363C13.9869 18.0645 14.0203 15.6926 14.0002 13.3207C13.9735 10.2206 16.1637 7.34762 19.262 6.49242C22.0464 5.72406 25.118 6.83316 26.794 9.09813C27.7355 10.3809 28.2029 11.8041 28.2363 13.3809C28.2563 14.5835 28.2363 15.7861 28.2363 16.9888ZM26.6404 16.9754C26.6471 16.9754 26.6471 16.9754 26.6404 16.9754C26.6471 15.8396 26.6404 14.7038 26.6471 13.5679C26.6471 12.7929 26.5269 12.0446 26.2397 11.323C25.1313 8.49681 21.8461 6.98015 18.9081 8.29637C16.7313 9.27184 15.5961 11.0223 15.5694 13.4276C15.5427 15.7193 15.5561 18.011 15.5694 20.3027C15.5694 20.7904 15.6161 21.2848 15.723 21.7592C16.5042 25.1199 20.11 26.9773 23.2683 25.5876C25.385 24.6589 26.5402 22.9752 26.627 20.6434C26.6804 19.4274 26.6404 18.2048 26.6404 16.9754Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.1441 32.4829C22.0255 31.5876 22.8668 30.7257 23.7282 29.8639C24.1488 29.4429 24.7431 29.5565 24.9902 30.0843C25.1304 30.385 25.0903 30.6857 24.8633 30.9195C23.7949 32.0086 22.7199 33.0842 21.6315 34.1533C21.3177 34.4606 20.8903 34.4406 20.5832 34.1332C19.5081 33.0709 18.4397 32.0019 17.3714 30.9195C17.0509 30.5921 17.0843 30.1578 17.4181 29.8238C17.732 29.5164 18.1593 29.5164 18.4865 29.8438C19.2744 30.6188 20.049 31.4006 20.8235 32.1756C20.917 32.2758 21.0105 32.356 21.1441 32.4829Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.8998 12.5991C21.8998 12.9866 21.9065 13.3741 21.8998 13.7616C21.8931 14.2092 21.5592 14.5567 21.1386 14.5634C20.7112 14.57 20.3506 14.2427 20.3373 13.795C20.3173 12.9866 20.3173 12.1714 20.3373 11.363C20.344 10.902 20.6912 10.6013 21.1386 10.608C21.5793 10.6147 21.8864 10.9354 21.9065 11.3964C21.9065 11.4165 21.9065 11.4432 21.9065 11.4632C21.8998 11.8441 21.8998 12.2249 21.8998 12.5991Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export { NFTView };

const PreSaleSection = ({ launchTimeStamp }) => {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const toastify = useToast();

  const checkWhitelistForUser = () => {
    if (!address)
      return toastify({
        msg: 'Please enter a wallet address',
        status: 'error',
        id: 'invalid address',
      });
    const filteredData = WhitelistData.filter(
      (obj) => obj['Wallet Address'].toLowerCase() === address.toLowerCase()
    );
    if (filteredData.length === 0) {
      setMessage(`Your wallet is not whitelisted.`);
      return;
    }
    setMessage(
      `${filteredData.reduce((acc, curr, idx) => {
        return (
          acc +
          ` ${curr['Number of Mints']} mints available in ${
            curr['Sale Name']
          } sale ${idx !== filteredData.length - 1 ? 'and ' : ''}`
        );
      }, `Your wallet is whitelisted and you have `)}.`
    );
  };

  return (
    <div className="m-8 bg-1 flex flex-wrap px-7 sm:px-[0px] py-6 sm:m-4 rounded-md justify-between flex-row-reverse">
      <TimerBox
        expiration={launchTimeStamp}
        head="Nft sale starts in"
        className="sm:m-auto text-f15 gap-3 text-2"
        shouldShowSocialMedia={false}
      />
      <div className="flex flex-col p-5 gap-4  sm:ml-[0px] items-start justify-center w-1/2 sm:w-full">
        <div className="text-f16 font-medium text-1">Input wallet address</div>
        <div className="flex gap-5 sm:flex-wrap w-full">
          <BufferInput
            value={address}
            onChange={(newValue) => {
              setAddress(newValue);
            }}
            ipClass=""
            hideSearchBar
            className="!text-f15 w-full max-w-[400px]"
            bgClass="!px-5 w-full !bg-5 "
            placeholder="Enter your wallet address"
          />
          <BlueBtn
            onClick={checkWhitelistForUser}
            className="px-4 w-fit sm:w-full whitespace-nowrap"
          >
            Check Whitelist
          </BlueBtn>
        </div>
        <div className="text-3 font-medium text-f14">{message}</div>
      </div>
    </div>
  );
};
