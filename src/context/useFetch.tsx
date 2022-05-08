import { useState, useEffect, useCallback } from 'react';
import { getToken } from '../utils/helpers';

function compareByLastUpdate(a: any, b: any) {
  if (a.updatedAt < b.updatedAt) {
    return 1;
  }
  if (a.updatedAt > b.updatedAt) {
    return -1;
  }
  return 0;
}

const useFetch = (url: string, clearData: boolean) => {
  const initData: any = {};
  const [data, setData] = useState(initData);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    // if url is null, return
    if (!url) return { data, loading };

    try {
      setLoading(true);

      // get bearer token from local storage
      const token = getToken();

      // fetch data
      const res = await fetch(url, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      });

      const newData = res.status === 200 ? await res.json() : [];

      let tab = newData;
      // sort data by username or last update
      if (tab && tab.length > 1) {
        tab.sort(compareByLastUpdate);
      }

      if (clearData) {
        setData(tab);
      }

      setLoading(false);
    } catch {
      setLoading(false);
      console.log('No fetch done');
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading };
};

export default useFetch;
