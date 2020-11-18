import * as React from "react";
import Loadable from "react-loadable";
import LoadingView from "../View/LoadingView";

/**
 * @param {String} content  The name of the page, eg. Signup / Login
 */

const createLoadable = (content) => {
  return Loadable({
    loader: () => import(`../View/${content}/index`),
    loading: ({ isLoading }) => isLoading && <LoadingView />,
  });
};

export default createLoadable;
