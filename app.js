'use strict'

const form = document.querySelector('form')
const input = document.querySelector('input')

//função de buscar o filme está pronta e funcionando.
async function buscarFilmes(filme){
    let busca = `t=${filme}&plot=full`
   const url = `http://www.omdbapi.com/?apikey=e716a445&${busca}`

   const dados = await fetch(url) 
   const response = await dados.json()

   console.log(response)
   return response
}

const container = document.getElementById('container')



//preventDefault = captura o evento de submit (pesquisa) e impede que o formulario seja recarregado imediatamente
form.addEventListener('submit', (evento) => {evento.preventDefault()
    buscarFilmes(input.value)
})

//NECESSÁRIO CRIAR A TELA AGORA, COM OS CREATE ELEMENT!!!