import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.7rem;
  font-weight: 500;
`;

const FormTitle = (props) => {
  return <Title>{props.title}</Title>;
};

export default FormTitle;
