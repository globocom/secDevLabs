import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import FormInput from "./inputs/FormInput";
import FormButton from "./buttons/FormButton";
import FormTitle from "./titles/FormTitle";
import BoxError from "./error/BoxError";

import { LoginService } from "../services/requests";

const Button = styled.div`
  width: 372px;
  height: 35px;
  border-radius: 5px;
  transition: 0.3s;
  border: 1px solid #ab47bc;
  color: #ab47bc;
  font-size: 1.1rem;
  text-decoration: none;
`;

const Link = styled.a`
  width: 100%;
  height: 40px;
  color: #ab47bc;
  text-decoration: none;
`;

const Form = () => {
  let navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await LoginService({ login, password });
      if (response !== null) {
        setMessage("success");
        sessionStorage.setItem("access_token", response.token);
        navigate("/restricted");
      } else {
        setMessage("Invalid credentials! Try again.");
        setLogin("");
        setPassword("");
      }
    } catch (err) {}
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <FormTitle title="Login" />
        {message !== "success" && message !== "" ? <BoxError message={message}/> : <></>}
        <FormInput placeholder="login" type="text" setValue={setLogin} />
        <FormInput placeholder="password" type="password" setValue={setPassword} />
        <FormButton type="submit" text="Login" />
        <Button>
          <Link href="register">Register</Link>
        </Button>
        <Link href="recovery">Forgot password?</Link>
      </form>
    </>
  );
};

export default Form;
