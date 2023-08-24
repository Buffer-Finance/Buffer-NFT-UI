import { useToast } from '@Contexts/Toast';
import { useState } from 'react';
import { TimerBox } from './TimerBox';
import BufferInput from '@Views/Common/BufferInput';
import { BlueBtn } from '@Views/Common/V2-Button';
import WhitelistData from './whitelist.json';

export const PreSaleSection: React.FC<{ launchTimeStamp: number }> = ({
  launchTimeStamp,
}) => {
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
