// @ts-nocheck
import { CHAIN_CONFIGS } from "Config/index";
import sample from "lodash/sample";
import Web3 from "web3";

// Array of available nodes to connect to
const getProvider = (chain?: string) => {
  // let url = sample(CHAIN_CONFIGS[process.env.ENV][chain].rpcUrls);
  return new Web3("https://rpc-mumbai.maticvigil.com/");
};

export default getProvider;
