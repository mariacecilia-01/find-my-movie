'use strict'

const form = document.querySelector('form')
const input = document.querySelector('input')
const container = document.getElementById('container')

const MESSAGE_ERROR = 'Filme não encontrado!'

function cardFilme(filmeData){
    container.innerHTML = ''

    if(filmeData.Response == 'True' && filmeData.Search){
        filmeData.Search.forEach(filme => {
        const div = document.createElement('div')
        div.classList.add('movie-card-search')

        //as informações que vao estar dentro do card
        const image = document.createElement('img')
        const buttonVerFilme = document.createElement('button')
        const tituloFilme = document.createElement('h2')

        const posterUrl = filme.Poster === 'N/A' 
            ? 'https://corsproxy.io/?url=https://placehold.co/300x450/333333/ffffff?text=Poster+N/D' 
            : filme.Poster;

        image.src = posterUrl
        image.alt = `Capa de ${filme.Title}`
        image.classList.add('movie-poster')

        tituloFilme.textContent = filme.Title
        tituloFilme.classList.add('movie-title')

        buttonVerFilme.textContent = 'VER FILME'
        buttonVerFilme.classList.add('detail-button')

        buttonVerFilme.addEventListener('click', () => {
            window.location.href = `https://mariacecilia-01.github.io/find-my-movie/index2.html?id=${filme.imdbID}`
        });

        div.appendChild(image)
        div.appendChild(tituloFilme)
        div.appendChild(buttonVerFilme)

        container.appendChild(div)
    })

    } else {
        return MESSAGE_ERROR
    }
    
    }

//função de buscar o filme está pronta e funcionando.
async function buscarFilmes(filme){
    let busca = `s=${filme}&plot=full`
   const url = `https://corsproxy.io/?url=https://www.omdbapi.com/?apikey=e716a445&${busca}`

   const dados = await fetch(url) 
   const response = await dados.json()

   console.log(response)
   cardFilme(response)
}

//preventDefault = captura o evento de submit (pesquisa) e impede que o formulario seja recarregado imediatamente
form.addEventListener('submit', (evento) => {
    evento.preventDefault()
    buscarFilmes(input.value)
})