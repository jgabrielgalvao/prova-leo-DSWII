document.addEventListener("DOMContentLoaded", function() {
  const tarefasList = document.getElementById("tarefasList");
  const formTarefa = document.getElementById("formTarefa");

  function carregarTarefas() {
      // Utilizando Axios para fazer a requisição GET
      axios.get('http://localhost:3000/tarefas')
          .then(response => {
              tarefasList.innerHTML = "";
              response.data.forEach(tarefa => {
                  const li = document.createElement("li");
                  li.textContent = `${tarefa.tarefa} - ${tarefa.situacao}`;

                  const buttonAtualizar = document.createElement("button");
                  buttonAtualizar.textContent = "Atualizar";
                  buttonAtualizar.addEventListener("click", function() {
                      // Utilizando Axios para fazer a requisição PUT
                      axios.put(`http://localhost:3000/tarefas/${tarefa.id}`, { situacao: 'concluida' })
                          .then(response => {
                              console.log(response.data);
                              carregarTarefas();
                          })
                          .catch(error => console.error('Erro ao atualizar tarefa:', error));
                  });

                  const buttonExcluir = document.createElement("button");
                  buttonExcluir.textContent = "Excluir";
                  buttonExcluir.addEventListener("click", function() {
                      // Utilizando Axios para fazer a requisição DELETE
                      console.log(tarefa.id)
                      axios.delete(`http://localhost:3000/tarefas/${tarefa.id}`)
                          .then(response => {
                              console.log(response.data);
                              carregarTarefas();
                          })
                          .catch(error => console.error('Erro ao excluir tarefa:', error));
                  });

                  li.appendChild(buttonAtualizar);
                  li.appendChild(buttonExcluir);

                  tarefasList.appendChild(li);
              });
          })
          .catch(error => console.error('Erro ao carregar tarefas:', error));
  }

  formTarefa.addEventListener("submit", function(event) {
      event.preventDefault();

      const tarefa = document.getElementById("tarefa").value;
      const situacao = document.getElementById("situacao").value;

      // Utilizando Axios para fazer a requisição POST
      axios.post('http://localhost:3000/tarefas', { tarefa, situacao })
          .then(response => {
              console.log(response.data);
              carregarTarefas();
          })
          .catch(error => console.error('Erro ao adicionar tarefa:', error));
  });

  carregarTarefas();
});