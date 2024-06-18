// Seleciona o elemento UL onde a lista de alunos será exibida
const alunoList = document.querySelector('#aluno-list');

// Função para renderizar cada aluno na lista
function renderAluno(doc) {
    if (alunoList) {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        
        // Cria elementos para cada campo de dados do aluno
        let nome = document.createElement('span');
        let cpf = document.createElement('span');
        let rg = document.createElement('span');
        let tel_aluno = document.createElement('span');
        let tel_respo = document.createElement('span');
        let email = document.createElement('span');
        let data_nasc = document.createElement('span');
        let excluir = document.createElement('div');
        
        // Configura o botão de exclusão
        excluir.textContent = 'X';
        excluir.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
        excluir.addEventListener('click', (event) => {
            event.stopPropagation();
            let id = event.target.parentElement.getAttribute('data-id');
            db.collection('bd3-nosql-atv5').doc(id).delete()
                .then(() => { window.location.reload(); })
                .catch(error => console.error("Erro ao excluir aluno:", error));
        });

        // Define o texto de cada elemento com base nos dados do Firestore
        li.setAttribute('data-id', doc.id);
        nome.textContent = "Nome: " + doc.data().nome;
        cpf.textContent = " | CPF: " + doc.data().cpf;
        rg.textContent = " | RG: " + doc.data().rg;
        tel_aluno.textContent = " | Telefone do Aluno: " + doc.data().tel_aluno;
        tel_respo.textContent = " | Telefone do Responsável: " + doc.data().tel_respo;
        email.textContent = " | Email: " + doc.data().email;
        data_nasc.textContent = " | Data de Nascimento: " + doc.data().data_nasc;

        // Adiciona os elementos à lista de alunos
        li.appendChild(nome);
        li.appendChild(cpf);
        li.appendChild(rg);
        li.appendChild(tel_aluno);
        li.appendChild(tel_respo);
        li.appendChild(email);
        li.appendChild(data_nasc);
        li.appendChild(excluir);

        alunoList.appendChild(li);
    } else {
        console.error("Elemento aluno-list não encontrado no DOM.");
    }
}

// Recupera os dados dos alunos do Firestore e os renderiza na lista
db.collection('bd3-nosql-atv5').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderAluno(doc);
        console.log(doc.data());
    });
});

// Captura o formulário de cadastro de aluno
const form = document.querySelector('#add-aluno-form');

// Adiciona um listener para o evento de submit do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Captura os dados do formulário
    const alunoData = {
        nome: form.nome.value,
        cpf: form.cpf.value,
        rg: form.rg.value,
        tel_aluno: form.telefone_aluno.value,
        tel_respo: form.telefone_responsavel.value,
        email: form.email.value,
        data_nasc: form.data_nascimento.value,
        turma: form.turma.value
    };

    // Adiciona os dados do aluno ao Firestore
    db.collection('bd3-nosql-atv5').add(alunoData)
        .then(() => {
            window.location.reload(); // Recarrega a página após a adição do aluno
        })
        .catch(error => console.error("Erro ao cadastrar aluno:", error));
});
