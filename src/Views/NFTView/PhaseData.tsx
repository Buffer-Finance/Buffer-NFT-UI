import { Skeleton } from '@mui/material';
import useOpenConnectionDrawer from '@Hooks/Utilities/useOpenConnectionDrawer';
import useStopWatch from '@Hooks/Utilities/useStopWatch';
import { useAtom } from 'jotai';
import { divide } from '@Utils/NumString/stringArithmatics';
import { BlueBtn } from '@Views/Common/V2-Button';
import { nftAtom } from '.';
import { ConnectionRequired } from '@Views/Common/Navbar/AccountDropdown';

export const PhaseData = ({
  conditions,
  currentPhase,
  wishlistData,
  totalMinted,
  isDisabled,
  isConditionsLoading,
  NftsInCurrentPhase,
}) => {
  if (!isConditionsLoading && !conditions) return <></>;
  if (conditions && conditions.length === 0)
    return (
      <div className="flex justify-center py-6 w-full text-f22">
        NFT Sale will start soon...
      </div>
    );
  return (
    <div>
      <div className="text-1 text-[34px] mx-8 my-6 sm:mx-4">Mint</div>
      {isConditionsLoading ? (
        <Skeleton className="!transform-none min-h-[250px] !bg-1 !m-7" />
      ) : (
        <div className="p-8 sm:px-4 sm:pb-5 bg-1 mx-7 rounded-lg sm:mx-4">
          <div className="flex justify-between items-center b1000:flex-col sm:items-start sm:mb-6">
            <Phases activePhase={currentPhase} conditions={conditions} />
            <div className="flex flex-col gap-5 items-end sm:!items-center sm:w-full sm:gap-y-5 sm:mt-[35px] sm:flex-col">
              <div className="text-1 text-f22 flex flex-col items-center  sm:items-center ">
                {totalMinted}/8888
                <div className="text-2 text-f14">NFTs Claimed</div>
              </div>
              <div className="flex gap-6 sm:gap-5 items-center">
                <WhiteListTag
                  wishlistData={wishlistData}
                  NftsInCurrentPhase={NftsInCurrentPhase}
                />
                <ClaimButton
                  price={
                    wishlistData.data?.price ||
                    divide(
                      conditions[currentPhase].price,
                      conditions[currentPhase].currencyMetadata.decimals
                    )
                  }
                  isDisabled={isDisabled}
                  conditions={conditions}
                  currentPhase={currentPhase}
                  NftsInCurrentPhase={NftsInCurrentPhase}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const ClaimButton = ({
  price,
  isDisabled,
  conditions,
  currentPhase,
  NftsInCurrentPhase,
  shouldNotShowMints = false,
}: {
  price: number | string;
  isDisabled: boolean;
  conditions: any;
  currentPhase: number;
  NftsInCurrentPhase: number;
  shouldNotShowMints?: boolean;
}) => {
  const [, setIsModalOpen] = useAtom(nftAtom);
  const { openWalletDrawer, shouldConnectWallet } = useOpenConnectionDrawer();
  const buttonMsg = shouldConnectWallet
    ? 'Connect Wallet'
    : `Mint ${price ? `for ${price} ETH` : ``}`;

  return (
    <div>
      <ConnectionRequired>
        <BlueBtn
          onClick={
            shouldConnectWallet
              ? openWalletDrawer
              : () => setIsModalOpen({ isBuyModalOpen: true })
          }
          className="w-fit px-5 min-w-[150px] sm:!text-f14"
          isDisabled={!shouldConnectWallet && isDisabled}
        >
          {buttonMsg}
        </BlueBtn>
        {conditions &&
          currentPhase !== null &&
          !conditions[currentPhase].snapshot && (
            <div
              className={`text-2 text-f14 whitespace-nowrap mt-3 ${
                shouldNotShowMints ? 'text-center' : 'text-right'
              } sm:!text-center`}
            >
              {NftsInCurrentPhase}/
              {conditions[currentPhase]?.maxClaimablePerWallet}&nbsp;Minted
            </div>
          )}
      </ConnectionRequired>
    </div>
  );
};

const StopWatch = ({ startTime, nextTime, className = '' }) => {
  const currentTime = Math.floor(new Date().getTime() / 1000);
  // console.log(`startTime: `, startTime, nextTime, currentTime);
  if (
    (startTime < currentTime && currentTime < nextTime) ||
    (currentTime > startTime && !nextTime)
  )
    return <div className={`text-2 ${className}`}>Ongoing</div>;
  if (startTime < currentTime)
    return <div className={`text-2 ${className}`}>Ended</div>;
  const stopwatch = useStopWatch(startTime);
  return <div className={`text-2 ${className}`}>{stopwatch}</div>;
};

const Phases = ({
  activePhase,
  conditions,
}: {
  activePhase: number;
  conditions: any;
}) => {
  const dots = conditions.length;
  const xdistance = 647;

  return (
    <>
      <div className="flex flex-col sm:hidden">
        <div className="relative sm:ml-6">
          <svg
            width="647"
            height="24"
            viewBox={`0 0 ${xdistance} 24`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="638"
              height="7"
              transform="matrix(1 0 0 -1 0 15)"
              fill="#303044"
            />
          </svg>
          <div className="absolute flex justify-between w-[100%] top-[3px]">
            {new Array(dots).fill(3).map((s, i) => (
              <div className="flex z-30" key={conditions[i].metadata.name}>
                <div
                  className={` w-5 h-5 rounded-[50%] ${
                    i == activePhase ? 'bg-[#6A82FD]' : 'bg-[#303044]'
                  } `}
                >
                  <div className=" translate-y-[-35px] flex flex-col items-center">
                    <div className="text-3 whitespace-nowrap max-w-[100px] mb-[40px] text-f16 ">
                      {conditions[i].metadata.name}
                    </div>
                    <div className="text-3  whitespace-nowrap text-f12">
                      {conditions[i].currentMintSupply +
                        '/' +
                        conditions[i].maxClaimableSupply}{' '}
                      Minted
                      <StopWatch
                        className="text-center"
                        startTime={
                          new Date(conditions[i]?.startTime).getTime() / 1000
                        }
                        nextTime={
                          new Date(conditions[i + 1]?.startTime).getTime() /
                          1000
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* mobile*/}
      </div>
      <div className="nsm:hidden pl-6">
        <div className="relative">
          <svg
            width="7"
            height="402"
            viewBox="0 0 7 402"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="402"
              height="7"
              transform="matrix(0 -1 -1 0 7 402)"
              fill="#303044"
            />
          </svg>
          <div className="absolute flex-col h-[100%] top-[0px] justify-between flex">
            {new Array(dots).fill(3).map((s, i) => (
              <div className="flex" key={conditions[i].metadata.name}>
                <div
                  className={` w-6 h-6 rounded-[50%]   bg-[${
                    i == activePhase ? '#6A82FD' : '#303044'
                  }] mr-3`}
                  style={{ transform: 'translateX(-8px)' }}
                >
                  <div
                    className="ml-[40px] "
                    style={{ transform: 'translateY(-8px)' }}
                  >
                    <div className="text-3 whitespace-nowrap text-f14">
                      {conditions[i].metadata.name}
                    </div>
                    <div className="text-2 text-f12 whitespace-nowrap">
                      {' '}
                      {conditions[i].currentMintSupply +
                        '/' +
                        conditions[i].maxClaimableSupply}{' '}
                      Minted
                    </div>
                    <StopWatch
                      startTime={
                        new Date(conditions[i]?.startTime).getTime() / 1000
                      }
                      nextTime={
                        new Date(conditions[i + 1]?.startTime).getTime() / 1000
                      }
                      className="w-max"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const WhiteListTag = ({ wishlistData, NftsInCurrentPhase }) => {
  const { shouldConnectWallet } = useOpenConnectionDrawer();
  // console.log(`wishlistData: `, wishlistData);

  const fillColor = wishlistData.data ? '#3FB68B' : '#808191';
  if (!wishlistData.shouldDisplayTag || shouldConnectWallet) return <></>;

  return (
    <div className="flex flex-col justify-center items-center relative">
      {wishlistData.data ? (
        <svg
          width="109"
          height="30"
          viewBox="0 0 109 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="109"
            height="29.812"
            rx="4.65812"
            fill={fillColor}
            fill-opacity="0.1"
          />
          <path
            d="M22.3722 19.4663L24.5649 19.4529L26.3966 12.808L28.148 19.4529H30.3541L32.9613 10.1206H30.9424L29.2845 17.327L27.4929 10.1206H25.4072L23.5086 17.3672L21.8641 10.1206H19.8586L22.3722 19.4663ZM34.1835 19.4529H36.0553V15.3616C36.0553 14.1717 36.7104 13.5299 37.7265 13.5299C38.7159 13.5299 39.3711 14.1717 39.3711 15.3616V19.4529H41.2429V15.1076C41.2429 13.062 40.0262 11.9389 38.3549 11.9389C37.3655 11.9389 36.5366 12.34 36.0553 12.9684V9.55903H34.1835V19.4529ZM43.0229 19.4529H44.8947V12.0459H43.0229V19.4529ZM43.9721 11.1634C44.6273 11.1634 45.122 10.6821 45.122 10.0671C45.122 9.45207 44.6273 8.97075 43.9721 8.97075C43.3036 8.97075 42.8223 9.45207 42.8223 10.0671C42.8223 10.6821 43.3036 11.1634 43.9721 11.1634ZM47.0382 17.1532C47.0382 18.8512 47.9874 19.4529 49.4047 19.4529H50.5812V17.8752H49.7122C49.1239 17.8752 48.9233 17.6613 48.9233 17.1666V13.5834H50.5812V12.0459H48.9233V10.2142H47.0382V12.0459H46.1557V13.5834H47.0382V17.1532ZM55.1096 13.4631C56.0722 13.4631 56.8477 14.0781 56.8744 15.0541H53.3581C53.5052 14.038 54.2138 13.4631 55.1096 13.4631ZM58.6259 17.1265H56.607C56.3664 17.6212 55.9252 18.0223 55.123 18.0223C54.1871 18.0223 53.4383 17.4073 53.3448 16.3109H58.7596C58.7997 16.0703 58.8131 15.8296 58.8131 15.5889C58.8131 13.3829 57.3023 11.9255 55.1631 11.9255C52.9704 11.9255 51.4462 13.4096 51.4462 15.7494C51.4462 18.0758 53.0105 19.5732 55.1631 19.5732C56.9948 19.5732 58.2248 18.4902 58.6259 17.1265ZM60.1794 19.4529H62.0512V9.55903H60.1794V19.4529ZM63.9005 19.4529H65.7723V12.0459H63.9005V19.4529ZM64.8498 11.1634C65.5049 11.1634 65.9996 10.6821 65.9996 10.0671C65.9996 9.45207 65.5049 8.97075 64.8498 8.97075C64.1813 8.97075 63.7 9.45207 63.7 10.0671C63.7 10.6821 64.1813 11.1634 64.8498 11.1634ZM73.3708 17.3404C73.3173 14.6263 69.2127 15.4686 69.2127 14.1182C69.2127 13.6904 69.5737 13.4096 70.269 13.4096C71.0043 13.4096 71.4589 13.7973 71.5124 14.3723H73.304C73.197 12.9015 72.114 11.9255 70.3224 11.9255C68.4907 11.9255 67.3944 12.9149 67.3944 14.145C67.3944 16.8591 71.5792 16.0168 71.5792 17.3404C71.5792 17.7683 71.1781 18.1025 70.4428 18.1025C69.694 18.1025 69.1726 17.6747 69.1058 17.1131H67.2206C67.3008 18.4902 68.5977 19.5732 70.4561 19.5732C72.2611 19.5732 73.3708 18.6106 73.3708 17.3404ZM75.2015 17.1532C75.2015 18.8512 76.1507 19.4529 77.568 19.4529H78.7445V17.8752H77.8755C77.2872 17.8752 77.0866 17.6613 77.0866 17.1666V13.5834H78.7445V12.0459H77.0866V10.2142H75.2015V12.0459H74.319V13.5834H75.2015V17.1532ZM83.2729 13.4631C84.2356 13.4631 85.011 14.0781 85.0378 15.0541H81.5214C81.6685 14.038 82.3771 13.4631 83.2729 13.4631ZM86.7892 17.1265H84.7704C84.5297 17.6212 84.0885 18.0223 83.2863 18.0223C82.3504 18.0223 81.6016 17.4073 81.5081 16.3109H86.9229C86.963 16.0703 86.9764 15.8296 86.9764 15.5889C86.9764 13.3829 85.4656 11.9255 83.3264 11.9255C81.1337 11.9255 79.6095 13.4096 79.6095 15.7494C79.6095 18.0758 81.1738 19.5732 83.3264 19.5732C85.1581 19.5732 86.3881 18.4902 86.7892 17.1265ZM87.8613 15.7226C87.8613 18.0357 89.3588 19.5732 91.244 19.5732C92.4072 19.5732 93.2361 19.0384 93.6773 18.3565V19.4529H95.5759V9.55903H93.6773V13.0754C93.1693 12.3801 92.2334 11.9255 91.2573 11.9255C89.3588 11.9255 87.8613 13.4096 87.8613 15.7226ZM93.6907 15.7494C93.6907 17.1532 92.7548 17.9287 91.7253 17.9287C90.7225 17.9287 89.7733 17.1265 89.7733 15.7226C89.7733 14.3188 90.7225 13.5701 91.7253 13.5701C92.7548 13.5701 93.6907 14.3455 93.6907 15.7494Z"
            fill={fillColor}
          />
          <circle cx="12.1113" cy="14.906" r="1.86325" fill={fillColor} />
        </svg>
      ) : (
        <svg
          width="133"
          height="33"
          viewBox="0 0 133 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="133"
            height="32.547"
            rx="5.08547"
            fill="#808191"
            fill-opacity="0.1"
          />
          <path
            d="M21.7214 21H19.6779L15.0507 14.0082V21H13.0072V10.7969H15.0507L19.6779 17.8033V10.7969H21.7214V21ZM27.3316 21.1314C26.5532 21.1314 25.8525 20.9611 25.2297 20.6205C24.6069 20.2702 24.1155 19.7787 23.7555 19.1462C23.4051 18.5137 23.23 17.7839 23.23 16.9567C23.23 16.1296 23.41 15.3997 23.7701 14.7672C24.1398 14.1347 24.641 13.6481 25.2735 13.3076C25.906 12.9572 26.6115 12.7821 27.39 12.7821C28.1685 12.7821 28.874 12.9572 29.5065 13.3076C30.1391 13.6481 30.6354 14.1347 30.9954 14.7672C31.3652 15.3997 31.5501 16.1296 31.5501 16.9567C31.5501 17.7839 31.3603 18.5137 30.9808 19.1462C30.611 19.7787 30.105 20.2702 29.4628 20.6205C28.8302 20.9611 28.1199 21.1314 27.3316 21.1314ZM27.3316 19.3506C27.7014 19.3506 28.0469 19.263 28.368 19.0878C28.6989 18.9029 28.9616 18.6305 29.1562 18.2704C29.3508 17.9104 29.4482 17.4725 29.4482 16.9567C29.4482 16.188 29.2438 15.5992 28.8351 15.1905C28.4361 14.7721 27.9447 14.5629 27.3608 14.5629C26.777 14.5629 26.2855 14.7721 25.8866 15.1905C25.4973 15.5992 25.3027 16.188 25.3027 16.9567C25.3027 17.7255 25.4925 18.3191 25.872 18.7375C26.2612 19.1462 26.7478 19.3506 27.3316 19.3506ZM35.4283 14.5921V18.504C35.4283 18.7764 35.4916 18.9759 35.6181 19.1024C35.7543 19.2192 35.9782 19.2776 36.2896 19.2776H37.2383V21H35.9538C34.2314 21 33.3702 20.1631 33.3702 18.4894V14.5921H32.4068V12.9134H33.3702V10.9137H35.4283V12.9134H37.2383V14.5921H35.4283ZM55.805 10.8115L52.9586 21H50.5502L48.638 13.7455L46.6383 21L44.2444 21.0146L41.5002 10.8115H43.6897L45.4851 18.7229L47.5578 10.8115H49.8349L51.7909 18.6791L53.6009 10.8115H55.805ZM61.6935 12.7967C62.3065 12.7967 62.8515 12.9329 63.3283 13.2054C63.8051 13.4681 64.1749 13.8622 64.4376 14.3877C64.7101 14.9035 64.8463 15.5262 64.8463 16.2561V21H62.8028V16.5334C62.8028 15.8912 62.6423 15.3997 62.3211 15.0592C62 14.7088 61.5621 14.5337 61.0074 14.5337C60.443 14.5337 59.9954 14.7088 59.6645 15.0592C59.3434 15.3997 59.1828 15.8912 59.1828 16.5334V21H57.1393V10.1985H59.1828V13.9206C59.4456 13.5703 59.7959 13.2978 60.2338 13.1032C60.6717 12.8988 61.1583 12.7967 61.6935 12.7967ZM67.826 11.9501C67.466 11.9501 67.1643 11.8382 66.921 11.6143C66.6875 11.3808 66.5707 11.0937 66.5707 10.7531C66.5707 10.4125 66.6875 10.1303 66.921 9.90653C67.1643 9.67298 67.466 9.55621 67.826 9.55621C68.1861 9.55621 68.4829 9.67298 68.7164 9.90653C68.9597 10.1303 69.0813 10.4125 69.0813 10.7531C69.0813 11.0937 68.9597 11.3808 68.7164 11.6143C68.4829 11.8382 68.1861 11.9501 67.826 11.9501ZM68.8332 12.9134V21H66.7896V12.9134H68.8332ZM73.2315 14.5921V18.504C73.2315 18.7764 73.2947 18.9759 73.4212 19.1024C73.5574 19.2192 73.7813 19.2776 74.0927 19.2776H75.0414V21H73.7569C72.0345 21 71.1733 20.1631 71.1733 18.4894V14.5921H70.2099V12.9134H71.1733V10.9137H73.2315V12.9134H75.0414V14.5921H73.2315ZM84.0285 16.7816C84.0285 17.0735 84.0091 17.3362 83.9702 17.5698H78.0585C78.1072 18.1536 78.3115 18.611 78.6716 18.9419C79.0316 19.2727 79.4744 19.4382 79.9999 19.4382C80.7589 19.4382 81.299 19.1122 81.6201 18.4602H83.8242C83.5906 19.2387 83.143 19.8809 82.4813 20.3869C81.8196 20.8832 81.007 21.1314 80.0437 21.1314C79.2652 21.1314 78.5645 20.9611 77.9417 20.6205C77.3287 20.2702 76.847 19.7787 76.4967 19.1462C76.1561 18.5137 75.9858 17.7839 75.9858 16.9567C75.9858 16.1198 76.1561 15.3851 76.4967 14.7526C76.8373 14.1201 77.3141 13.6335 77.9271 13.293C78.5402 12.9524 79.2457 12.7821 80.0437 12.7821C80.8124 12.7821 81.4985 12.9475 82.1018 13.2784C82.7148 13.6092 83.1868 14.0812 83.5177 14.6942C83.8583 15.2976 84.0285 15.9933 84.0285 16.7816ZM81.912 16.1977C81.9023 15.6722 81.7125 15.2538 81.3428 14.9424C80.973 14.6213 80.5205 14.4607 79.9853 14.4607C79.4793 14.4607 79.0511 14.6164 78.7008 14.9278C78.3602 15.2294 78.151 15.6528 78.0731 16.1977H81.912ZM87.5637 10.1985V21H85.5201V10.1985H87.5637ZM90.6191 11.9501C90.259 11.9501 89.9573 11.8382 89.7141 11.6143C89.4805 11.3808 89.3637 11.0937 89.3637 10.7531C89.3637 10.4125 89.4805 10.1303 89.7141 9.90653C89.9573 9.67298 90.259 9.55621 90.6191 9.55621C90.9791 9.55621 91.2759 9.67298 91.5095 9.90653C91.7527 10.1303 91.8744 10.4125 91.8744 10.7531C91.8744 11.0937 91.7527 11.3808 91.5095 11.6143C91.2759 11.8382 90.9791 11.9501 90.6191 11.9501ZM91.6262 12.9134V21H89.5827V12.9134H91.6262ZM96.7397 21.1314C96.078 21.1314 95.4844 21.0146 94.9589 20.781C94.4335 20.5378 94.015 20.2118 93.7036 19.8031C93.402 19.3944 93.2365 18.9419 93.2073 18.4456H95.2655C95.3044 18.757 95.4552 19.0149 95.718 19.2192C95.9904 19.4236 96.3262 19.5257 96.7251 19.5257C97.1144 19.5257 97.4161 19.4479 97.6301 19.2922C97.854 19.1365 97.9659 18.937 97.9659 18.6937C97.9659 18.431 97.8296 18.2364 97.5572 18.1099C97.2944 17.9736 96.8711 17.8277 96.2872 17.672C95.6839 17.526 95.1876 17.3752 94.7984 17.2195C94.4189 17.0638 94.088 16.8254 93.8058 16.5042C93.5333 16.1831 93.3971 15.7501 93.3971 15.2051C93.3971 14.7575 93.5236 14.3488 93.7766 13.979C94.0394 13.6092 94.4091 13.3173 94.886 13.1032C95.3725 12.8891 95.9418 12.7821 96.5938 12.7821C97.5572 12.7821 98.3259 13.0253 98.9001 13.5119C99.4742 13.9887 99.7904 14.6358 99.8488 15.4533H97.8929C97.8637 15.1321 97.7275 14.8791 97.4842 14.6942C97.2506 14.4996 96.9344 14.4023 96.5354 14.4023C96.1656 14.4023 95.8785 14.4704 95.6742 14.6067C95.4796 14.7429 95.3823 14.9326 95.3823 15.1759C95.3823 15.4484 95.5185 15.6576 95.791 15.8036C96.0634 15.9398 96.4867 16.0809 97.0609 16.2269C97.6447 16.3729 98.1264 16.5237 98.5059 16.6794C98.8855 16.8351 99.2114 17.0784 99.4839 17.4092C99.7661 17.7303 99.9121 18.1585 99.9218 18.6937C99.9218 19.1608 99.7904 19.5793 99.5277 19.949C99.2747 20.3188 98.9049 20.6108 98.4184 20.8248C97.9415 21.0292 97.382 21.1314 96.7397 21.1314ZM103.979 14.5921V18.504C103.979 18.7764 104.042 18.9759 104.168 19.1024C104.305 19.2192 104.528 19.2776 104.84 19.2776H105.789V21H104.504C102.782 21 101.92 20.1631 101.92 18.4894V14.5921H100.957V12.9134H101.92V10.9137H103.979V12.9134H105.789V14.5921H103.979ZM114.776 16.7816C114.776 17.0735 114.756 17.3362 114.717 17.5698H108.806C108.854 18.1536 109.059 18.611 109.419 18.9419C109.779 19.2727 110.221 19.4382 110.747 19.4382C111.506 19.4382 112.046 19.1122 112.367 18.4602H114.571C114.338 19.2387 113.89 19.8809 113.228 20.3869C112.567 20.8832 111.754 21.1314 110.791 21.1314C110.012 21.1314 109.312 20.9611 108.689 20.6205C108.076 20.2702 107.594 19.7787 107.244 19.1462C106.903 18.5137 106.733 17.7839 106.733 16.9567C106.733 16.1198 106.903 15.3851 107.244 14.7526C107.584 14.1201 108.061 13.6335 108.674 13.293C109.287 12.9524 109.993 12.7821 110.791 12.7821C111.56 12.7821 112.246 12.9475 112.849 13.2784C113.462 13.6092 113.934 14.0812 114.265 14.6942C114.605 15.2976 114.776 15.9933 114.776 16.7816ZM112.659 16.1977C112.649 15.6722 112.46 15.2538 112.09 14.9424C111.72 14.6213 111.268 14.4607 110.732 14.4607C110.226 14.4607 109.798 14.6164 109.448 14.9278C109.107 15.2294 108.898 15.6528 108.82 16.1977H112.659ZM115.742 16.9275C115.742 16.1101 115.902 15.3851 116.223 14.7526C116.554 14.1201 117.002 13.6335 117.566 13.293C118.131 12.9524 118.758 12.7821 119.449 12.7821C119.975 12.7821 120.476 12.8988 120.953 13.1324C121.43 13.3562 121.809 13.6579 122.091 14.0374V10.1985H124.164V21H122.091V19.8031C121.838 20.202 121.483 20.5232 121.026 20.7665C120.568 21.0097 120.038 21.1314 119.435 21.1314C118.754 21.1314 118.131 20.9562 117.566 20.6059C117.002 20.2556 116.554 19.7641 116.223 19.1316C115.902 18.4894 115.742 17.7547 115.742 16.9275ZM122.106 16.9567C122.106 16.4604 122.009 16.0371 121.814 15.6868C121.619 15.3268 121.357 15.0543 121.026 14.8694C120.695 14.6748 120.34 14.5775 119.96 14.5775C119.581 14.5775 119.23 14.6699 118.909 14.8548C118.588 15.0397 118.325 15.3122 118.121 15.6722C117.926 16.0225 117.829 16.441 117.829 16.9275C117.829 17.4141 117.926 17.8423 118.121 18.212C118.325 18.5721 118.588 18.8494 118.909 19.044C119.24 19.2387 119.59 19.336 119.96 19.336C120.34 19.336 120.695 19.2435 121.026 19.0586C121.357 18.864 121.619 18.5915 121.814 18.2412C122.009 17.8812 122.106 17.453 122.106 16.9567Z"
            fill="#808191"
          />
        </svg>
      )}
      {wishlistData.data && (
        <div className="text-3 text-f12 mt-2 absolute top-7 m-auto whitespace-nowrap">
          {NftsInCurrentPhase}/{wishlistData.data.maxClaimable}&nbsp;Minted
        </div>
      )}
    </div>
  );
};
