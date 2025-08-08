import "./PageLogin.css"
import TextField from '../components/textfield'
import { Botao } from '../components/botao'



export const PageLogin = () => {
  return (
    <div id='Container'>
        <h1>Login</h1>
        <TextField tipo={"text"} placeholder={"Login"}/>
        <TextField type={"Password"} placeholder={"senha"}/>
        <Botao/>
    </div>
  )
}
