import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const fetcher = async (id: any) => {
  const { data } = await axios.delete(`http://localhost:8080/fruits/${id}`);
  return data;
};

const useDeleteFruits = () => {
  const queryClient = useQueryClient();
  return useMutation(fetcher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fruits"]);
    },
  });
};

export default useDeleteFruits;
