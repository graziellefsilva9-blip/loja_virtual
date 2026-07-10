import { produtos } from './lista_produtos.js'

const sectionCards = document.querySelector('#cards')

const listarProdutos = () => {

}

//CHAMANDO A FUNÇÃO listarProdutos
listarProdutos()

//MONTANDO OS MENUS SEÇÕES
const menuSecoes = () => {
    const mapSecoes = new Map()

    produtos.forEach((elem) => {
        mapSecoes.set(elem.id_secao, elem)
    })

    const secoesFiltradas = Array.from(mapSecoes.values())

    return secoesFiltradas
}

//FUNÇÃO PARA INSERIR OS MENUS NA LISTA
const carregaSecoes = () => {
    const ulMenuSecoes = document.querySelector('#menu-secoes')
    ulMenuSecoes.innerHTML = ''

    menuSecoes().forEach((elem, i) => {
        const liMenu = document.createElement('li')

        const aMenu = document.createElement('a')
        aMenu.setAttribute('href', '#')
        aMenu.setAttribute('class', 'link-secao')
        aMenu.innerHTML = elem.secao

        aMenu.addEventListener('click', () => {
            montaCards(filtroProdutos(elem.id_secao))
        })

        liMenu.appendChild(aMenu)
        ulMenuSecoes.appendChild(liMenu)
    })
}

carregaSecoes()

const filtroProdutos = (idSecao) => {
    return produtos.filter(elem => elem.id_secao === idSecao)
}

const montaCards = (objProduto) => {

    sectionCards.innerHTML = ''

    objProduto.forEach((elem, i) => {
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

        sectionCards.appendChild(imgCard)
    })

}