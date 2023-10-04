import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const fetcher = async (newFruitData: any) => {
  const { data } = await axios.post(
    "http://localhost:8080/fruits",
    newFruitData
  );
  return data;
};

const usePostFruits = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fruits"]);
    },
  });
};

export default usePostFruits;
