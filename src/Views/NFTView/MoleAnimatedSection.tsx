import { getStyle, random } from '@Hooks/Utilities/stakingUtilities';
import { useLayoutEffect, useRef, useState } from 'react';
import 'keen-slider/keen-slider.min.css';

const down = 'MoleDown';
const downClass = 'mole-down-anim';
const upClass = 'mole-up-anim';
const up = 'MoleUp';

const getCDNImage = (image: number) => {
  return `https://cdn.buffer.finance/optopi/wobg/${image}.png`;
};

const getHeight = (idx) => {
  if (idx == 1) return '0px';
  return 'auto';
};

const randomeImgUrl = () => {
  return getCDNImage(random(1, 500));
};
const cols = 5;

export const MoleAnimatedSection = () => {
  const [moles, setMoles] = useState(
    new Array(cols).fill(0).map((_, i) => {
      return { imgs: [randomeImgUrl(), randomeImgUrl()], animate: i % 2 };
    })
  );
  // const [sliderRef, instanceRef] = useKeenSlider(
  //   {
  //     loop: true,
  //     breakpoints: {
  //       "(max-width: 600px)": {
  //         slides: {
  //           perView: 2,
  //         },
  //       },
  //       "(min-width: 1400px)": {
  //         slides: {
  //           perView: 7,
  //         },
  //       },
  //     },
  //   },
  //   [
  //     (slider) => {
  //       let timeout: ReturnType<typeof setTimeout>;
  //       let mouseOver = false;
  //       // function clearNextTimeout() {
  //       //   clearTimeout(timeout);
  //       // }
  //       // function nextTimeout() {
  //       //   clearTimeout(timeout);
  //       //   if (mouseOver) return;
  //       //   timeout = setTimeout(() => {
  //       //     slider.next();
  //       //   }, 4000);
  //       // }
  //       slider.on("created", () => {
  //         slider.container.addEventListener("mouseover", () => {
  //           mouseOver = true;
  //           // clearNextTimeout();
  //         });
  //         slider.container.addEventListener("mouseout", () => {
  //           mouseOver = false;
  //           // nextTimeout();
  //         });
  //         // nextTimeout();
  //       });
  //       // slider.on("dragStarted", clearNextTimeout);
  //       // slider.on("animationEnded", nextTimeout);
  //       // slider.on("updated", nextTimeout);
  //     },
  //   ]
  // );
  const divRefs = useRef<HTMLDivElement[]>([]);
  useLayoutEffect(() => {
    const alternate = (visibleIdx) => {
      if (visibleIdx == 1) return 0;
      return 1;
    };
    let timeout = null;
    function unmountcb() {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const len = divRefs.current.length;
        const animations = random(1, Math.floor(len - 1));
        new Array(animations).fill(0).forEach(() => {
          const targetDiv = divRefs.current[random(0, 4)];
          targetDiv.classList.add(downClass);
        });
      }, 1000);
    }
    divRefs.current.forEach((el, idx) => {
      el.addEventListener('animationend', (evt: AnimationEvent) => {
        if (evt.animationName == down) {
          el.classList.remove(downClass);
          el.classList.remove(downClass + 'delayed');
          const imgs = el.querySelectorAll('img');
          let visibleIdx = -1;
          imgs.forEach((img, idx) => {
            const style = getStyle(img, 'height');
            if (style == '0px') {
              visibleIdx = idx;
            }
          });
          imgs[alternate(visibleIdx)].src = randomeImgUrl();
          imgs[visibleIdx].style.height = 'auto';
          imgs[alternate(visibleIdx)].style.height = '0px';
          el.classList.add(upClass);
        } else if (evt.animationName == up) {
          el.classList.remove(upClass);
          unmountcb();
        }
      });
    });
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className="keen-slider">
      {moles.map((mole, idx) => (
        <div
          ref={(el) => (divRefs.current[idx] = el)}
          className={`${
            idx + 1
          }-molebox keen-slider__slide w-[20%] sm:w-[50%] ${
            mole.animate ? downClass + 'delayed' : ''
          } ${idx > 1 ? 'sm:hidden' : ''} `}
        >
          {mole.imgs.map((src, i) => (
            <img src={src} style={{ height: getHeight(i) }} />
          ))}
        </div>
      ))}
    </div>
  );
};
