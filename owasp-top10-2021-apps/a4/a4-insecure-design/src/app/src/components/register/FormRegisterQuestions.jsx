import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import FormInput from "../inputs/FormInput";
import FormTitle from "../titles/FormTitle";
import FormButton from "../buttons/FormButton";

import { RegisterService } from "../../services/requests";

const Select = styled.select`
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

const FormRegisterQuestions = (props) => {
  let navigate = useNavigate();

  const questions = [
    "What is your favorite soccer team?",
    "What is the brand of your first car?",
    "What is your birthday?",
    "How old are you?",
  ];

  const [firstQuestion, setFirstQuestion] = useState(questions[0]);
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondQuestion, setSecondQuestion] = useState(questions[1]);
  const [secondAnswer, setSecondAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = props.login;
    const password = props.password;

    try {
      const register = await RegisterService({
        login,
        password,
        firstQuestion,
        firstAnswer,
        secondQuestion,
        secondAnswer,
      });
      if (register.message === "success") {
        navigate("/login", { msg: "User registered successfully!" });
      } else {
        props.setMessage(
          "User already exists or a problem has occurred. Try again!"
        );
        props.setRegisterStatus(false);
        props.setState("register");
      }
    } catch (err) {}
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <FormTitle title="Register" />
        <Select
          onChange={(e) => {
            setFirstQuestion(e.target.value);
          }}
          value={firstQuestion}
        >
          {questions.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <FormInput
          placeholder="first answer"
          type="text"
          setValue={setFirstAnswer}
          value={firstAnswer}
        />
        <Select
          onChange={(e) => {
            setSecondQuestion(e.target.value);
          }}
          value={secondQuestion}
        >
          {questions.map((item, key) => (
            <option key={key} value={item}>
              {item}
            </option>
          ))}
        </Select>
        <FormInput
          placeholder="second answer"
          type="text"
          setValue={setSecondAnswer}
          value={secondAnswer}
        />
        <FormButton type="submit" text="Register" />
      </form>
    </>
  );
};

export default FormRegisterQuestions;
