import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import useGetFruits from "src/api/useGetFruits";
import Fruit from "src/templates/Fruit";
import { FruitType } from "src/types/Fruit";

const Main = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetFruits();
  const [loadData, setLoadData] = useState(false);
  const ref = useRef<any>(null);

  const handleScroll = useCallback(() => {
    if (ref.current && !isFetchingNextPage) {
      const { clientHeight, scrollTop, scrollHeight } = ref.current;
      if (clientHeight + scrollTop >= scrollHeight - 1 && hasNextPage) {
        setLoadData(true);
      }
    }
  }, [hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (loadData) {
      fetchNextPage();
      setLoadData(false);
    }
  }, [loadData, fetchNextPage]);

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
      <Title>🍏 Infinite_Scroll 🍏</Title>
      <List ref={ref}>
        {data &&
          data.pages.map((pageData) =>
            Array.isArray(pageData)
              ? pageData.map((fruit: FruitType) => (
                  <Fruit key={fruit.id} fruit={fruit} />
                ))
              : null
          )}
      </List>
      {isFetchingNextPage ? <div>로딩중 !</div> : null}
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
