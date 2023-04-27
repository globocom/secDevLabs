import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 375px;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #ab47bc;
  transition: 0.3s;
  border: 1px solid #ab47bc;
  border-width: thin;
  color: white;
  font-size: 1.1rem;

  &:hover {
    transition: 0.3s;
    background-color: #790e8b;
  }
`;
const FormButton = (props) => {
  return (
    <>
      <Button type={props.type}>{props.text}</Button>
    </>
  );
};

export default FormButton;
