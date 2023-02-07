import { useTimer } from '@Hooks/Utilities/useStopWatch';
import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const TImerStyle = styled.div`
  transition: ease-in;
  transition-duration: var(--drawer-transition-duration);
  display: flex;
  @media screen and (max-width: 600px) {
    padding: 1.3rem 1rem;
  }
  .social_link:not(:last-child) {
    margin-right: 1.7rem;
  }

  .social_link_icon {
    transform: rotateZ(0deg);
    transition: transform 0.2s ease-in-out;
    &:hover {
      filter: drop-shadow(0px 0px 7px var(--primary)) brightness(1.3);
      transform: rotateZ(20deg);
      /* color: red; */
    }
  }
`;
export const social = [
  {
    name: 'Twitter',
    image: 'Twitter.svg',
    link: 'https://twitter.com/Buffer_Finance',
  },
  {
    name: 'Telegram',
    image: 'Telegram.svg',
    link: 'https://t.me/bufferfinance',
  },
  {
    name: 'Discord',
    image: 'Discord.svg',
    link: 'https://discord.com/invite/Hj4QF92Kdc',
  },
];
export function TimerBox({
  expiration,
  className,
  head,
  shouldShowSocialMedia = true,
}: {
  expiration: number;
  className?: string;
  head: ReactNode;
  shouldShowSocialMedia?: boolean;
}) {
  const timer = useTimer(expiration);
  let arr = [
    timer.days && {
      name: 'Days',
      value: timer.days,
    },
    (timer.hours || timer.days) && {
      name: 'Hours',
      value: timer.hours,
    },
    {
      name: 'Minutes',
      value: timer.minutes,
    },
    {
      name: 'Seconds',
      value: timer.seconds,
    },
  ];
  arr = arr.filter((a) => a);

  return (
    <div
      className={
        'flex flex-col items-center w-fit  bg-1 p-[20px] rounded-[10px] px-[25px] ' +
        className
      }
    >
      {head}
      <div className="flex flex-row items-end text-f12">
        {arr.map((s, idx) => {
          return (
            <>
              <div className="flex flex-col items-center">
                <div
                  className={
                    'text-3 text-f14 uppercase ' +
                    (idx < arr.length - 1 ? 'mr-[30%]' : '')
                  }
                >
                  {s.name}
                </div>
                <div className="text-buffer-blue text-[50px] mt-[-8px]">
                  {s.value.toString().padStart(2, '0')}
                  {idx < arr.length - 1 ? ':' : ''}
                </div>
              </div>
            </>
          );
        })}
      </div>
      {shouldShowSocialMedia && (
        <>
          {' '}
          <span className="text-f12 pb-4 ">Join to stay updated!</span>
          <TImerStyle>
            {social.map((social_link) => {
              return (
                <Link to={social_link.link} key={social_link.name}>
                  <a
                    className="social_link pointer flex items-center"
                    target={'_blank'}
                  >
                    <img
                      key={social_link.name}
                      src={`/Social/Blue/${social_link.image}`}
                      className="social_link_icon"
                    />
                  </a>
                </Link>
              );
            })}
          </TImerStyle>
        </>
      )}
    </div>
  );
}
