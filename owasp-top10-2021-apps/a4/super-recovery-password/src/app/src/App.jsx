import React from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Form from "./components/Form";
import FormRegister from "./components/register/FormRegister";
import Restricted from "./components/restricted/Restricted";
import FormRecovery from "./components/recovery/FormRecovery";
import HeaderForm from "./components/headers/HeaderForm";
import ChangePassword from "./components/change-password/ChangePassword";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const LeftSide = styled.div`
  height: 100vh;
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ab47bc;
`;
const RightSide = styled.div`
  height: 100vh;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 60vh;
  
  width: 60vh;

  & form {
    width: 100%
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    & a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    & div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }

  }
`;

const App = () => {
  return (
    <div className="App">
      <Container>
        <LeftSide>
          <HeaderForm />
        </LeftSide>
        <RightSide>
          <Body>
            <Routes>
              <Route path="*" element={<Form />} />
              <Route exact path="/login" element={<Form />} />
              <Route exact path="/register" element={<FormRegister />} />
              <Route exact path="/recovery" element={<FormRecovery />} />
              <Route exact path="/password" element={<ChangePassword />} />
              <Route exact path="/restricted" element={<Restricted />} />
            </Routes>
          </Body>
        </RightSide>
      </Container>
    </div>
  );
};

export default App;
