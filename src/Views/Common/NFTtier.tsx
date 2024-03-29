import { useUserAccount } from '@Hooks/useUserAccount';
import { useHighestTierNFT } from '@Views/NFTView/useNFTGraph';

export default function NFTtier() {
  const { highestTierNFT } = useHighestTierNFT();
  const { address } = useUserAccount();
  if (!address) return <></>;
  if (highestTierNFT === null)
    return (
      <div className="group flex items-center justify-center text-f13 bg-[#2C2C41] h-[30px] w-fit rounded-[7px] pl-5 special-hover hover:brightness-125 tb">
        <img src={`/LeaderBoard/Bronze.png`} className="w-5 mr-2" />
        <div className="pr-5 py-1 rounded-[5px] text-f12 text-1 font-normal">
          Bronze Tier
        </div>
      </div>
    );
  return (
    <div className="group flex items-center justify-center text-f13 bg-[#2C2C41] h-[30px] w-fit rounded-[7px] pl-5 special-hover hover:brightness-125 tb">
      <img
        src={`/LeaderBoard/${highestTierNFT.tier}.png`}
        className="w-5 mr-2"
      />
      <div className="pr-5 py-1 rounded-[5px] text-f12 text-1 font-normal">
        {highestTierNFT.tier} Tier
      </div>
    </div>
  );
}
