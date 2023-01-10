import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { uiSliceActions } from "../Store/ui";

const useHttp = (reqConfig, dataTransformer) => {
  const dispatchAction = useDispatch();
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (taskText) => {
      dispatchAction(uiSliceActions.setLoading(true));
      setError(null);
      try {
        const response = await fetch(reqConfig.url, {
          method: reqConfig.method ? reqConfig.method : "POST",
          headers: reqConfig.headers ? reqConfig.headers : {},
          body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
        });
        if (!response.ok) {
          throw new Error("Request Failed!");
        }
        const resData = await response.json();
        // call back to use the data we fetched
        dataTransformer(resData);
      } catch (err) {
        setError(err.meesage || "Something Went worng with request!");
      }
      dispatchAction(uiSliceActions.setLoading(false));
    },
    [
      dataTransformer,
      dispatchAction,
      reqConfig.body,
      reqConfig.headers,
      reqConfig.method,
      reqConfig.url,
    ]
  );
  return {
    error,
    sendRequest,
  };
};

export default useHttp;
