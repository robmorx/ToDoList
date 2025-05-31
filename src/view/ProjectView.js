export default class ProjectView {

  constructor() {
    
  }

  static renderProjects(projects) {
    const list = $("#project-list");
    list.empty();
    if (projects.length === 0) {
      list.append("<li>No projects available. Please create a new project.</li>");
    }else {
      projects.forEach((project, index) => {
        console.log(project);
        list.append(`
          <li class="project-item list-group-item d-flex justify-content-between align-items-center" data-index="${index}">
            <span><strong>${project.name}</strong></span>
            <button class="delete-project btn btn-danger btn-sm" data-index="${index}" title="Delete Project">
              <span aria-hidden="true">🗑️</span>
            </button>
          </li>
        `);
        $(".delete-project").on("click", () => {
          const index = $(this).data("index");
          this.deleteProject(index);

        });
        $(".project-item").on("click", function() {
          const index = $(this).data("index");
          this.selectProject(index);
        });
      });
   }
  }
  
  static bindCreateProject(handler) {
    $("#create-project-btn").on("click", handler);
  }
  static getFormData() {
    return $("#new-project-name").val();
    
  }
  
  static cleanForm() {
    $("#new-project-name").val("");
  }

  static bindSelectProject(handler) {
    this.selectProject = handler;
  }
  static delete(handler) {
    this.deleteProject = handler;
  }
}