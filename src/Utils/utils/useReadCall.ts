import { ethers } from 'ethers';
import useSWR from 'swr';
import { multicallv2 } from '@Utils/utils/Contract/multiContract';
import { useProvider, useSigner } from 'wagmi';
import getDeepCopy from './getDeepCopy';
export const useReadCall = ({ contracts }) => {
  const calls = contracts;
  const { data: signer } = useSigner();
  const p = useProvider();
  return useSWR(calls && [calls], {
    fetcher: async (calls) => {
      if (!calls) return null;
      let returnData = await multicallv2(calls, signer || p);
      if (returnData) {
        let copy = getDeepCopy(returnData);
        convertBNtoString(copy);
        return copy;
      }
      return null;
    },
    refreshInterval: 500,
  });
};

export function convertBNtoString(data) {
  if (!data) return;
  // console.log(`data: `, data);

  Object.keys(data)?.forEach((key) => {
    if (typeof data[key] === 'object' && data[key] && !data[key].type) {
      convertBNtoString(data[key]);
    }

    if (data[key] && data[key]?._isBigNumber) {
      data[key] = ethers.utils.formatUnits(data[key]._hex, 0);
    }
  });
  // console.log(`data: `, data);
}

export const contractRead = async (contract, method, args, debug = false) => {
  if (debug) {
    console.log(`${method}-contract: `, contract);
    console.log(`${method}-fn: `, contract[method]);
    console.log(`method: `, method);
    console.log(`args: `, args);
  }
  const res = await contract[method](...args);
  let copy = getDeepCopy(res);
  convertBNtoString(copy);
  if (debug) {
    console.log(`${method}-res: `, copy);
    console.log(`${method}-arg: `, args);
  }
  return copy;
};
