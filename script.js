let produtos = [];
let isPanelOpen = false;

document.getElementById('search');
search.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') carregarPorNome();
});

function novoProduto() {
    const dialog = document.getElementById('new-product-dialog');
    dialog.showModal();
}

function fecharNovoProduto() {
    const dialog = document.getElementById('new-product-dialog');

    document.getElementById('nome').value = "";
    document.getElementById('categoria').value = "";
    document.getElementById('preco').value = "";
    document.getElementById('estoque').value = "";

    dialog.close();
}

function fecharEdicao() {
    const dialog = document.getElementById('edit-product-dialog');

    document.getElementById('edit-nome').value = "";
    document.getElementById('edit-categoria').value = "";
    document.getElementById('edit-preco').value = "";
    document.getElementById('edit-estoque').value = "";

    dialog.close();
}

function addProduto() {
    if (isNaN(parseFloat(document.getElementById('preco').value))) {
        alert("Insira um preço válido!");
    } else if (isNaN(parseInt(document.getElementById('estoque').value))) {
        alert("Insira um estoque válido!");
    } else if (document.getElementById('nome').value.trim() === '') {
        alert("Insira um nome válido!");
    } else if (document.getElementById('categoria').value.trim() === '') {
        alert("Insira uma categoria válida!");
    } else {
        let nome = document.createElement('td');
        nome.className = "table-item";
        nome.textContent = document.getElementById('nome').value;

        let categoria = document.createElement('td');
        categoria.className = "table-item table-only-xl";
        categoria.textContent = document.getElementById('categoria').value;

        let preco = document.createElement('td');
        preco.className = "table-item";
        preco.textContent = document.getElementById('preco').value;

        let estoque = document.createElement('td');
        estoque.className = "table-item";
        estoque.textContent = document.getElementById('estoque').value;

        let produto = document.createElement('tr');
        produto.appendChild(nome);
        produto.appendChild(categoria);
        produto.appendChild(preco);
        produto.appendChild(estoque);

        produtos.push(produto);
        carregarProdutos();
        const dialog = document.getElementById('new-product-dialog');

        fecharNovoProduto();
    }
}

function carregarProdutos() {
    let tabela = document.getElementById('products-table-body');
    tabela.innerHTML = '';

    produtos.forEach((value, index) => {
        let editar = document.createElement('button');
        editar.onclick = () => editarProduto(index);
        editar.className = "edit-delete-button";
        let editImg = document.createElement('img');
        editImg.src = '/imgs/editar.png';
        editar.appendChild(editImg);

        let excluir = document.createElement('button');
        excluir.onclick = () => excluirProduto(index);
        excluir.className = "edit-delete-button";
        let excluirImg = document.createElement('img');
        excluirImg.src = '/imgs/excluir.png';
        excluir.appendChild(excluirImg);

        let acoes = document.createElement('td');
        acoes.className = "table-item";
        acoes.appendChild(editar);
        acoes.appendChild(excluir);

        let tr = document.createElement('tr');

        tr.innerHTML = value.innerHTML;
        tr.appendChild(acoes);

        if (index === (produtos.length)) {
            tr.children[0].className += " rounded-bl-lg";
            tr.children[4].className += " rounded-br-lg";
        }

        tabela.appendChild(tr);
    });
}

function carregarPorNome() {
    let tabela = document.getElementById('products-table-body');
    tabela.innerHTML = '';

    let nome = document.getElementById('search').value.toLowerCase();

    produtos.forEach((value, index) => {
        if (value.children[0].textContent.toLowerCase().includes(nome.trim())) {
            let editar = document.createElement('button');
            editar.onclick = () => editarProduto(index);
            editar.className = "edit-delete-button";
            let editImg = document.createElement('img');
            editImg.src = '/imgs/editar.png';
            editar.appendChild(editImg);

            let excluir = document.createElement('button');
            excluir.onclick = () => excluirProduto(index);
            excluir.className = "edit-delete-button";
            let excluirImg = document.createElement('img');
            excluirImg.src = '/imgs/excluir.png';
            excluir.appendChild(excluirImg);

            let acoes = document.createElement('td');
            acoes.className = "table-item";
            acoes.appendChild(editar);
            acoes.appendChild(excluir);

            let tr = document.createElement('tr');

            tr.innerHTML = value.innerHTML;
            tr.appendChild(acoes);

            if (index === (produtos.length - 1)) {
                tr.children[0].className += " rounded-bl-lg";
                tr.children[4].className += " rounded-br-lg";
            }

            tabela.appendChild(tr);
        }
    });
    if (((tabela.rows.length) === 0) && produtos.length>=1) {
        let opsMesssage = document.createElement('td');
        opsMesssage.textContent = 'Ops, nenhum item encontrado D:';
        let linha = document.createElement('tr');
        linha.appendChild(opsMesssage);
        tabela.appendChild(linha);
    }
}

function excluirProduto(index) {
    let confirm = window.confirm("Você deseja realmente excluir este item?");

    if (confirm) {
        produtos.splice(index, 1);
        carregarProdutos();
    }
}

function editarProduto(index) {
    const dialog = document.getElementById('edit-product-dialog');

    let produto = produtos[index];

    console.log(produto.children[0].textContent);

    let nome = document.getElementById('edit-nome');
    nome.value = produto.children[0].textContent;
    let categoria = document.getElementById('edit-categoria');
    categoria.value = produto.children[1].textContent;
    let preco = document.getElementById('edit-preco');
    preco.value = produto.children[2].textContent;
    let estoque = document.getElementById('edit-estoque');
    estoque.value = produto.children[3].textContent;

    const editButton = document.getElementById('edit-button');
    editButton.onclick = () => editar(index);
    dialog.showModal();
}

function editar(index) {
    const dialog = document.getElementById('edit-product-dialog');
    if (isNaN(parseFloat(document.getElementById('edit-preco').value))) {
        alert("Insira um preço válido!");
    } else if (isNaN(parseInt(document.getElementById('edit-estoque').value))) {
        alert("Insira um estoque válido!");
    } else if (document.getElementById('edit-nome').value.trim() === '') {
        alert("Insira um nome válido!");
    } else if (document.getElementById('edit-categoria').value.trim() === '') {
        alert("Insira uma categoria válida!");
    } else {
        let produto = produtos[index];

        produto.children[0].textContent = document.getElementById('edit-nome').value;
        produto.children[1].textContent = document.getElementById('edit-categoria').value;
        produto.children[2].textContent = document.getElementById('edit-preco').value;
        produto.children[3].textContent = document.getElementById('edit-estoque').value;

        produtos[index] = produto;

        carregarProdutos();

        fecharEdicao();
    }
}

function alternarPainel() {
    panel = document.getElementById('side-panel');
    button = document.getElementById('panel-button');

    if (isPanelOpen) {
        panel.style.left = "-70vw";
        button.style.left = "-0.6rem";
    } else {
        panel.style.left = "0";
        button.style.left = "calc(70vw - 0.6rem)";
    }
    isPanelOpen = !isPanelOpen;
}