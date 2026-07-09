const lista = document.getElementById("listaProdutos");

const total = document.getElementById("total");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

let valorTotal = 0;

carrinho.forEach(produto=>{

    valorTotal += produto.preco * produto.quantidade;

    lista.innerHTML += `

    <div class="produto">

        <img src="../${produto.imagem}">

        <div>

            <h3>${produto.nome}</h3>

            <p>R$ ${produto.preco.toFixed(2)}</p>

            <p>Quantidade: ${produto.quantidade}</p>

        </div>

    </div>

    `;

});

total.innerHTML = "Total: R$ " + valorTotal.toFixed(2);