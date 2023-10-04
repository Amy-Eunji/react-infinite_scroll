export {};
// import { useState, useCallback, useEffect, useRef } from "react";
// import styled from "styled-components";

// import { postType } from "src/types/Fruit";

// const Scroll = (): JSX.Element => {
//   const [page, setPage] = useState<number>(1);
//   const [posts, setPosts] = useState<postType[]>(getPostList(1));
//   const ref = useRef<any>(null);

//   const handleScroll = useCallback((): void => {
//     const { clientHeight, scrollTop, scrollHeight } = ref.current;

//     if (clientHeight + scrollTop >= scrollHeight - 1) {
//       setPosts(posts.concat(getPostList(page + 1)));
//       setPage((prevPage: number) => prevPage + 1);
//     }
//   }, [page, posts]);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll, true);
//     return () => {
//       window.removeEventListener("scroll", handleScroll, true);
//     };
//   }, [handleScroll]);

//   return (
//     <Container>
//       <Title>콘텐츠 큐레이션 제목</Title>
//       <Content ref={ref}>
//         {posts.map(({ id, img, contents }: postType) => (
//           <Box key={id}>
//             <img src={img} alt="" />
//             <Text>{contents}</Text>
//           </Box>
//         ))}
//       </Content>
//     </Container>
//   );
// };

// const Container = styled.div`
//   overflow: hidden;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   background-color: #ebebeb;
//   padding-bottom: 40px;
// `;
// const Title = styled.div`
//   font-size: 14px;
//   font-weight: 500;
//   margin: 10px 10px 0;
// `;
// const Content = styled.div`
//   max-height: 500px;
//   overflow: auto;
// `;
// const Box = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   img {
//     border-radius: 5px;
//     position: relative;
//     left: 10px;
//   }
// `;
// const Text = styled.div`
//   width: 295px;
//   height: 45px;
//   margin: 10px 0;
//   background: #ffffff;
//   border-radius: 5px;
//   font-size: 14px;
//   font-weight: 600;
//   padding: 0 30px;
//   display: flex;
//   align-items: center;
// `;

// export default Scroll;
