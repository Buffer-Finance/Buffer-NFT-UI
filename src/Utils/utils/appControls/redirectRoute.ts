import router from "next/router";

const redirectRoute = (path: string) => {
  console.log(router.query, path);

  router.replace({
    pathname: router.pathname,
    query: {
      ...router.query,
      chain: path,
    },
  });
};

export default redirectRoute;
