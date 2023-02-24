import { useCallback, useState } from "react";

const useHttp = (reqConfig, transformerObject, loadConfig, blob = false) => {
  // const dispatchAction = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(loadConfig || false);

  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data, url) => {
      setIsLoading(true);
      setError(null);
      let response;
      try {
        response = await fetch(url ? url : reqConfig.url, {
          method: reqConfig.method ? reqConfig.method : "POST",
          headers: reqConfig.headers
            ? reqConfig.headers
            : {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
          body: reqConfig.body
            ? JSON.stringify(reqConfig.body)
            : JSON.stringify(data),
        });
        if (!response.ok) {
          // Getting the message from the server
          let resData = await response.json();
          // eslint-disable-next-line no-throw-literal
          throw {
            message: resData.message,
            status: response.status,
            data: resData.data,
          };
        }
        let resData;
        if (blob) {
          resData = await response.blob();
        } else {
          resData = await response.json();
        }
        setHasMore(resData.hasMore);
        if (reqConfig.operationType) {
          transformerObject[reqConfig.operationType](resData);
        } else {
          transformerObject(resData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [
      reqConfig.url,
      reqConfig.method,
      reqConfig.headers,
      reqConfig.body,
      reqConfig.operationType,
      blob,
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
 * fetch("url",
        { 
            method: "POST",
            headers: { "Content-Type": "application/json",'Authorization': 'Bearer ' + window.localStorage["Access_Token"]},
            body:data
        }).then(response => response.blob()).then(response => ...*your code for download*... )
 */
