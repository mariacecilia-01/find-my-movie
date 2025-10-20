
'use strict'

const api_key = 'e716a445'
const container = document.getElementById('container')

const MESSAGE_ERROR = 'Detalhes não encontrado'


// Função para extrair o ID do filme (imdbID) da URL
function getIdFilmeDaUrl() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('id')
}

// Detalhes do filme pelo ID
async function buscarDetalhesDoFilme(id) {

    // Busca pela chave 'i' (ID) para obter detalhes do filme
    const url = `https://corsproxy.io/?url=http://www.omdbapi.com/?apikey=${api_key}&i=${id}&plot=full`
    
    try {
        const dados = await fetch(url)
        const filmeData = await dados.json()

        if (filmeData.Response === 'True') {
            infoFilmes(filmeData)
        } else {
            return MESSAGE_ERROR
        }
    } catch (error) {
        return MESSAGE_ERROR
    }
}

function infoFilmes(filmeData){
    container.innerHTML = ''

    // div principal para os detalhes
    const divDetalhes = document.createElement('div')
    divDetalhes.classList.add('filme-detalhe')

    // coluna com imagem e dados
    const colunaEsquerda = document.createElement('div')
    
    colunaEsquerda.classList.add('coluna-poster')
    
    const image = document.createElement('img')
    image.src = filmeData.Poster !== 'N/A' ? filmeData.Poster : 'https://placehold.co/300x450/333333/ffffff?text=Poster+N/D'
    image.alt = `Capa de ${filmeData.Title}`
    colunaEsquerda.appendChild(image)

    const dadosFilme = document.createElement('p')
    dadosFilme.classList.add('dados-filme')
    dadosFilme.innerHTML = `
        <strong>IMDb ID:</strong> ${filmeData.imdbID}<br>
        <strong>Lançamento:</strong> ${filmeData.Released}<br>
        <strong>Duração:</strong> ${filmeData.Runtime}<br>
        <strong>Diretor:</strong> ${filmeData.Director}<br>`

    colunaEsquerda.appendChild(dadosFilme)
    
    // Titulo, outras informações e sinopse do filme
    const colunaDireita = document.createElement('div')
    colunaDireita.classList.add('coluna-info')

    const tituloFilme = document.createElement('h1')
    tituloFilme.textContent = filmeData.Title
    colunaDireita.appendChild(tituloFilme)

    const sinopseFilme = document.createElement('h2')
    sinopseFilme.textContent = filmeData.Plot
    colunaDireita.appendChild(sinopseFilme)

    const informacoesFilme = document.createElement('p')
    informacoesFilme.classList.add('informacoes-filme')
    informacoesFilme.innerHTML = `
        <strong>Gênero:</strong> ${filmeData.Genre}<br>
        <strong>Roteirista:</strong> ${filmeData.Writer}<br>
        <strong>Atores:</strong> ${filmeData.Actors}<br>
        <strong>País:</strong> ${filmeData.Country}<br>`

    colunaDireita.appendChild(informacoesFilme)
    
    //avaliação pelo IMDb e link para ver o site do imdb
    const footerDetalhes = document.createElement('div')
    footerDetalhes.classList.add('detalhes-footer')

    const notaFilme = filmeData.imdbRating
    const notaFilmeDiv = document.createElement('div')
    notaFilmeDiv.classList.add('nota-filme')
    notaFilmeDiv.innerHTML = `<p>${notaFilme}/10</p>`
    
    footerDetalhes.appendChild(notaFilmeDiv)

    const imdbLink = document.createElement('a')
    imdbLink.href = `https://corsproxy.io/?url=https://www.imdb.com/title/${filmeData.imdbID}`
    imdbLink.target = '_blank';
    imdbLink.classList.add('imdb-button');
    imdbLink.textContent = 'VER NO IMDB';
    
    footerDetalhes.appendChild(imdbLink);

    colunaDireita.appendChild(footerDetalhes); 

    divDetalhes.appendChild(colunaEsquerda)
    divDetalhes.appendChild(colunaDireita)
    
    container.appendChild(divDetalhes)
}

const filmeId = getIdFilmeDaUrl()
buscarDetalhesDoFilme(filmeId)