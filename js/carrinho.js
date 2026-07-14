let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Adiciona produto
export function addItem(produto) {

    const itemExistente = carrinho.find(item =>
        item.id_produto === produto.id_produto
    );

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            id_produto: produto.id_produto,
            descricao_produto: produto.descricao_produto,
            valor_unitario: produto.valor_unitario,
            caminho_imagem: produto.caminho_imagem,
            quantidade: 1
        });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Mostra os produtos no carrinho
const listaCarrinho = document.querySelector("#lista-carrinho");

if (listaCarrinho) {

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach(produto => {

        total += produto.valor_unitario * produto.quantidade;

        listaCarrinho.innerHTML += `
            <div class="item-carrinho">
                <img src="../${produto.caminho_imagem}" width="100">
                <h3>${produto.descricao_produto}</h3>
                <p>Quantidade: ${produto.quantidade}</p>
                <p>Preço: R$ ${(produto.valor_unitario * produto.quantidade).toFixed(2).replace(".", ",")}</p>
                <hr>
            </div>
        `;
    });

    document.querySelector("#total").textContent =
        total.toFixed(2).replace(".", ",");

    document.querySelector("#total-final").textContent =
        total.toFixed(2).replace(".", ",");
}
const btnFinalizar = document.querySelector("#btn-finalizar");

if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        alert("Compra finalizada com sucesso!");

        localStorage.removeItem("carrinho");

        window.location.href = "../index.html";
    });
}