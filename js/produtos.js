import { produtos } from './lista_produto.js';

import { addItem} from './carrinho.js'

const sectionCards = document.querySelector('.cards');

// FILTRA OS PRODUTOS
const filtroProdutos = (idSecao) => {
    return produtos.filter(elem => elem.id_secao === idSecao)
}

// MONTA OS CARDS
const montaCards = (objProduto) => {

    sectionCards.innerHTML = ''

    objProduto.forEach((elem) => {

        const divCards = document.createElement('div')
        divCards.className = 'card'

        const imgCard = document.createElement('img')
        imgCard.src = elem.caminho_imagem
        imgCard.alt = elem.descricao_produto

        const pCard = document.createElement('p')
        pCard.innerHTML = elem.descricao_produto

        const h2Card = document.createElement('h2')
        h2Card.innerHTML = `R$ ${elem.valor_unitario.toFixed(2).replace('.', ',')}`

        const btnCard = document.createElement('button')
        btnCard.className = 'btn-add'
        btnCard.innerHTML = 'Adicionar'

        btnCard.addEventListener('click', () =>{
            addItem(elem);
            window.location.href = "paginas/carrinho.html"
        })

        divCards.appendChild(imgCard)
        divCards.appendChild(pCard)
        divCards.appendChild(h2Card)
        divCards.appendChild(btnCard)

        sectionCards.appendChild(divCards)
    })
}
 const inputPesquisa = document.querySelector('#pesquisa');

 inputPesquisa.addEventListener('input', (evt) => {
     const txtInput = evt.target.value.toLowerCase().trim();
 
     const resultado = produtos.filter(produto =>
         produto.descricao_produto.toLowerCase().includes(txtInput)
     );
 
     montaCards(resultado);
 });



// MOSTRA TODOS OS PRODUTOS
const listarProdutos = () => {
    montaCards(produtos)
}

// MONTA O MENU
const menuSecoes = () => {

    const mapSecoes = new Map()

    produtos.forEach((elem) => {
        mapSecoes.set(elem.id_secao, elem)
    })

    return Array.from(mapSecoes.values())
}



// CARREGA AS SEÇÕES
const carregaSecoes = () => {

    const ulMenuSecoes = document.querySelector('#menu-secoes')
    ulMenuSecoes.innerHTML = ''

    // BOTÃO TODOS
    const liTodos = document.createElement('li')

    const aTodos = document.createElement('a')
    aTodos.href = '#'
    aTodos.className = 'link-secao'
    aTodos.innerHTML = 'Todos'

    aTodos.addEventListener('click', (e) => {
        e.preventDefault()
        listarProdutos()
    })

    liTodos.appendChild(aTodos)
    ulMenuSecoes.appendChild(liTodos)

    // DEMAIS SEÇÕES
    menuSecoes().forEach((elem) => {

        const liMenu = document.createElement('li')

        const aMenu = document.createElement('a')
        aMenu.href = '#'
        aMenu.className = 'link-secao'
        aMenu.innerHTML = elem.secao

        aMenu.addEventListener('click', (e) => {
            e.preventDefault()
            montaCards(filtroProdutos(elem.id_secao))
        })

        liMenu.appendChild(aMenu)
        ulMenuSecoes.appendChild(liMenu)
    })
}

// CHAMADAS
carregaSecoes()
listarProdutos()