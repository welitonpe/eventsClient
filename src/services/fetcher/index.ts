import FetcherError from "./FethcerErros";

type Fetcher = <T = any>(
  resource: RequestInfo,
  options?: RequestInit
) => Promise<T | undefined>;

const fetcher: Fetcher = async <T = any>(
  resource: RequestInfo,
  options?: RequestInit
): Promise<T | undefined> => {
  const response = await fetch(resource, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new FetcherError(
      "An error occurred while fetching the data."
    );

    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  if (options?.method !== "DELETE" && response.status !== 204) {
    return response.json();
  }
};

export default fetcher;
