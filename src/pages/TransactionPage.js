import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function TransactionsPage({token}) {

  const navigate = useNavigate()
  const {tipo}  = useParams()
  const [valor, setValor] = useState("")
  const [descricao, setDescricao] = useState("")
  let objetoOperacao
  function executar(event){
    event.preventDefault();

  const config = {
      headers: { Authorization: `Bearer ${token}` }
  }

    if(tipo==="Entrada"){
      objetoOperacao = {
        value: Number(valor),
        type: "deposit",
        description: descricao
      }
    }
    else{
      objetoOperacao = {
        value: valor,
        type: "withdraw",
        description: descricao
      }
    }
    console.log(objetoOperacao)
    const requisicao = axios.post(`${process.env.REACT_APP_API_URL}/ope`, objetoOperacao, config)
    requisicao.then((response) => {
      navigate('/home')
      } )
    requisicao.catch(resposta => {
      alert("ERRO REQ")
      alert(resposta.response.data.message)
    })
    
  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={executar}>
        <input placeholder="Valor" required type="number" step="0.01"
        onChange={e => setValor(e.target.value)} />
        <input placeholder="Descrição" required type="text" 
        onChange={e => setDescricao(e.target.value)}/>
        <button type="submit">Salvar {tipo}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
