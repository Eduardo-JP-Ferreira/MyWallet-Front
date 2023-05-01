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
    
        console.log("token: ",response.data.token)
        console.log("name: ",response.data.name)
        setNomeLogin(response.data.name)
        setToken(response.data.token)
        navigate('/home')
        } )
      requisicao.catch(resposta => {
        alert("ERRO REQ")
        alert(resposta.response.data.message)
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
