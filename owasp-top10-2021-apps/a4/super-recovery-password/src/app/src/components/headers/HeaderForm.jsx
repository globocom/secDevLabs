import React from "react";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-size: 1.7rem;

  & h2 {
    font-weight: 300;
  }
`;

const HeaderForm = () => {
  return (
    <Header>
      <h1>A4</h1>
      <h2>Insecure Design</h2>
    </Header>
  );
};

export default HeaderForm;
