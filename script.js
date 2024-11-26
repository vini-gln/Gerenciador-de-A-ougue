// Armazenar os itens no LocalStorage
const getEstoque = () => JSON.parse(localStorage.getItem('estoque')) || [];
const setEstoque = (estoque) => localStorage.setItem('estoque', JSON.stringify(estoque));

// Atualizar tabela do estoque
const atualizarTabela = () => {
  const estoque = getEstoque();
  const tabela = document.getElementById('estoqueTabela');
  tabela.innerHTML = '';

  estoque.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.categoria}</td>
      <td>${item.quantidade}</td>
      <td>${item.validade}</td>
      <td>${item.status}</td>
      <td class="actions">
        <button class="retirar" onclick="retirarItem(${index})">Retirar</button>
        <button class="vencido" onclick="marcarVencido(${index})">Vencido</button>
        ${item.status === 'vencido' ? `<button class="restaurar" onclick="restaurarItem(${index})">Restaurar</button>` : ''}
        <button class="deletar" onclick="deletarItem(${index})">Deletar</button>
      </td>
    `;

    tabela.appendChild(row);
  });
};

// Adicionar novo item ao estoque
document.getElementById('adicionarBtn').addEventListener('click', () => {
  const nome = document.getElementById('nome').value;
  const categoria = document.getElementById('categoria').value;
  const quantidade = document.getElementById('quantidade').value;
  const validade = document.getElementById('validade').value;

  if (!nome || !categoria || !quantidade || !validade) {
    alert('Preencha todos os campos!');
    return;
  }

  const novoItem = {
    nome,
    categoria,
    quantidade: parseInt(quantidade, 10),
    validade,
    status: 'estocado',
  };

  const estoque = getEstoque();
  estoque.push(novoItem);
  setEstoque(estoque);

  atualizarTabela();

  // Limpar formulário
  document.getElementById('nome').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('validade').value = '';
});

// Retirar item
const retirarItem = (index) => {
  const estoque = getEstoque();
  if (estoque[index].quantidade > 0) {
    estoque[index].quantidade -= 1;
  }
  setEstoque(estoque);
  atualizarTabela();
};

// Marcar item como vencido
const marcarVencido = (index) => {
  const estoque = getEstoque();
  estoque[index].status = 'vencido';
  setEstoque(estoque);
  atualizarTabela();
};

// Restaurar item vencido para estocado
const restaurarItem = (index) => {
  const estoque = getEstoque();
  estoque[index].status = 'estocado';
  setEstoque(estoque);
  atualizarTabela();
};

// Deletar item
const deletarItem = (index) => {
  const estoque = getEstoque();
  estoque.splice(index, 1);
  setEstoque(estoque);
  atualizarTabela();
};

// Inicializar tabela ao carregar a página
atualizarTabela();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(() => {
      console.log('Service Worker registrado com sucesso.');
    });
  }
  