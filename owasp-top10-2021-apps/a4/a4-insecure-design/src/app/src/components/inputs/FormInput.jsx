import React from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 80%;
  height: 40px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid;
  border-color: #eaeaea;
  font-size: 1rem;
  text-indent: 10px;
`;

const FormInput = (props) => {
  return (
    <>
      {props.tag === "disabled" ? (
        <Input
          placeholder={props.placeholder}
          type={props.type}
          onChange={(e) => props.setValue(e.target.value)}
          disabled
          required
        />
      ) : (
        <Input
          placeholder={props.placeholder}
          type={props.type}
          onChange={(e) => props.setValue(e.target.value)}
          required
        />
      )}
    </>
  );
};

export default FormInput;
