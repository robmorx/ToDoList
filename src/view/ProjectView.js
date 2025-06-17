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
            <span><strong>${project.getName()}</strong></span>
            <button class="delete-project btn btn-danger btn-sm" data-index="${index}" title="Delete Project">
              <span aria-hidden="true">🗑️</span>
            </button>
            <ul id = "task-list${index}" class="task-list mt-2" style="display: none;"></ul>
            
          </li>
        `);
      });

      // Delegate events for better performance and correct binding
      list.off("click", ".delete-project");
      list.on("click", ".delete-project", (e) => {
        e.stopPropagation();
        const index = $(e.currentTarget).data("index");
        this.deleteProject(index);
      });

      $(".project-item").on("click", (e) => {
        const index = $(e.currentTarget).data("index");
          this.selectProject(index);
      });
      
      
    }
  }

  hideView() {
    $("#project-list").hide();
    $("#create-project-btn").hide();
    $("#new-project-name").hide();
    $("#filter-div").hide();
  }
  showView() {
    $("#project-list").show();
    $("#create-project-btn").show();
    $("#new-project-name").show();
    $("#filter-div").show();
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