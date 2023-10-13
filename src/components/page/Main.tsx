import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useGetFruits from "src/api/useGetFruits";
import Fruit from "src/templates/Fruit";
import { FruitType } from "src/types/Fruit";

const Main = () => {
  const { data } = useGetFruits();
  const [page, setPage] = useState<number>(1);
  const [load, setLoad] = useState<FruitType[]>([]);
  const ref = useRef<any>(null);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const { clientHeight, scrollTop, scrollHeight } = ref.current;

      if (clientHeight + scrollTop >= scrollHeight - 1) {
        if (data.pages && data.pages[page]) {
          setLoad((prevLoad) => prevLoad.concat(data.pages[page].data));
          setPage((prevPage: number) => prevPage + 1);
        }
      }
    }
  }, [data, page]);

  useEffect(() => {
    if (data) {
      if (data.pages && data.pages[page]) {
        setLoad(data.pages[page].data);
      }
    }
  }, [data]);

  useEffect(() => {
    if (ref.current) {
      window.addEventListener("scroll", handleScroll, true);
    }

    return () => {
      if (ref.current) {
        window.removeEventListener("scroll", handleScroll, true);
      }
    };
  }, [handleScroll]);

  return (
    <Container>
      <Title>🍏 Infinite Scroll 🍏</Title>
      <List ref={ref}>
        {data.map((fruit: FruitType) => (
          <Fruit key={fruit.id} fruit={fruit} />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 50px;
`;

const List = styled.div`
  margin: 20px 0 0;
  font-size: 35px;
`;

export default Main;
