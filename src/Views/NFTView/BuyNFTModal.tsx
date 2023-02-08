import { CloseOutlined } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { multiply } from '@Utils/NumString/stringArithmatics';
import BufferInput from '@Views/Common/BufferInput';
import { BlueBtn } from '@Views/Common/V2-Button';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { nftAtom } from '.';

export const BuyNFTodal = ({
  onClick,
  price,
  isLoading,
  isDisabled,
}: {
  onClick: (mintNumber: number, price: string) => void;
  price: string;
  isLoading: boolean;
  isDisabled: boolean;
}) => {
  const [payAmount, setPayAmount] = useState('');
  const [{ isBuyModalOpen }, setIsModalOpen] = useAtom(nftAtom);

  const closeModal = () =>
    setIsModalOpen({
      isBuyModalOpen: false,
    });
  return (
    <Dialog open={isBuyModalOpen} onClose={closeModal}>
      <div className="text-1 bg-2 p-6 rounded-md relative">
        <IconButton
          className="!absolute text-1 top-[20px] right-[20px]"
          onClick={closeModal}
        >
          <CloseOutlined />
        </IconButton>
        <div className="w-[350px] sm:w-full flex flex-col gap-4">
          <div className="text-f15 font-medium">Mint NFTs</div>
          <BufferInput
            value={payAmount}
            onChange={(newValue: string) => {
              setPayAmount(newValue);
            }}
            numericValidations={{
              decimals: { val: 0 },
              // max: {
              //   val: max,
              //   error: `Not enough funds`,
              // },
              min: { val: '0', error: 'Enter a poistive value' },
            }}
            inputType="number"
            ipClass=""
            hideSearchBar
            className="!text-f17"
            bgClass="!px-5 !bg-1"
            placeholder="1"
          />

          <div className="flex whitespace-nowrap">
            <BlueBtn
              onClick={() => onClick(Number(payAmount), price)}
              className="rounded"
              isDisabled={isDisabled}
              isLoading={isLoading}
            >
              {`Mint ${
                price ? `for ${multiply(price, payAmount || '1')} ETH` : ``
              }`}
            </BlueBtn>
          </div>
        </div>{' '}
      </div>
    </Dialog>
  );
};
