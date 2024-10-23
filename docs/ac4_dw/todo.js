const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tarefas = [];

function adicionarTarefa() {
    rl.question("Digite a nova tarefa: ", (novaTarefa) => {
        if (novaTarefa) {
            tarefas.push(novaTarefa);
            console.log(`Tarefa "${novaTarefa}" adicionada à lista.`);
        }
        menu();
    });
}


function removerTarefa() {
    if (tarefas.length === 0) {
        console.log("Não há tarefas para remover.");
        menu();
    } else {
        listaTarefas();
        rl.question("Digite o número da tarefa que deseja remover: ", (numeroTarefa) => {
            const index = parseInt(numeroTarefa) - 1;

            if (index >= 0 && index < tarefas.length) {
                const [tarefaRemovida] = tarefas.splice(index, 1);
                console.log(`Tarefa "${tarefaRemovida}" removida da lista.`);
            } else {
                console.log("Número da tarefa inválido.");
            }

            menu();
        });
    }
}

function listaTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa na lista.");
    } else {
        console.log("Lista de Tarefas:");
        tarefas.forEach((tarefa, index) => {
            console.log(`${index + 1}. ${tarefa}`);
        });
    }
}

function menu() {
    console.log(`
    Escolha uma opção:
    1. Adicionar tarefa
    2. Remover tarefa
    3. Listar tarefas
    4. Sair
    `);

    rl.question('Digite a opção : ', (opcaoMenu) => {
        switch (parseInt(opcaoMenu)) {
            case 1:
                adicionarTarefa();
                break;
            case 2:
                removerTarefa();
                break;
            case 3:
                listaTarefas();
                menu();
                break;
            case 4:
                console.log("Saindo...");
                rl.close();
                break;
            default:
                console.log("Opção inválida.");
                menu();
        }
    });
}

menu();
