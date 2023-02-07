import { CHAIN_CONFIGS } from "Config/index";

const getSupportedPages = (router) => {
  const requestedChain = router.query.chain;
  if (requestedChain && requestedChain !== "") {
    const chainObj =
      CHAIN_CONFIGS[process.env.ENV.toUpperCase()][
        (requestedChain as string).toUpperCase()
      ];
    if (chainObj) {
      return chainObj.supportedPages as number[];
    }
  }
  return [];
};
export default getSupportedPages;
