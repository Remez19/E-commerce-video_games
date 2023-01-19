import { useCallback, useState } from "react";

// import { useDispatch } from "react-redux";
// import { uiSliceActions } from "../Store/ui";

const useHttp = (reqConfig, transformerObject, loadConfig) => {
  // const dispatchAction = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(loadConfig || false);

  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      // dispatchAction(uiSliceActions.setLoading(true));
      setError(null);
      let response;
      try {
        response = await fetch(reqConfig.url, {
          method: reqConfig.method ? reqConfig.method : "POST",
          headers: reqConfig.headers
            ? reqConfig.headers
            : { "Content-Type": "application/json" },
          body: reqConfig.body
            ? JSON.stringify(reqConfig.body)
            : JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error((await response.json()).message);
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
        if (reqConfig.operationType) {
          transformerObject[reqConfig.operationType](resData);
        } else {
          transformerObject(resData);
        }
      } catch (err) {
        setError({
          message: err.message || "Something Went worng with request!",
          status: response.status || 404,
        });
      } finally {
        setIsLoading(false);
      }
      // dispatchAction(uiSliceActions.setLoading(false));
    },
    [
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
