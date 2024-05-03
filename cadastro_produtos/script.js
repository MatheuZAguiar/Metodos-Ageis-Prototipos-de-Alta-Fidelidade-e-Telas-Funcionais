document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastro-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura dos valores dos campos do formulário
        const descricao = document.getElementById('descricao').value;
        const imagemInput = document.getElementById('imagem');
        const imagemFile = imagemInput.files[0];
        const precoVenda = document.getElementById('preco-venda').value;
        const precoCusto = document.getElementById('preco-custo').value;
        const fabricante = document.getElementById('fabricante').value;
        const categoria = document.getElementById('categoria').value;

        // Converte o arquivo de imagem em base64
        const reader = new FileReader();
        reader.onload = function() {
            const base64Image = reader.result.split(',')[1];

            // Criando um objeto com os dados do produto
            const produto = {
                descricao: descricao,
                imagem: base64Image,
                precoVenda: precoVenda,
                precoCusto: precoCusto,
                fabricante: fabricante,
                categoria: categoria
            };

            console.log(produto);

            // Verifica se já existe algum dado armazenado
            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

            // Adiciona o novo produto à lista de produtos
            produtos.push(produto);

            // Salva a lista atualizada no localStorage
            localStorage.setItem('produtos', JSON.stringify(produtos));

            // Redireciona para a dashboard
            window.location.href = '../dashboard/dashboard.html';
        };
        reader.readAsDataURL(imagemFile);
    });
});