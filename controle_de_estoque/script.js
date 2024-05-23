document.addEventListener('DOMContentLoaded', function() {
    const corpoTabela = document.getElementById('corpo-tabela');

    // Recupera as vendas do localStorage
    let vendas = JSON.parse(localStorage.getItem('vendas')) || [];

    // Função para renderizar os dados na tabela
    function renderizarTabela() {
        corpoTabela.innerHTML = '';

        vendas.forEach(function(venda) {
            // Verifica se 'itensVendidos' é um array válido
            let itensVendidos = Array.isArray(venda.itensVendidos) ? venda.itensVendidos : [];

            // Cria a linha da tabela
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(venda.dataVenda).toLocaleString()}</td>
                <td>${itensVendidos.length}</td>
                <td>${itensVendidos.map(item => item.descricao || 'Sem descrição').join(', ')}</td>
                <td>${venda.vendedor}</td>
                <td>${venda.formaPagamento}</td>
            `;
            corpoTabela.appendChild(row);
        });
    }

    // Renderiza a tabela quando a página é carregada
    renderizarTabela();
});
