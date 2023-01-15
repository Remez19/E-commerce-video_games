import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../Store/ui";

const useHttp = (reqConfig, transformerObject) => {
  const dispatchAction = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data) => {
      dispatchAction(uiSliceActions.setLoading(true));
      setError(null);
      try {
        console.log(reqConfig.url);
        const response = await fetch(reqConfig.url, {
          method: reqConfig.method ? reqConfig.method : "POST",
          headers: reqConfig.headers
            ? reqConfig.headers
            : { "Content-Type": "application/json" },
          body: reqConfig.body
            ? JSON.stringify(reqConfig.body)
            : JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Request Failed!");
        }
        const resData = await response.json();
        // call back to use the data we fetched
        function delay(milliseconds) {
          return new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
          });
        }
        await delay(1500);
        setHasMore(resData.hasMore);
        transformerObject[reqConfig.operationType](resData);
      } catch (err) {
        setError(err.meesage || "Something Went worng with request!");
      }
      dispatchAction(uiSliceActions.setLoading(false));
    },
    [
      dispatchAction,
      reqConfig.url,
      reqConfig.method,
      reqConfig.headers,
      reqConfig.body,
      reqConfig.operationType,
      transformerObject,
    ]
  );
  return {
    error,
    sendRequest,
    isLoading,
    hasMore,
  };
};

export default useHttp;
/**
 * reqConfig.url, reqConfig.method, reqConfig.headers, reqConfig.body,
 */
