import { SVGProps } from 'react';

export interface ITab {
  to: string;
  name: string;
  subTabs: any;
  isExternalLink: boolean;
  Img?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export const getTabs = () => {
  if (import.meta.env.VITE_ENV === 'MAINNET') {
    return [
      {
        to: `https://app.buffer.finance/#/binary`,
        name: 'Trade',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/earn`,
        name: 'Earn',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://testnet.buffer.finance/`,
        name: 'Practice Trading',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/dashboard`,
        name: 'Dashboard',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/referral`,
        name: 'Referral',
        subTabs: [],
        isExternalLink: true,
      },
    ];
  } else
    return [
      {
        to: `https://app.buffer.finance/#/binary`,
        name: 'Trade',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/earn`,
        name: 'Earn',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://testnet.buffer.finance/`,
        name: 'Practice Trading',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/dashboard`,
        name: 'Dashboard',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/referral`,
        name: 'Referral',
        subTabs: [],
        isExternalLink: true,
      },
    ];
};
