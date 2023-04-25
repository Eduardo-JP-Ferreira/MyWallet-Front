import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function SignUpPage({
  emailCadastro, setEmailCadastro, senhaCadastro, setSenhaCadastro,
  nomeCadastro, setNomeCadastro, BASE_URL}) {
  const navigate = useNavigate()
  const [verificaSenha, setVerificaSenha] = useState("")
  

    function executarCadastro(event){
      event.preventDefault();
      // alert(`nome: ${nomeCadastro}, email: ${emailCadastro}, senha: ${senhaCadastro}, DSenha: ${verificaSenha} `)
      if(senhaCadastro===verificaSenha){
        const objetoCadastro = {
          name: `${nomeCadastro}`,
          email: `${emailCadastro}`,
          password: `${senhaCadastro}`
        }
        console.log(objetoCadastro)
        const requisicao = axios.post(`${BASE_URL}/sign-up`, objetoCadastro)
        requisicao.then(() => {
          alert("OK")
          navigate('/')
         } )
        requisicao.catch(resposta => {
          alert("ERRO REQ")
          alert(resposta.response.data.message)

        })
      }
      else{
        alert("Senhas Distintas")
      }
    }

  return (
    <SingUpContainer>
      <form onSubmit={executarCadastro}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" required 
        onChange={e => setNomeCadastro(e.target.value)} />

        <input placeholder="E-mail" type="email" required 
        onChange={e => setEmailCadastro(e.target.value)}/>

        <input placeholder="Senha" type="password" required 
        autocomplete="new-password" onChange={e => setSenhaCadastro(e.target.value)}/>

        <input placeholder="Confirme a senha" type="password" required 
        autocomplete="new-password" onChange={e => setVerificaSenha(e.target.value)}/>
        
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={`/`}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
