/**
 * Custom hook for cache management with expiration
 */
const useCache = <T,>() => {
  const results = new Map()

  function setCache(query: string, data: T){
    results.set(query, data)
  }

  function getCache(query: string): T | null {
    const cachedData = results.get(query)

    if (cachedData) {
      return cachedData
    }
    return null;
  }

  return {
    getCache,
    setCache,
  };
};

export default useCache;
