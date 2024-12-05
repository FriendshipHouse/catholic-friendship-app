import axios from 'axios';

export const fetcher = async (url: string, params?: { [key: string]: any }) => {
  return await axios.get(url, params).then((data) => data?.data);
};
