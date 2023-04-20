import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormButton from "../buttons/FormButton";
import FormInput from "../inputs/FormInput";
import FormTitle from "../titles/FormTitle";
import BoxError from "../error/BoxError";

import { ChangeService } from "../../services/requests";

const ChangePassword = () => {
  let navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("recovery_token");
      const status = await ChangeService(token, { password, repeatPassword });
      if (status.message === "success") {
        sessionStorage.removeItem("recovery_token");
        navigate("/login");
      } else {
        setPassword("");
        setRepeatPassword("");
        setMessage("Different passwords! Try again.");
      }
    } catch (err) {}
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <FormTitle title="Recovery" />
      {message !== "success" && message !== "" ? <BoxError message={message}/> : <></>}
      <FormInput
        placeholder="password"
        type="password"
        setValue={setPassword}
      />
      <FormInput
        placeholder="repeat password"
        type="password"
        setValue={setRepeatPassword}
      />
      <FormButton type="submit" text="Alterar" />
    </form>
  );
};

export default ChangePassword;
