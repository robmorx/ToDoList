export default class TaskView {
 
  constructor(tasks, index) {
    this.renderTasks(tasks, index);
  }
  
  renderTasks(tasks, index) {
    const list = $(`#task-list${index}`);
    list.empty();
    list.append(`<h3>Tasks for Project ${index + 1}</h3>
      <button id="add-task-btn" class="btn btn-primary mb-2">Add Task</button>`);
    tasks.forEach((task, taskIndex) => {
      list.append(`
        <li>
          <input type="checkbox" data-index="${taskIndex}" class="toggle-task" ${task.completed ? "checked" : ""}>
          <strong>${task.title}</strong> - ${task.priority} - ${task.deadline}
          <p>${task.description}</p>
          <button class="delete-task" data-index="${taskIndex}">🗑️</button>
        </li>
      `);
    });
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
                  <button type="submit" class="btn btn-primary">Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      `);

      // Cerrar modal
      $('#closeAddTaskModal').on('click', function() {
        $('#addTaskModal').hide();
      });
      // Cerrar modal al hacer click fuera del contenido
      $('#addTaskModal').on('click', function(e) {
        if (e.target === this) $(this).hide();
      });
    }
    // Mostrar el modal
    $('#addTaskModal').show();
  }
  onTaskSubmit(handler) {

  }

  bindToggle(handler) {
    
  
  }

  bindDelete(handler) {
    
  
  }
}