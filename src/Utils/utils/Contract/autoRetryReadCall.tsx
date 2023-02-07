import { RETRY_LIMIT } from "Config/index";
import router from "next/router";
import getNodeUrl from "./getNodeUrl";

let currentTry: number = 0;
const autoRetryReadCall = async (
  contract,
  property: string,
  methodName: string,
  methodArgs: any[] = []
) => {
  let ans = await contract.methods[methodName](...methodArgs).call();

  return ans;
};

export default autoRetryReadCall;
