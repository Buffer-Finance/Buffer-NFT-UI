import { LONG_TIMEOUT } from "Config/index";
import { CHAIN_CONFIGS } from "Config/index";
import axiosInstance from "config/axios";
import { GlobalActions, iGlobalState } from "Contexts/Global/reducer";
import { getApi } from "./api";

const contextInitializers = async (
  state: iGlobalState,
  dispatch: (props: GlobalActions) => void
) => {
  if (!state.settings.activeChain) return;
  const env =
    CHAIN_CONFIGS[process.env.ENV][state.settings.activeChain.name].env;

  const [res, err] = await getApi(
    "/status/",
    {
      env: env,
    },
    { timeout: LONG_TIMEOUT }
  );
  if (err) {
    console.log("error while fetching assets");
    return;
  }
  const optionProviders = res && res.option_assets[env];
  dispatch({ type: "UPDATE_ASSETS", payload: optionProviders });
  dispatch({ type: "UPDATE_CATAGORIES", payload: res.categories });

  axiosInstance
    .get("/contracts/", {
      params: {
        environment: env,
      },
      timeout: LONG_TIMEOUT,
    })
    .then((res) =>
      dispatch({ type: "UPDATE_CONTRACTS", payload: res.data.data })
    );
};

export default contextInitializers;
