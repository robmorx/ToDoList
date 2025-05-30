export default class TaskView {
  static renderTasks(tasks) {
    const list = $("#task-list");
    list.empty();
    tasks.forEach((task, index) => {
      list.append(`
        <li>
          <input type="checkbox" data-index="${index}" class="toggle-task" ${task.completed ? "checked" : ""}>
          <strong>${task.title}</strong> - ${task.priority} - ${task.deadline}
          <p>${task.description}</p>
          <button class="delete-task" data-index="${index}">🗑️</button>
        </li>
      `);
    });
  }

  static onTaskSubmit(callback) {
    $("#task-form").on("submit", function (e) {
      e.preventDefault();
      const task = {
        title: $("#title").val().trim(),
        description: $("#description").val().trim(),
        deadline: $("#deadline").val(),
        priority: $("#priority").val(),
        completed: false,
      };
      callback(task);
      this.reset();
    });
  }

  static bindToggle(callback) {
    $("#task-list").on("change", ".toggle-task", function () {
      callback($(this).data("index"));
    });
  }

  static bindDelete(callback) {
    $("#task-list").on("click", ".delete-task", function () {
      callback($(this).data("index"));
    });
  }
}