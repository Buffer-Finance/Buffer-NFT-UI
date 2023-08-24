import { divide } from '@Utils/NumString/stringArithmatics';
import { BuyNFTodal } from './BuyNFTModal';
import { PhaseData } from './PhaseData';
import { useNFTData } from './useNFTData';

export const PhaseDataWrapper = () => {
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
  return (
    <>
      <BuyNFTodal
        onClick={mintNFT}
        price={
          whitelistData.data?.price
            ? whitelistData.data?.price
            : conditions && conditions.length > 0 && currentPhase !== null
            ? divide(
                conditions[currentPhase].price as any,
                conditions[currentPhase].currencyMetadata.decimals
              )
            : null
        }
        isLoading={isLoading}
        isDisabled={isLoading || !contract || !conditions}
      />
      <PhaseData
        conditions={conditions}
        currentPhase={currentPhase}
        wishlistData={whitelistData}
        totalMinted={supply?.toNumber()}
        isDisabled={!contract || !conditions}
        isConditionsLoading={isConditionsLoading}
        NftsInCurrentPhase={NftsInCurrentPhase}
      />
    </>
  );
};
