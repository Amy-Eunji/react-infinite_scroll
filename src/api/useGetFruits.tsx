import axios from "axios";
import { useQuery } from "react-query";

const fetcher = async () => {
  const { data } = await axios.get("http://localhost:8080/fruits");
  return data;
};

const useGetFruits = () => {
  const { data } = useQuery(["fruits"], fetcher);
  return { data };
};

export default useGetFruits;
