function atualizarTotal() {

    let total = 0;

    const linhas = document.querySelectorAll("tbody tr");

    linhas.forEach(linha => {

        let preco = parseFloat(linha.querySelector(".preco").textContent);

        let quantidade = parseInt(linha.querySelector(".quantidade").textContent);

        let subtotal = preco * quantidade;

        linha.querySelector(".subtotal").textContent =
            subtotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        total += subtotal;

    });

    document.getElementById("total").textContent =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

}

document.querySelectorAll(".mais").forEach(botao => {

    botao.addEventListener("click", () => {

        const qtd = botao.parentElement.querySelector(".quantidade");

        qtd.textContent = parseInt(qtd.textContent) + 1;

        atualizarTotal();

    });

});

document.querySelectorAll(".menos").forEach(botao => {

    botao.addEventListener("click", () => {

        const qtd = botao.parentElement.querySelector(".quantidade");

        let valor = parseInt(qtd.textContent);

        if (valor > 1) {

            qtd.textContent = valor - 1;

            atualizarTotal();

        }

    });

});