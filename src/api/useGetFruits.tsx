// useGetFruits.js
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchFruits = async () => {
  const { data } = await axios.get(`http://localhost:8080/fruits`);
  return data;
};

const useGetFruits = () => {
  return useInfiniteQuery("fruits", fetchFruits, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length > 0) {
        return allPages.length + 1;
      }
      return null;
    },
  });
};

export default useGetFruits;
