// Main.js
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query"; // react-query 추가
import axios from "axios";

import { FruitType } from "src/types/Fruit";
import Fruit from "src/templates/Fruit";

const fetcher = async () => {
  const { data } = await axios.get("http://localhost:8080/fruits");
  return data;
};

const Main = () => {
  const [page, setPage] = useState<number>(1);
  const [visibleData, setVisibleData] = useState<FruitType[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  // react-query를 사용하여 데이터 가져오기
  const { data } = useQuery(["fruits"], fetcher);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const { clientHeight, scrollTop, scrollHeight } = ref.current;

    if (clientHeight + scrollTop >= scrollHeight - 1) {
      // 새로운 페이지 데이터를 추가로 로드합니다.
      const start = page * 20;
      const end = (page + 1) * 20;
      const newData = data.slice(start, end);
      setVisibleData((prevVisibleData) => [...prevVisibleData, ...newData]);
      setPage((prevPage: number) => prevPage + 1);
    }
  }, [data, page]);

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

  useEffect(() => {
    // 초기 데이터를 visibleData에 설정합니다.
    if (data) {
      const initialData = data.slice(0, 20);
      setVisibleData(initialData);
    }
  }, [data]);

  if (!visibleData) return null;

  return (
    <Container>
      <Title>🍓 Infinite Scroll 🍓</Title>
      <List ref={ref}>
        {visibleData.map((fruit: FruitType, i: number) => (
          <Fruit key={fruit.id} fruit={fruit} index={i} />
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
