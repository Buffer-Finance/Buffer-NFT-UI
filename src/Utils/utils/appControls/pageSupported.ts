import { CHAIN_CONFIGS } from "Config/index";

const isPageSupported = (idx: number, router) => {
  let requestedChain = router.query?.chain;

  // requestedChain = "ARBITRUM";

  if (requestedChain && requestedChain !== "") {
    const chainObj =
      CHAIN_CONFIGS[process.env.ENV.toUpperCase()][
        (requestedChain as string).toUpperCase()
      ];
    return chainObj && chainObj.supportedPages && chainObj.supportedPages[idx]
      ? true
      : false;
  }
  return null;
};
export default isPageSupported;
