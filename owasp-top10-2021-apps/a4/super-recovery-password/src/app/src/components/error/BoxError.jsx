import React from "react";
import styled from "styled-components";

const Box = styled.div`
  max-width: 80%;
  border: 2px solid rgba(121, 14, 139, 0.5);
  height: 40px;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color:rgba(171, 71, 188, 0.7);
  color: white;
`;

const BoxError = (props) => {
  return (
    <>
      <Box><strong>{props.message}</strong></Box>
    </>
  );
};

export default BoxError;
