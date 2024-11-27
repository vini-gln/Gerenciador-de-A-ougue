// Função para adicionar item no estoque
function adicionarItem() {
  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const quantidade = document.getElementById('quantidade').value;
  const data = document.getElementById('data').value; // Alterado de validade para data

  // Verificando se todos os campos foram preenchidos
  if (nome && categoria && quantidade && data) {
    const item = {
      nome: nome,
      quantidade: quantidade,
      categoria: categoria,
      data: data, // Alterado de validade para data
      status: 'estocado'
    };

    // Adicionando o item ao LocalStorage
    const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
    estoque.push(item);
    localStorage.setItem('estoque', JSON.stringify(estoque));

    // Limpando o formulário
    document.getElementById('nome').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('data').value = ''; // Alterado de validade para data

    // Atualizando a tabela
    carregarEstoque();
  } else {
    alert('Preencha todos os campos.');
  }
}

// Função para carregar o estoque na tabela
function carregarEstoque() {
  const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
  const tabela = document.getElementById('estoqueTabela');
  tabela.innerHTML = '';

  estoque.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.categoria}</td>
      <td>${item.quantidade}</td>
      <td>${item.data}</td> <!-- Alterado de validade para data -->
      <td>${item.status}</td>
      <td class="actions">
        <button class="retirar" onclick="retirarItem(${index})">Retirar</button>
        <button class="vencido" onclick="marcarVencido(${index})">Marcar como Vencido</button>
        <button class="restaurar" onclick="restaurarItem(${index})">Restaurar</button>
        <button class="deletar" onclick="deletarItem(${index})">Deletar</button>
      </td>
    `;
    tabela.appendChild(row);
  });
}

// Função para retirar um item do estoque
function retirarItem(index) {
  const estoque = JSON.parse(localStorage.getItem('estoque'));
  estoque[index].status = 'retirado';
  localStorage.setItem('estoque', JSON.stringify(estoque));
  carregarEstoque();
}

// Função para marcar um item como vencido
function marcarVencido(index) {
  const estoque = JSON.parse(localStorage.getItem('estoque'));
  estoque[index].status = 'vencido';
  localStorage.setItem('estoque', JSON.stringify(estoque));
  carregarEstoque();
}

// Função para restaurar um item vencido
function restaurarItem(index) {
  const estoque = JSON.parse(localStorage.getItem('estoque'));
  estoque[index].status = 'estocado';
  localStorage.setItem('estoque', JSON.stringify(estoque));
  carregarEstoque();
}

// Função para deletar um item do estoque
function deletarItem(index) {
  const estoque = JSON.parse(localStorage.getItem('estoque'));
  estoque.splice(index, 1);
  localStorage.setItem('estoque', JSON.stringify(estoque));
  carregarEstoque();
}

// Carregar o estoque ao carregar a página
window.onload = carregarEstoque;
