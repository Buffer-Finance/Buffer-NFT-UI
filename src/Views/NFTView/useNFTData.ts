import {
  useBalance,
  useClaimConditions,
  useClaimNFT,
  useContract,
  useTotalCirculatingSupply,
  useTotalCount,
} from '@thirdweb-dev/react';
import { useToast } from '@Contexts/Toast';
import { useUserAccount } from '@Hooks/useUserAccount';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import {
  add,
  gt,
  lt,
  multiply,
} from '@Utils/utils/NumString/stringArithmatics';
import { convertBNtoString } from '@Utils/utils/useReadCall';
import { nftAtom, NFTContract } from '.';
import { useNFTGraph } from './useNFTGraph';

export const useNFTData = () => {
  const { address: account } = useUserAccount();
  console.log(`contract: `);
  const { contract } = useContract(NFTContract);
  const { data: totalCount } = useTotalCount(contract);
  const { data: supply } = useTotalCirculatingSupply(contract, 0);
  const { data: conditions, isLoading: isConditionsLoading } =
    useClaimConditions(contract, 0, {
      withAllowList: true,
    });
  if (conditions) convertBNtoString(conditions);
  console.log(`conditions: `, conditions);
  const { nfts } = useNFTGraph();
  const [, setIsModalOpen] = useAtom(nftAtom);
  const toastify = useToast();
  const { data: balance } = useBalance();
  const { mutateAsync, isSuccess, error, isLoading, isError } =
    useClaimNFT(contract);

  const mintNFT = async (mintNumber: number, price: string) => {
    if (mintNumber <= 0)
      return toastify({
        type: 'error',
        msg: 'Please enter a valid number',
        id: 'mint error',
      });
    // const gasCostInGwei = await contract.estimator.currentGasPriceInGwei();
    // console.log(`gasCostInGwei: `, gasCostInGwei, balance);
    if (
      balance &&
      lt(balance.displayValue, multiply(mintNumber.toString(), price))
    ) {
      return toastify({
        type: 'error',
        msg: 'Insufficient balance',
        id: 'mint error',
      });
    }

    if (whitelistData.shouldDisplayTag && !whitelistData.data)
      return toastify({
        type: 'error ',
        msg: 'Your wallet is not whitelisted.',
        id: 'whitelist error',
      });

    if (
      gt(
        add(mintNumber.toString(), conditions[currentPhase].currentMintSupply),
        conditions[currentPhase].maxClaimableSupply
      )
    ) {
      return toastify({
        type: 'error ',
        msg: 'You have entered a number greater than the maximum number of NFTs that can be minted for the current phase',
        id: 'phase limit error',
      });
    }

    if (nfts && nfts.length) {
      // console.log(
      //   "check",
      //   add(mintNumber.toString(), conditions[currentPhase].currentMintSupply),
      //   conditions[currentPhase].maxClaimableSupply,
      //   whitelistData.data?.maxClaimable || conditions[currentPhase].maxClaimablePerWallet
      // );
      if (
        mintNumber +
          nfts.filter((nft) => nft.phaseId === currentPhase.toString()).length >
        (whitelistData.data?.maxClaimable ||
          conditions[currentPhase].maxClaimablePerWallet)
      ) {
        return toastify({
          type: 'error ',
          msg: 'You have entered a number greater than the maximum number of NFTs you can mint',
          id: 'user limit error',
        });
      }
    }
    try {
      await mutateAsync({
        quantity: mintNumber,
      });
    } catch (e) {
      console.log(e, 'errorfn');
      toastify({ type: 'error ', msg: e.reason, id: 'nfterror' });
    }
  };

  const currentPhase = useMemo(() => {
    if (!conditions) return null;

    const currentTime = new Date().getTime();
    const phaseTimes = conditions.map((condition) => {
      return new Date(condition.startTime).getTime();
    });

    // if current time is greater than the last phase, return the last phase
    if (currentTime > phaseTimes[phaseTimes.length - 1])
      return phaseTimes.length - 1;

    // if current time is less than the first phase, return the first phase
    if (currentTime < phaseTimes[0]) return 0;

    //else return the phase in which current time is inbetween the previous and next phase
    const currentPhase = phaseTimes.findIndex((time, index) => {
      return currentTime > time && currentTime < phaseTimes[index + 1];
    });

    return currentPhase;
  }, [conditions]);
  console.log(`currentPhase: `, currentPhase);

  const whitelistData = useMemo(() => {
    let returnObj = { shouldDisplayTag: false, data: null };
    if (currentPhase === null) return returnObj;
    const currentPhaseCondition = conditions?.[currentPhase];
    // console.log(`currentPhaseCondition: `, currentPhaseCondition);

    if (currentPhaseCondition === undefined) return returnObj;
    const { snapshot } = currentPhaseCondition;
    //if snapshot is null, it means that the whitelist is not enabled
    if (snapshot === null) return returnObj;
    return {
      data: snapshot.find(
        (obj) => obj.address?.toLowerCase() === account?.toLowerCase()
      ),
      shouldDisplayTag: true,
    };
  }, [currentPhase, conditions, account]);

  const NftsInCurrentPhase = useMemo(() => {
    if (!nfts || currentPhase === null) return 0;
    return nfts.filter((nft) => nft.phaseId === currentPhase.toString()).length;
  }, [nfts, currentPhase]);

  useEffect(() => {
    if (isSuccess) {
      setIsModalOpen({ isBuyModalOpen: false });
      return toastify({
        type: 'success',
        msg: 'Claimed NFT successfully',
        id: 'nftsuccess',
      });
    }
    if (isError || error) {
      console.log(
        error,
        typeof error,
        Object.keys(error),
        Object.values(error),
        error.data,
        error.reason,
        'error:'
      );
      return toastify({
        type: 'error',
        msg: error.reason,
        id: 'nfterror',
      });
    }
  }, [isSuccess, error]);

  return {
    mintNFT,
    isLoading,
    whitelistData,
    currentPhase,
    conditions,
    supply,
    totalCount,
    contract,
    isConditionsLoading,
    NftsInCurrentPhase,
  };
};
