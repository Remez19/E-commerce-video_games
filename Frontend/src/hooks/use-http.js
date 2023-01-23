import { useCallback, useState } from "react";

const useHttp = (reqConfig, transformerObject, loadConfig) => {
  // const dispatchAction = useDispatch();
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(loadConfig || false);

  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      setError(null);
      let response;
      try {
        response = await fetch(reqConfig.url, {
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
          let message = (await response.json()).message;
          // eslint-disable-next-line no-throw-literal
          throw { message, status: response.status };
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
