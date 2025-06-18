export default class TaskView {
 
  constructor(tasks, index) {
    
    this.renderTasks(tasks, index);
    console.log("TaskView initialized");
    this.submitTask = null;
    this.deleteTask = null;
    this.toggleTask = null;
  }
  
  renderTasks(tasks, projectIndex) {
    const $list = $("#task-list");
    $list.empty();
    console.log("Rendering tasks for project index:", tasks);
    let $actionBar = $("#task-action-bar");
    if ($actionBar.length === 0) {
      $actionBar = $(`
        <div id="task-action-bar" class="d-flex justify-content-between align-items-center mb-3"></div>
      `);
      $list.before($actionBar);
    } else {
      $actionBar.empty();
    }

    const $closeBtn = $(`
      <button class="btn btn-secondary" id="closeTaskViewButton">
        ← Return
      </button>
    `);
    $closeBtn.off('click').on('click', () => {
      if (this.bindCloseTaskView) this.bindCloseTaskView();
    });

    const $addBtn = $(`<button class="btn btn-primary" id="addTaskButton">Add Task</button>`);
    $addBtn.off('click').on('click', () => {
      this.onAddTask();
    });

    $actionBar.append($closeBtn, $addBtn);

    this.renderTaskList(tasks);

    $list.removeClass('d-none');
  }

  renderTaskList(tasks) {
    const $list = $("#task-list");
    $list.empty();
    console.log("Rendering task list:", tasks);
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
  }

  /*renderNewTask(task) {
    console.log("Rendering new task:", task);

    const $list = $("#task-list");
    $list.empty();
    const index = $list.children().length;
    $list.append(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <input type="checkbox" class="toggle-task" data-index="${index}" ${task.completed ? "checked" : ""}>
          <span class="${task.completed ? "text-decoration-line-through" : ""}">
            <strong>${task.title}</strong> - ${task.description || ""}
            <span class="badge bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "secondary"} ms-2">${task.priority}</span>
            ${task.deadline ? `<small class="text-muted ms-2">${task.deadline}</small>` : ""}
          </span>
        </div>
        <button class="btn btn-sm btn-danger delete-task" data-index="${index}">🗑️</button>
      </li>
    `);
  }*/
  
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
        this.submitTask();
        
      })
    }
    
    $('#addTaskModal').show();
  }

  getDataFromModal() {
    const formArray = $('#addTaskForm').serializeArray();
    const formData = {};
    //Remove data from form
    formArray.forEach(field => {
      formData[field.name] = field.value;
    });
    
    //Not a good practice
    $('#addTaskForm').val("");
    $('#addTaskModal').hide();
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
    $("#task-list").empty();
    $("#task-action-bar").empty();
  }
  
}