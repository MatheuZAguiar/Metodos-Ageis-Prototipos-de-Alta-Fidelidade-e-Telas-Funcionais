document.addEventListener('DOMContentLoaded', function() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    const totalCarrinho = document.getElementById('total');
    const modal = document.getElementById('modal-finalizar-compra');
    const btnFinalizarCompra = document.getElementById('finalizar-compra');
    const dataVendaElement = document.getElementById('data-venda');
    const vendedorInput = document.getElementById('vendedor');
    const formaPagamentoInput = document.getElementById('forma-pagamento');

    // Recupera os itens do carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Função para renderizar os itens do carrinho
    function renderizarCarrinho() {
        listaCarrinho.innerHTML = '';
        let total = 0; // Inicializa o total como zero

        // Verifica se existem itens no carrinho
        if (carrinho.length > 0) {
            // Para cada item no carrinho, cria um elemento de lista e adiciona à lista de carrinho
            carrinho.forEach(function(item, index) {
                const itemLista = document.createElement('li');

                // Cria a tag de imagem
                const imagemProduto = document.createElement('img');
                imagemProduto.src = 'data:image/jpeg;base64,' + item.imagem; // Utiliza a imagem codificada em base64
                imagemProduto.alt = 'Imagem do Produto';

                // Cria os elementos para as outras informações do produto
                const descricaoProduto = document.createElement('p');
                descricaoProduto.textContent = `Descrição: ${item.descricao}`;

                const precoVendaProduto = document.createElement('p');
                precoVendaProduto.textContent = `Preço de Venda: ${item.precoVenda}`;

                // Adiciona os elementos ao item da lista
                itemLista.appendChild(imagemProduto);
                itemLista.appendChild(descricaoProduto);
                itemLista.appendChild(precoVendaProduto);

                // Adiciona o preço de venda do item ao total
                total += parseFloat(item.precoVenda);

                // Adiciona um botão para remover o item do carrinho
                const btnRemover = document.createElement('button');
                btnRemover.textContent = 'Remover';
                btnRemover.addEventListener('click', function() {
                    // Remove o item do carrinho pelo seu índice
                    carrinho.splice(index, 1);
                    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage com o carrinho atualizado
                    renderizarCarrinho(); // Renderiza novamente o carrinho
                });
                itemLista.appendChild(btnRemover);

                // Adiciona o item à lista de carrinho
                listaCarrinho.appendChild(itemLista);
            });
        } else {
            // Se não houver itens no carrinho, exibe uma mensagem na lista de carrinho
            const itemLista = document.createElement('li');
            itemLista.textContent = 'Seu carrinho está vazio.';
            listaCarrinho.appendChild(itemLista);
        }

        // Exibe o total do carrinho
        totalCarrinho.textContent = `Total do Carrinho: R$ ${total.toFixed(2)}`;
    }

    // Renderiza o carrinho quando a página é carregada
    renderizarCarrinho();

    // Limpa o carrinho ao clicar no botão "Limpar Carrinho"
    document.getElementById('limpar-carrinho').addEventListener('click', function() {
        carrinho = []; // Define o carrinho como vazio
        localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o localStorage com o carrinho vazio
        renderizarCarrinho(); // Renderiza novamente o carrinho
    });

    // Finaliza a compra ao clicar no botão "Finalizar Compra"
    btnFinalizarCompra.addEventListener('click', function() {
        // Exibir a modal ao clicar no botão "Finalizar Compra"
        modal.style.display = 'block';

        // Atualizar a data da venda na modal
        const dataVenda = new Date();
        dataVendaElement.textContent = dataVenda.toLocaleString();
    });

    // Fecha a modal ao clicar no botão de fechar
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fecha a modal ao clicar fora dela
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Ao clicar em "Confirmar Compra"
    document.getElementById('confirmar-finalizar-compra').addEventListener('click', function() {
        const dataVenda = new Date(); // Data da venda
        const vendedor = vendedorInput.value; // Vendedor(a)
        const formaPagamento = formaPagamentoInput.value; // Forma de pagamento

        // Criar um objeto para armazenar os detalhes da venda
        const detalhesVenda = {
            dataVenda: dataVenda,
            itensVendidos: carrinho,
            vendedor: vendedor,
            formaPagamento: formaPagamento
        };

        // Verificar se já existem vendas no localStorage
        let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

        // Adicionar os detalhes da venda à lista de vendas
        vendas.push(detalhesVenda);

        console.log(detalhesVenda);

        // Salvar a lista de vendas atualizada no localStorage
        localStorage.setItem('vendas', JSON.stringify(vendas));

        // Limpar o carrinho após finalizar a compra
        carrinho = [];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        renderizarCarrinho();

        // Exibir mensagem de compra finalizada
        alert('Compra finalizada! Obrigado por comprar conosco.');

        // Fechar a modal
        modal.style.display = 'none';
    });
});