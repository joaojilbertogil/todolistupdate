// Declaração de uma variável 'banco' que será usada para armazenar as tarefas.
let banco = [];

// Função para obter o banco de dados de tarefas do localStorage.
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

// Função para definir o banco de dados de tarefas no localStorage.
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

// Função para criar um novo item de tarefa na interface.
const inputItem = (tarefa, status, indice) => {
    const item = document.createElement('div');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}></input>
        <section>${tarefa}</section>
        <button class="delete-button" data-indice=${indice}>X</button>
    `;

    const section = item.querySelector('section');
    const checkbox = item.querySelector('input[type="checkbox"]');

    // Adiciona uma linha através do texto se o status for 'checked'.
    if (status === 'checked') {
        section.style.textDecoration = 'line-through';
    }

    // Adiciona um ouvinte de eventos para o checkbox.
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            section.style.textDecoration = 'line-through';
        } else {
            section.style.textDecoration = 'none';
        }

        // Atualiza o status da tarefa no banco de dados.
        atualizaItem(indice, checkbox.checked ? 'checked' : '');
    });

    // Adiciona o item à lista de tarefas.
    document.getElementById('todoList').appendChild(item);

    const deleteButton = item.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        // Remove a tarefa quando o botão 'X' é clicado.
        removeItem(indice);
    });
}

// Função para atualizar a visualização da lista de tarefas na interface.
const atualizaView = () => {
    limpaTela();
    const banco = getBanco();
    banco.forEach((item, indice) => inputItem(item.tarefa, item.status, indice));
}

// Função para limpar a tela, removendo todos os itens da lista.
const limpaTela = () => {
    const lista = document.getElementById('todoList');
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

// Função chamada quando uma nova tarefa é inserida.
const insereItem = (event) => {
    const tecla = event.key;
    const value = event.target.value;

    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({ 'tarefa': value, 'status': '' });
        setBanco(banco);
        atualizaView();
        event.target.value = '';
    }
}

// Função para remover uma tarefa com base no índice.
const removeItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizaView();
}

// Função para atualizar o status de uma tarefa com base no índice.
const atualizaItem = (indice, status) => {
    const banco = getBanco();
    banco[indice].status = status;
    setBanco(banco);
}

// Adiciona um ouvinte de eventos para a entrada de texto.
document.getElementById('newItem').addEventListener('keypress', insereItem);

// Inicializa o banco de dados e a visualização.
setBanco(banco);
atualizaView();