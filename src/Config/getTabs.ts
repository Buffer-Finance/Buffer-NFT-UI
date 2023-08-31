import { SVGProps } from 'react';

export interface ITab {
  to: string;
  name: string;
  subTabs: any;
  isExternalLink: boolean;
  Img?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export const getTabs = (): {
  to: string;
  name: string;
  subTabs: [];
  isExternalLink: boolean;
}[] => {
  if (import.meta.env.VITE_ENV.toUpperCase() === 'MAINNET') {
    return [
      {
        to: 'https://app.buffer.finance/',
        name: 'Trade',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/referral`,
        name: 'Referral',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/profile`,
        name: 'Profile',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `#`,
        name: 'Optopi NFT',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://app.buffer.finance/#/leaderboard/daily`,
        name: 'Competitions',
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
        to: `https://stats.buffer.finance/`,
        name: 'Stats',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://earn.buffer.finance/`,
        name: 'Earn',
        subTabs: [],
        isExternalLink: false,
      },
      {
        to: 'https://twitter.com/Buffer_Finance',
        name: 'Twitter',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://github.com/Buffer-Finance',
        name: 'Github',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://docs.buffer.finance/introduction/readme',
        name: 'Docs',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://www.youtube.com/@BufferFinance/',
        name: 'YouTube',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://discord.com/invite/Hj4QF92Kdc',
        name: 'Discord',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://t.me/bufferfinance',
        name: 'Telegram',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://mirror.xyz/0xc730FbdFEb3e9dF76008A19962963cA4A2bd8de2',
        name: 'Mirror',
        subTabs: [],
        isExternalLink: true,
      },
    ];
  } else
    return [
      {
        to: 'https://testnet.buffer.finance/',
        name: 'Trade',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://testnet.buffer.finance/#/faucet`,
        name: 'Faucet',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://testnet.buffer.finance/#/referral`,
        name: 'Referral',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://testnet.buffer.finance/#/profile`,
        name: 'Profile',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `#`,
        name: 'Optopi NFT',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://testnet.buffer.finance/#/leaderboard/daily`,
        name: 'Competitions',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://testnet.buffer.finance/#/dashboard`,
        name: 'Dashboard',
        subTabs: [],
        isExternalLink: true,
      },

      {
        to: `https://stats.buffer.finance/`,
        name: 'Stats',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: `https://earn.buffer.finance/`,
        name: 'Earn',
        subTabs: [],
        isExternalLink: false,
      },
      {
        to: 'https://twitter.com/Buffer_Finance',
        name: 'Twitter',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://github.com/Buffer-Finance',
        name: 'Github',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://docs.buffer.finance/introduction/readme',
        name: 'Docs',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://www.youtube.com/@BufferFinance/',
        name: 'YouTube',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://discord.com/invite/Hj4QF92Kdc',
        name: 'Discord',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://t.me/bufferfinance',
        name: 'Telegram',
        subTabs: [],
        isExternalLink: true,
      },
      {
        to: 'https://mirror.xyz/0xc730FbdFEb3e9dF76008A19962963cA4A2bd8de2',
        name: 'Mirror',
        subTabs: [],
        isExternalLink: true,
      },

      // {
      //   to: `/leaderboard/trades`,
      //   name: 'All Trades',
      //   subTabs: [],
      //   isExternalLink: false,
      // },
    ];
};
