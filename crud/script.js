const form = document.getElementById('aluno-form');
const alunoList = document.getElementById('aluno-list');
let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
let editIndex = null;

function renderAlunos() {
    alunoList.innerHTML = '';
    alunos.forEach((aluno, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.matricula}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.email}</td>
      <td>
        <button onclick="editAluno(${index})">Editar</button>
        <button onclick="deleteAluno(${index})">Excluir</button>
      </td>
    `;
        alunoList.appendChild(row);
    });
}

function saveAluno(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const matricula = document.getElementById('matricula').value;
    const curso = document.getElementById('curso').value;
    const email = document.getElementById('email').value;

    const aluno = { nome, matricula, curso, email };

    if (editIndex === null) {
        alunos.push(aluno);
    } else {
        alunos[editIndex] = aluno;
        editIndex = null;
    }

    localStorage.setItem('alunos', JSON.stringify(alunos));
    form.reset();
    renderAlunos();
}

function editAluno(index) {
    const aluno = alunos[index];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('matricula').value = aluno.matricula;
    document.getElementById('curso').value = aluno.curso;
    document.getElementById('email').value = aluno.email;
    editIndex = index;
}

function deleteAluno(index) {
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    renderAlunos();
}

form.addEventListener('submit', saveAluno);
renderAlunos();