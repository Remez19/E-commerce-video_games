import { useCallback, useState } from "react";
import axois from "axios";

const useHttp = (reqConfig, CallBack, loadConfig) => {
  // const dispatchAction = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(loadConfig || false);
  const [progress, setProgress] = useState();

  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data, url) => {
      const urlReq = reqConfig.url || url;
      const body = data || reqConfig.body;
      const headers = reqConfig.headers;
      const responseType = reqConfig.responseType;
      setIsLoading(true);
      setError(null);
      setProgress(0);
      let response;
      try {
        response = await axois.post(urlReq, body, {
          responseType: responseType,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
            ...headers,
          },
          onUploadProgress: (p) => {
            setProgress((p.loaded / p.total) * 100);
          },
        });
        let resData = response.data;
        if (response.status > 400) {
          throw new Error(resData.message);
        }
        setHasMore(resData.hasMore);
        // Can be done diffrent ?
        if (reqConfig.operationType) {
          CallBack[reqConfig.operationType](resData);
        } else {
          CallBack(resData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [
      CallBack,
      reqConfig.body,
      reqConfig.headers,
      reqConfig.operationType,
      reqConfig.responseType,
      reqConfig.url,
    ]
  );
  return {
    error,
    sendRequest,
    isLoading,
    hasMore,
    progress,
  };
};

export default useHttp;
