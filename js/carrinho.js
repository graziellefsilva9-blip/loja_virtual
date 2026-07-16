let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Adiciona produto ao carrinho
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

// Remove produto
function removerItem(idProduto) {

    carrinho = carrinho.filter(produto =>
        produto.id_produto !== idProduto
    );

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    renderizarCarrinho();
}

// Atualiza a tela do carrinho
function renderizarCarrinho() {

    carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const listaCarrinho = document.querySelector("#lista-carrinho");

    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach(produto => {

        const subtotal = produto.valor_unitario * produto.quantidade;

        total += subtotal;

        listaCarrinho.innerHTML += `
            <div class="item-carrinho">

                <img src="../${produto.caminho_imagem}" width="100">

                <h3>${produto.descricao_produto}</h3>

                <p>
                    Valor Unitário:
                    <strong>
                        R$ ${produto.valor_unitario.toFixed(2).replace(".", ",")}
                    </strong>
                </p>

                <label>Quantidade:</label>

                <input
                    type="number"
                    class="quantidade"
                    data-id="${produto.id_produto}"
                    value="${produto.quantidade}"
                    min="1"
                    step="1">

                <p>
                    Subtotal:
                    <strong>
                        R$ ${subtotal.toFixed(2).replace(".", ",")}
                    </strong>
                </p>

                <button
                    class="btn-remover"
                    data-id="${produto.id_produto}">
                    Remover
                </button>

                <hr>

            </div>
        `;
    });

    document.querySelector("#total").textContent =
        total.toFixed(2).replace(".", ",");

    document.querySelector("#total-final").textContent =
        total.toFixed(2).replace(".", ",");

    adicionarEventosQuantidade();
    adicionarEventosRemover();
}

// Eventos do input quantidade
function adicionarEventosQuantidade() {

    const inputs = document.querySelectorAll(".quantidade");

    inputs.forEach(input => {

        input.addEventListener("input", (e) => {

            let quantidade = parseInt(e.target.value);

            if (isNaN(quantidade) || quantidade < 1) {
                quantidade = 1;
                e.target.value = 1;
            }

            const id = Number(e.target.dataset.id);

            const produto = carrinho.find(item =>
                item.id_produto === id
            );

            if (produto) {

                produto.quantidade = quantidade;

                localStorage.setItem(
                    "carrinho",
                    JSON.stringify(carrinho)
                );

                renderizarCarrinho();

            }

        });

    });

}


// Eventos do botão remover
function adicionarEventosRemover() {

    const botoes = document.querySelectorAll(".btn-remover");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const id = Number(botao.dataset.id);

            removerItem(id);

        });

    });

}


// Carrega carrinho
renderizarCarrinho();


// Finalizar compra
const btnFinalizar = document.querySelector("#btn-finalizar");

if (btnFinalizar) {

    btnFinalizar.addEventListener("click", () => {

        if (carrinho.length === 0) {

            alert("Seu carrinho está vazio!");

            return;

        }

        alert("Compra finalizada com sucesso!");

        localStorage.removeItem("carrinho");

        carrinho = [];

        window.location.href = "../index.html";

    });

}