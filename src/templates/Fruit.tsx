import styled from "styled-components";

import { FruitType } from "src/types/Fruit";

const Fruit = ({ fruit, index }: { fruit: FruitType; index: number }) => {
  const { id, name } = fruit;

  return (
    <List key={id}>
      <span>
        {index + 1}. {name}
      </span>
    </List>
  );
};

const List = styled.div`
  input {
    width: 200px;
    height: 30px;
    font-size: 26px;
  }
`;

export default Fruit;
