export default class TaskView {
 
  constructor(tasks, index) {
    
    this.renderTasks(tasks, index);
    this.submitTask = null;
    this.deleteTask = null;
    this.toggleTask = null;
  }
  
  renderTasks(tasks, projectIndex) {
    const $list = $("#task-list");
    $list.empty();

    // Botón para cerrar la vista de tareas y regresar
    const $closeBtn = $(`
      <button class="btn btn-secondary mb-3" id="closeTaskViewButton" style="float:right;">
        ← Volver
      </button>
    `);
    $list.before($closeBtn);
    $closeBtn.off('click').on('click', () => {
      if (this.bindCloseTaskView) this.bindCloseTaskView();
    });

    if (!tasks || tasks.length === 0) {
      $list.append('<li class="list-group-item">No tasks for this project.</li>');
    } else {
      tasks.forEach((task, i) => {
        $list.append(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" class="toggle-task" data-index="${i}" ${task.completed ? "checked" : ""}>
              <span class="${task.completed ? "text-decoration-line-through" : ""}">
                <strong>${task.title}</strong> - ${task.description || ""}
                <span class="badge bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "secondary"} ms-2">${task.priority}</span>
                ${task.deadline ? `<small class="text-muted ms-2">${task.deadline}</small>` : ""}
              </span>
            </div>
            <button class="btn btn-sm btn-danger delete-task" data-index="${i}">🗑️</button>
          </li>
        `);
      });
      $list.off("change", ".toggle-task").on("change", ".toggle-task", (e) => {
        const idx = $(e.target).data("index");
        if (this.toggleTask) this.toggleTask(idx);
      });

      $list.off("click", ".delete-task").on("click", ".delete-task", (e) => {
        const idx = $(e.target).data("index");
        if (this.deleteTask) this.deleteTask(idx);
      });
    }
    const $button = $(`<button class="btn btn-primary mt-3" id="addTaskButton">Add Task</button>`);
    $list.append($button);
    $button.on('click', () => {
      this.onAddTask();
    });

    $list.removeClass('d-none');
  }

  
  bindCloseTaskView(handler) {
    this.bindCloseTaskView = handler;
    
  }


  onAddTask() {
   
    if ($('#addTaskModal').length === 0) {
      $('body').append(`
        <div class="modal" tabindex="-1" id="addTaskModal" style="display:none;">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Task</h5>
                <button type="button" class="close" id="closeAddTaskModal">&times;</button>
              </div>
              <div class="modal-body">
                <form id="addTaskForm">
                  <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control" name="title" required>
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea class="form-control" name="description"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Priority</label>
                    <select class="form-control" name="priority">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Deadline</label>
                    <input type="date" class="form-control" name="deadline">
                  </div>
                  <button id="taskSubmit" type="submit" class="btn btn-primary">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      `);

      
      $('#closeAddTaskModal').on('click', function() {
        $('#addTaskModal').hide();
      });
      
      $('#addTaskModal').on('click', function(e) {
        if (e.target === this) $(this).hide();
      });
      $("#taskSubmit").on('click', (e) =>{
        e.preventDefault();
        this.submitTask;
        
      })
    }
    
    $('#addTaskModal').show();
  }

  getDataFromModal() {
    const formData = {};
    $('#addTaskForm').find('input, select, textarea').each(function() {
      const name = $(this).attr('name');
      if (name) {
        formData[name] = $(this).val();
      }
    }
    );
    return formData;
  }
  onTaskSubmit(handler) {
    this.submitTask = handler;
  }

  bindToggle(handler) {
    this.toggleTask = handler;
  }

  bindDelete(handler) {
    this.deleteTask = handler;
  }
  hideView() {
    $("#task-list").remove();
    $("#addTaskButton").remove();
    $("#closeTaskViewButton").remove();
    $("#closeTaskViewButton").remove();
  }
  
}