import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceActions } from "../Store/ui";

const useHttp = (reqConfig, dataTransformer) => {
  const dispatchAction = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const isLoading = useSelector((state) => state.ui.isLoading);

  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data) => {
      dispatchAction(uiSliceActions.setLoading(true));
      setError(null);
      try {
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
        dataTransformer(resData);
      } catch (err) {
        setError(err.meesage || "Something Went worng with request!");
      }
      dispatchAction(uiSliceActions.setLoading(false));
    },
    [
      dataTransformer,
      reqConfig.body,
      reqConfig.headers,
      reqConfig.method,
      reqConfig.url,
      dispatchAction,
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
