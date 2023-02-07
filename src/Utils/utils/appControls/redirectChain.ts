import router from "next/router";

const redirectChain = (chain: string) => {
  router.replace({
    pathname: router.pathname,
    query: { ...router.query, chain },
  });
};

export default redirectChain;
