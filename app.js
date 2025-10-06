'use strict'

//dados da API OMDb
const apiKey = 'e716a445'
const urlBase = 'https://www.omdbapi.com/'

const input = getElementById('input')
const button = getElementById('button')
const container = getElementById('container')

async function buscarFilmes(buscarItem){
    // encodeURIComponent garante que caracteres especiais (como espaços) funcionem na URL.
    const url = `${urlBase}?apikey=${apiKey}&s=${encodeURIComponent(buscarItem)}`

    try {
        //busca os dados dentro do array da api, porém o 'await' faz com que ele espere as respostas, se não ele daria somente a primeira resposta e não carregaria as outras
        const response = await fetch(url)
        //após fazer a busca, ele devolve os dados que encontrou
        const dados = await response.json()

        if(dados.Response === 'True'){
            container.innerHTML = ''
            mostrarFilmes(dados.Search)
        }else{
            console.error("Erro na comunicação com a API:", error)
        }
        
    }catch (error) {
        console.error("Erro na comunicação com a API:", error)
        container.innerHTML = '<p class="error">Erro ao carregar dados. Tente novamente mais tarde.</p>'
    }
}

function mostrarFilmes(filmes){
    filmes.forEach(filme => {
        const cardFilme = document.createElement('div')
        cardFilme.classList.add('card-filme')

        const posterUrl = filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/300x450?text=Sem+Poster'

        cardFilme.innerHTML = 
        `<img src="${posterUrl}" alt="${movie.Title} Poster">
            <div class="dadosFilme">
                <h2>${movie.Title}</h2>
                <p><strong>Ano:</strong> ${movie.Year}</p>
            </div>`
    
    container.appendChild(cardFilme)
})
}

button.addEventListener('click', () => {
    const buscarItem = button.value.trim()

    if(buscarItem){
        return buscarFilmes(buscarItem)
    }else{
        return container.innerHTML = '<p class="warning">Por favor, digite um termo de busca.</p>'
    }
})