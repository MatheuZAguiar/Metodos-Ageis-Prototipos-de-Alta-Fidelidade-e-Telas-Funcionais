document.addEventListener('DOMContentLoaded', function() {
    const listaProdutos = document.getElementById('lista-produtos');

    // Recupera os produtos do localStorage
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Função para renderizar a lista de produtos
    function renderizarProdutos() {
        listaProdutos.innerHTML = '';

        // Verifica se existem produtos cadastrados
        if (produtos.length > 0) {
            // Para cada produto, cria um item de lista e adiciona à lista de produtos
            produtos.forEach(function(produto, index) {
                const itemLista = document.createElement('li');

                // Cria a tag de imagem
                const imagemProduto = document.createElement('img');
                imagemProduto.src = 'data:image/jpeg;base64,' + produto.imagem; // Utiliza a imagem codificada em base64
                imagemProduto.alt = 'Imagem do Produto';

                // Cria os elementos para as outras informações do produto
                const descricaoProduto = document.createElement('p');
                descricaoProduto.textContent = `Descrição: ${produto.descricao}`;

                const precoVendaProduto = document.createElement('p');
                precoVendaProduto.textContent = `Preço de Venda: ${produto.precoVenda}`;

                const fabricanteProduto = document.createElement('p');
                fabricanteProduto.textContent = `Fabricante: ${produto.fabricante}`;

                const categoriaProduto = document.createElement('p');
                categoriaProduto.textContent = `Categoria: ${produto.categoria}`;

                // Cria o botão de adicionar ao carrinho
                const btnAdicionarAoCarrinho = document.createElement('button');
                btnAdicionarAoCarrinho.textContent = 'Adicionar ao Carrinho';
                btnAdicionarAoCarrinho.addEventListener('click', function() {
                    carrinho.push(produto); // Adiciona o produto ao carrinho
                    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage com o carrinho
                    alert('Produto adicionado ao carrinho!');
                });

                // Adiciona os elementos ao item da lista
                itemLista.appendChild(imagemProduto);
                itemLista.appendChild(descricaoProduto);
                itemLista.appendChild(precoVendaProduto);
                itemLista.appendChild(fabricanteProduto);
                itemLista.appendChild(categoriaProduto);
                itemLista.appendChild(btnAdicionarAoCarrinho);

                // Adiciona o item à lista de produtos
                listaProdutos.appendChild(itemLista);
            });
        } else {
            // Se não houver produtos cadastrados, exibe uma mensagem na lista de produtos
            const itemLista = document.createElement('li');
            itemLista.textContent = 'Nenhum produto cadastrado.';
            listaProdutos.appendChild(itemLista);
        }
    }

    // Renderiza a lista de produtos quando a página é carregada
    renderizarProdutos();
});