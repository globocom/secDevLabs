import React, { useState } from "react";

import FormTitle from "../titles/FormTitle";
import FormInput from "../inputs/FormInput";
import FormButton from "../buttons/FormButton";

import BoxError from "../error/BoxError";

import FormRegisterQuestions from "./FormRegisterQuestions";

const FormRegister = () => {
  const [state, setState] = useState("register");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState(true);
  const [message, setMessage] = useState("");

  const nextStep = async (e) => {
    e.preventDefault();
    setState("recovery");
  };

  return (
    <div>
      {state === "register" ? (
        <form method="POST" onSubmit={nextStep}>
          <FormTitle title="Register" />
          {registerStatus && message === "" ? (
            <></>
          ) : (
            <BoxError message={message} />
          )}
          <FormInput placeholder="login" type="text" setValue={setLogin} />
          <FormInput
            placeholder="password"
            type="password"
            setValue={setPassword}
          />
          <FormButton type="submit" text="Next" onClick={nextStep} />
        </form>
      ) : (
        <FormRegisterQuestions
          login={login}
          password={password}
          setMessage={setMessage}
          setRegisterStatus={setRegisterStatus}
          setState={setState}
        />
      )}
    </div>
  );
};

export default FormRegister;
