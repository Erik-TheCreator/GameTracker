import React from 'react'
import "./PageCadastro.css"
import { Textfield } from '../components/textfield'
import { Botao } from '../components/botao'
export const PageCadastro = () => {
  return (
    <div id='Container2'>
        <h1>Cadastro</h1>
        <Textfield type="Text" Placeholder="Nome"/>
        <Textfield type="Email" Placeholder="Email"/>
        <Textfield type="Password" Placeholder="Senha"/>
        <Botao/>
        
    </div>
  )
}
