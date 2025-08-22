"use client";

import Header from './header';

type Morador = {
  primeiroNome: string,
  sobrenome: string
}

function formatarNomeMorador (morador: Morador){
  return morador.primeiroNome+" "+morador.sobrenome;    
}

export default function Home (){
  const element = <span>Hello World</span>

  function obterSaudacao(morador:null | Morador){
    if(morador){
      return <span>Olá, {formatarNomeMorador(morador)}</span>
    }
    return <span>Olá, Desconhecido.</span>
  }

  const morador = {
    primeiroNome: "João",
    sobrenome: "Oligorvado"
  }

  return (
    <div>
      <Header/>
      <div className='flex flex-cool items-center justify-center h-screen'>
        <h1 className="text-4xl px-10 py-5 rounded-lg bg-green-200 text-gray-500">{obterSaudacao(morador)}</h1>
      </div>
    </div>
  );
  
}