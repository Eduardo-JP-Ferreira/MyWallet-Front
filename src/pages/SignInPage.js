import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignInPage({
  emailLogin, setEmailLogin, senhaLogin, setSenhaLogin,
  token, setToken, setNomeLogin
}) {
  const navigate = useNavigate()

  function executarLogin(event){
    event.preventDefault();
      // alert(`email: ${emailLogin}, senha: ${senhaLogin} `)
      
      const objetoLogin = {
        email: `${emailLogin}`,
        password: `${senhaLogin}`
      }
      console.log(objetoLogin)
      // REACT_APP_API_URL
      const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/`, objetoLogin)
      requisicao.then((response) => {
    
        setNomeLogin(response.data.name)
        localStorage.setItem("nomeLogin",response.data.name)
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        navigate('/home')
        } )
      requisicao.catch(resposta => {
        alert(resposta.response.data)
      })
  }


  return (
    <SingInContainer>
      <form onSubmit={executarLogin}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" 
        required onChange={e => setEmailLogin(e.target.value)}/>

        <input placeholder="Senha" type="password" autocomplete="new-password" 
        required onChange={e => setSenhaLogin(e.target.value)}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to={`/cadastro`}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
