import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage({
  token, setToken, nomeLogin,setNomeLogin, operacao, setOperacao
}) {
  const navigate = useNavigate()
  console.log("tok2", token)
  const [usuario, setUsuario] = useState([])
  

  useEffect(() => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    
    axios.get(`${process.env.REACT_APP_API_URL}/home`, config)
        .then((res) => {
          setUsuario(res.data)
          console.log(res.data)}
        )
        .catch((err) => alert("não deu"))
}, [])
  pega()
  function pega(){
    let saldo = 0
    usuario.map((item)=>{
      if(item.type === "deposit"){
        saldo += Number(item.value)
      }
      else{
        saldo -= Number(item.value)
      }
    })
    setOperacao(saldo)
  }

  function logout(){
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }

    axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, config)
        .then(() => {
            setToken(undefined)
            setNomeLogin(undefined)
            localStorage.clear()
            navigate("/")
        })
        .catch((err) => alert(err.response.data))
    
  }
  
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nomeLogin}</h1>
        <BiExit onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>
          
        {usuario.map((item)=>
          <ListItemContainer>
            <div>
              <span>{item.date}</span>
              <strong>{item.description}</strong>
            </div>
            <Value color={item.type}>{Number(item.value).toFixed(2)}</Value>
          </ListItemContainer>
        )}
          
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={Number(operacao) >= 0 ? "deposit" : "withdraw"}>{Number(operacao).toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/Entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/Saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`


const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "deposit" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`