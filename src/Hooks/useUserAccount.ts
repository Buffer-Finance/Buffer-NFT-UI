import { useAccount } from 'wagmi';
import { useQuery } from './useQuery';

export const useUserAccount = () => {
  const { address: account } = useAccount();
  const query = useQuery();
  // console.log(query, 'query');
  return {
    address: query.get('user_address') || account,
    viewOnlyMode: query?.get('user_address') ? true : false,
  };
};
