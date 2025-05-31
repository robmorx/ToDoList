export default class ProjectView {

  constructor() {
    this.createButton = $("#create-project");
  }

  static renderProjects(projects) {
    const list = $("#project-list");
    list.empty();
    projects.forEach((project, index) => {
      list.append(`
        <li class="project-item" data-index="${index}">
          <strong>${project.name}</strong>
          <button class="delete-project" data-index="${index}">🗑️</button>
        </li>
      `);
    });
  }
  
  static bindCreateProject(handle) {
    this.createButton.on("click", handle);
  }
  static getFormData() {
    return {
      name: $("#project-name").val().trim(),
    };
  }
  
  static cleanForm() {
    $("#project-name").val("");
  }

  static bindSelectProject(handle) {
    $(".project-item").on("click", function() {
      const index = $(this).data("index");
      handle(index);
    });
  }
  static delete(handle) {
    $(".delete-project").on("click", function() {
      const index = $(this).data("index");
      handle(index);
    });
  }
}