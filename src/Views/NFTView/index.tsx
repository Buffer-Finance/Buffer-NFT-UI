import { MoleAnimatedSection } from './MoleAnimatedSection';
import FrontArrow from 'src/SVG/frontArrow';
import { atom } from 'jotai';
import { useRef } from 'react';
import { CONTRACTS } from './Address';
import { ScrollSVG } from './ScrollSVG';
import { SaleSection } from './SaleSection';
import { ClaimedNFT } from './Claimed';

export const nftAtom = atom<{ isBuyModalOpen: boolean }>({
  isBuyModalOpen: false,
});

export const NFTContract =
  import.meta.env.VITE_ENV.toLowerCase() === 'mainnet'
    ? CONTRACTS[42161].nft
    : CONTRACTS[421613].nft;

export const nftGraphqlURL =
  import.meta.env.VITE_ENV.toLowerCase() === 'mainnet'
    ? 'https://api.thegraph.com/subgraphs/name/bufferfinance/mainnet-lite'
    : 'https://api.thegraph.com/subgraphs/name/bufferfinance/testnet-lite';

interface INFTView {}
const NFTView: React.FC<{}> = ({}) => {
  return (
    <>
      <main className="content-drawer">
        <NFTViewPage />
      </main>
    </>
  );
};

const NFTViewPage: React.FC<INFTView> = ({}) => {
  const scollToRef = useRef(null);
  const isSaleStarted = true;

  return (
    <div className=" transition-all duration-[5000ms] ease-out">
      <div className="nft-wrapper w-full nsm:overflow-y-hidden">
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
                {/* <WhiteListTag
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
                /> */}
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
            onClick={() => {
              if (typeof scollToRef.current !== 'undefined') return;
              (scollToRef.current as any).scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            <ScrollSVG />
          </div>
        </div>
      </div>
      <SaleSection scrollRef={scollToRef} />

      <ClaimedNFT />
    </div>
  );
};

export { NFTView };
