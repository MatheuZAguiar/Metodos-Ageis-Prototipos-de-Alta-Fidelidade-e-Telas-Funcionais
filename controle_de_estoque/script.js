document.addEventListener('DOMContentLoaded', function() {
    const corpoTabela = document.getElementById('corpo-tabela');

    // Recupera as vendas do localStorage
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

    // Função para renderizar os dados na tabela
    function renderizarTabela() {
        corpoTabela.innerHTML = '';

        vendas.forEach(function(venda) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${venda.dataVenda.toLocaleString()}</td>
                <td>${venda.itensVendidos.length}</td>
                <td>${venda.itensVendidos.map(item => item.descricao).join(', ')}</td>
                <td>${venda.vendedor}</td>
                <td>${venda.formaPagamento}</td>
            `;
            corpoTabela.appendChild(row);
        });
    }

    // Renderiza a tabela quando a página é carregada
    renderizarTabela();
});