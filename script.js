function novoProduto() {
    const dialog = document.getElementById('new-product-dialog');
    dialog.showModal();
}

function fecharNovoProduto() {
    const dialog = document.getElementById('new-product-dialog');
    dialog.close();
}

function addProduto() {
    if (parseFloat(document.getElementById('preco')) === NaN) {
        alert("Insira um preço válido!");
    } else {
        const tabela = document.getElementById('products-table');
        let produto = document.createElement('tr');
        const nome = document.createElement('td');
        nome.textContent = document.getElementById('nome').textContent;
        const categoria = document.createElement('td');
        categoria.textContent = document.getElementById('categoria').textContent;
        const preco = document.createElement('td');
        preco.textContent = document.getElementById('preco').textContent;
        const estoque = document.createElement('td');
        estoque.textContent = document.getElementById('estoque').textContent;
        produto.appendChild(nome);
        produto.appendChild(categoria);
        produto.appendChild(preco);
        produto.appendChild(estoque);
        tabela.appendChild(produto);
    }
}