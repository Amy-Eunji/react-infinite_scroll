// Main.js
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useGetFruits from "src/api/useGetFruits";
import Fruit from "src/templates/Fruit";
import { FruitType } from "src/types/Fruit";

const Main = () => {
  const [page, setPage] = useState<number>(1);
  const [visibleData, setVisibleData] = useState<FruitType[]>([]);
  const { data } = useGetFruits();
  const ref = useRef<any>(null);

  const handleScroll = useCallback((): void => {
    const { clientHeight, scrollTop, scrollHeight } = ref.current;

    if (clientHeight + scrollTop >= scrollHeight - 1) {
      setPage((prevPage: number) => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (data) {
      setVisibleData((prevVisibleData) => [...prevVisibleData, ...data]);
    }
  }, [data]);

  return (
    <Container>
      <Title>🍓 Infinite Scroll 🍓</Title>
      <List ref={ref}>
        {visibleData.map((fruit: FruitType) => (
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
  font-size: 40px;
  div {
    margin: 10px auto;
  }
`;

export default Main;
