import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormButton from "../buttons/FormButton";
import FormInput from "../inputs/FormInput";
import FormTitle from "../titles/FormTitle";
import BoxError from "../error/BoxError";

import { QuestionsService, ResetService } from "../../services/requests";

const FormRecovery = () => {
  let navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [login, setLogin] = useState("");
  const [firstAnswer, setFirstAnswer] = useState("");
  const [secondAnswer, setSecondAnswer] = useState("");
  const [message, setMessage] = useState("success")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await QuestionsService({ login }, setQuestions);
      setMessage(response.message)
    } catch (err) {}
  };

  const handleAnswers = async (e) => {
    e.preventDefault();
    try {
      const token = await ResetService({ login, firstAnswer, secondAnswer });
      if (token !== undefined) {
        setMessage("success")
        sessionStorage.setItem("recovery_token", token);
        navigate("/password");
      } else {
        setQuestions([])
        setMessage("Incorrect answers! Try again.")
      }
    } catch (err) {}
  };

  return (
    <>
      {questions.length === 0 ? (
        <form method="POST" onSubmit={handleSubmit}>
          <FormTitle title="Recovery" />
          {message !== "success" && message !== "" ? <BoxError message={message}/> : (<></>)}
          <FormInput placeholder="login" type="text" setValue={setLogin} />
          <FormButton type="submit" text="Next" />
        </form>
      ) : (
        <form method="POST" onSubmit={handleAnswers}>
          <FormTitle title="Recovery" />
          {
            <>
              <FormInput placeholder={questions[0]} tag="disabled" />
              <FormInput placeholder={"first answer"} setValue={setFirstAnswer} value={firstAnswer} />
              <FormInput placeholder={questions[1]} tag="disabled" />
              <FormInput placeholder={"second answer"} setValue={setSecondAnswer} value={secondAnswer} />
            </>
          }
          <FormButton type="submit" text="Recovery" />
        </form>
      )}
    </>
  );
};

export default FormRecovery;
