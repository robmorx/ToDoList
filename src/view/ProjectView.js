export default class ProjectView {

  constructor() {
    // Bind handlers to instance
    this.selectProject = null;
    this.deleteProject = null;
  }

  renderProjects(projects) {
    const list = $("#project-list");
    list.empty();
    if (projects.length === 0) {
      list.append("<li>No projects available. Please create a new project.</li>");
    } else {
      projects.forEach((project, index) => {
        list.append(`
          <li class="project-item list-group-item d-flex justify-content-between align-items-center" data-index="${index}">
            <span><strong>${project.name}</strong></span>
            <button class="delete-project btn btn-danger btn-sm" data-index="${index}" title="Delete Project">
              <span aria-hidden="true">🗑️</span>
            </button>
          </li>
        `);
      });

      // Delegate events for better performance and correct binding
      list.off("click", ".delete-project");
      list.on("click", ".delete-project", (e) => {
        e.stopPropagation();
        const index = $(e.currentTarget).data("index");
        if (this.deleteProject) this.deleteProject(index);
      });

      list.off("click", ".project-item");
      list.on("click", ".project-item", (e) => {
        const index = $(e.currentTarget).data("index");
        if (this.selectProject) this.selectProject(index);
      });
    }
  }

  bindCreateProject(handler) {
    $("#create-project-btn").on("click", handler);
  }

  getFormData() {
    return $("#new-project-name").val();
  }

  cleanForm() {
    $("#new-project-name").val("");
  }

  bindSelectProject(handler) {
    this.selectProject = handler;
  }

  delete(handler) {
    this.deleteProject = handler;
  }
}