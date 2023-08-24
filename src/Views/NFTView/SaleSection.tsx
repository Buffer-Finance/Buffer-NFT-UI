import { getDistance } from '@Hooks/Utilities/stakingUtilities';
import useStopWatch from '@Hooks/Utilities/useStopWatch';
import { PreSaleSection } from './PresaleSection';
import { PhaseDataWrapper } from './PhaseDataWrapper';

const nftSaleTimeStamp = 1674144000;

export const SaleSection: React.FC<{
  scrollRef: React.MutableRefObject<null>;
}> = ({ scrollRef }) => {
  const distance = getDistance(nftSaleTimeStamp);
  const stopwatch = useStopWatch(nftSaleTimeStamp);
  const isSaleStarted = distance <= 0;

  return (
    <div
      className="flex justify-center py-6 w-full text-f22 mt-8"
      ref={scrollRef}
    >
      Sale has ended. It will be back soon.
    </div>
  );

  if (!isSaleStarted) {
    return (
      <div ref={scrollRef}>
        <PreSaleSection launchTimeStamp={nftSaleTimeStamp} />
      </div>
    );
  } else {
    return (
      <div ref={scrollRef}>
        <PhaseDataWrapper />
      </div>
    );
  }
};
