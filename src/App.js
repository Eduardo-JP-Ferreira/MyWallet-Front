import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react";


export default function App() {

const BASE_URL = "http://localhost:5000";

const [emailCadastro, setEmailCadastro] = useState("")
const [senhaCadastro, setSenhaCadastro] = useState("")
const [nomeCadastro, setNomeCadastro] = useState("")

const [emailLogin, setEmailLogin] = useState("")
const [senhaLogin, setSenhaLogin] = useState("")
const [nomeLogin, setNomeLogin] = useState("")
const [token, setToken] = useState("")
  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage 
          emailLogin={emailLogin} setEmailLogin={setEmailLogin}
          senhaLogin={senhaLogin} setSenhaLogin={setSenhaLogin} 
          token={token} setToken={setToken} BASE_URL={BASE_URL}
          setNomeLogin={setNomeLogin}
          />} />
          <Route path="/cadastro" element={<SignUpPage
          emailCadastro={emailCadastro} setEmailCadastro={setEmailCadastro} 
          senhaCadastro={senhaCadastro} setSenhaCadastro={setSenhaCadastro}
          nomeCadastro={nomeCadastro} setNomeCadastro={setNomeCadastro}
          BASE_URL={BASE_URL}
          />} />
          <Route path="/home" element={<HomePage 
          token={token} setToken={setToken} nomeLogin={nomeLogin}
          />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
