import ProjectView from '../view/ProjectView.js';
import ProjectModel from '../model/ProjectModel.js';
import TaskController from './TaskController.js';
import Project from '../entity/Project.js';
export default class ProjectController {
    constructor() {
        this.init();
        
        
        
    }

    init() {
        this.renderProjects();
        this.bindEvents();
    }
    renderProjects() {
        ProjectView.renderProjects(ProjectModel.getProjects());
    
    }
    addProject() {
        const project  = new Project(ProjectView.getFormData());
        ProjectModel.addProject(project);
        this.renderProjects();
    }

    selectedProject(index) {
        const project = ProjectModel.getProjectByIndex(index);
        if (project) {
            TaskController.setProject(project);
            TaskController.renderTasks();
        }
    }

    deleteProject(index) {
        ProjectModel.deleteProject(index);
        this.renderProjects();
    }
    bindEvents() {
        this.view.bindCreateProject(this.addProject.bind(this));
        this.view.delete((index) => {
            this.deleteProject(index);
        });
        this.view.bindSelectProject((index) => {
            this.selectedProject(index);
        });
    }
}