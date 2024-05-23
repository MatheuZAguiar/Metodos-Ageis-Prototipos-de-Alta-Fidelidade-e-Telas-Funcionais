document.addEventListener('DOMContentLoaded', function() {
    const formServico = document.getElementById('form-servico');
    const tbodyServicos = document.getElementById('tbody-servicos');
    const modal = document.getElementById('modal-finalizar-servico');
    const closeModal = document.querySelector('.close');
    let servicos = JSON.parse(localStorage.getItem('servicos')) || [];

    function renderizarServicos() {
        tbodyServicos.innerHTML = '';
        servicos.forEach(function(servico, index) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${servico.descricao}</td>
                <td>R$ ${servico.valor.toFixed(2)}</td>
                <td>${servico.status}</td>
                <td>
                    <button class="btn-finalizar" data-index="${index}">Finalizar</button>
                </td>
            `;
            tbodyServicos.appendChild(tr);
        });
    }

    formServico.addEventListener('submit', function(event) {
        event.preventDefault();
        const descricao = document.getElementById('descricao-servico').value;
        const valor = parseFloat(document.getElementById('valor-servico').value);
        const novoServico = { descricao, valor, status: 'Pendente' };
        servicos.push(novoServico);
        localStorage.setItem('servicos', JSON.stringify(servicos));
        renderizarServicos();
        formServico.reset();
    });

    tbodyServicos.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-finalizar')) {
            const index = event.target.getAttribute('data-index');
            modal.setAttribute('data-index', index);
            modal.style.display = 'block';
        }
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.getElementById('form-finalizar-servico').addEventListener('submit', function(event) {
        event.preventDefault();
        const index = modal.getAttribute('data-index');
        const vendedor = document.getElementById('vendedor').value;
        const formaPagamento = document.getElementById('forma-pagamento').value;

        const dataVenda = new Date();
        const servico = servicos[index];
        servico.status = 'Concluído';
        servico.dataVenda = dataVenda;
        servico.vendedor = vendedor;
        servico.formaPagamento = formaPagamento;

        let vendas = JSON.parse(localStorage.getItem('vendas')) || [];
        vendas.push({
            dataVenda: dataVenda,
            vendedor: vendedor,
            formaPagamento: formaPagamento,
            itensVendidos: [{
                descricao: servico.descricao,
                valor: servico.valor
            }]
        });
        localStorage.setItem('vendas', JSON.stringify(vendas));

        localStorage.setItem('servicos', JSON.stringify(servicos));
        renderizarServicos();

        alert('Serviço finalizado e cobrado com sucesso.');
        modal.style.display = 'none';
    });

    renderizarServicos();
});
