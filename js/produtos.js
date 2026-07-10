import {produtos} from './lista_produtos'

const sectionCards = document.querySelector('#cards')

const listarProdutos = () => {

    sectionCards.innerHTML = ''

produtos.forEach((elem, i) => {
    const divCards = document.createElement('div')
    divCards.setAttribute('class', 'card')

    const imgCard = document.createElement('img')
    imgCard.setAttribute('src', elem.caminho_imagem)
    imgCard.setAttribute('alt', elem.descricao_produto)

    const pCard = document.createElement('p')
    pCard.innerHTML = elem.descricao_produto

    const h2Card = document.createElement('h2')
    h2Card.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.', ',')}`

    const btnCard = document.createElement('button')
    btnCard.setAttribute('class', 'btn-add')
    btnCard.innerHTML = 'adicionar'

    divCards.appendChild(imgCard)
    divCards.appendChild(pCard)
    divCards.appendChild(h2Card)
    divCards.appendChild(btnCard)
})

}

listarProdutos()