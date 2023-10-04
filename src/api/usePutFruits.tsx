import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const usePutFruits = () => {
  const queryClient = useQueryClient();
  const fetcher = async ({ id, name }: any) => {
    const { data } = await axios.put(`http://localhost:8080/fruits/${id}`, {
      name,
    });
    return data;
  };

  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fruits"]);
    },
  });
};

export default usePutFruits;
