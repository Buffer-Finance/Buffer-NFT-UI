import { useUserAccount } from '@Hooks/useUserAccount';
import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';
import { nftGraphqlURL } from '.';
interface IGraphNFT {
  batchId: string;
  nftImage: string;
  owner: string;
  tier: string;
  tokenId: string;
  phaseId: string;
}
export const useNFTGraph = () => {
  const { address: account } = useUserAccount();
  const { data } = useSWR(`nfts-the-graph-account-${account}-claimed`, {
    fetcher: async () => {
      const response = await axios.post(nftGraphqlURL, {
        query: `{ 
          nfts(orderBy: tokenId, orderDirection: desc,where: {owner: "${account}"}) {
            batchId
            nftImage
            owner
            tier
            tokenId
            phaseId
          }
        }`,
      });
      return response.data?.data as {
        nfts: IGraphNFT[];
      };
    },
    refreshInterval: 1000,
  });

  return { nfts: data?.nfts as IGraphNFT[] };
};
export enum Tier {
  SILVER,
  GOLD,
  PLATINUM,
  DIAMOND,
}

export const useHighestTierNFT = () => {
  const { nfts } = useNFTGraph();

  const highestTierNFT = useMemo(() => {
    if (!nfts || nfts.length === 0) return null;
    const filteredNFTS = nfts.filter((nft) => nft.tier.length > 0);
    return filteredNFTS.reduce((prev, curr) => {
      const currentTier = curr.tier.toUpperCase();
      if (prev.tier.toUpperCase() === 'DIAMOND') return prev;
      else if (currentTier === 'SILVER') return { ...curr, tier: 'Silver' };
      else if (currentTier === 'GOLD') return { ...curr, tier: 'Gold' };
      else if (currentTier === 'PLATINUM') return { ...curr, tier: 'Platinum' };
      else if (currentTier === 'DIAMOND') return { ...curr, tier: 'Diamond' };
      return prev;
    }, filteredNFTS[0]);
  }, [nfts]);
  return { highestTierNFT };
};
