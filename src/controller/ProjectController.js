import ProjectView from '../view/ProjectView.js';
import ProjectModel from '../model/ProjectModel.js';
import TaskController from './TaskController.js';
import Project from '../entity/Project.js';
export default class ProjectController {
    constructor() {
        this.ProjectView = new ProjectView();
        this.ProjectModel = new ProjectModel();
        this.init();
        
        
        
    }

    init() {
        this.renderProjects();
        this.bindEvents();
    }
    renderProjects() {
        this.ProjectView.renderProjects(this.ProjectModel.getProjects());
    
    }
    addProject() {
        const project  = new Project(this.ProjectView.getFormData());
        this.ProjectModel.addProject(project);
        this.renderProjects();
        this.ProjectView.cleanForm();
    }

    selectedProject(index) {
        
        const project = this.ProjectModel.getProjectByIndex(index);
        console.log(project);
        if (project) {
            this.TaskController = new TaskController(project, index);
            
        }
    }

    deleteProject(index) {
        this.ProjectModel.deleteProject(index);
        this.renderProjects();
    }
    bindEvents() {
        this.ProjectView.bindCreateProject(this.addProject.bind(this));
        this.ProjectView.delete(this.deleteProject.bind(this));
        this.ProjectView.bindSelectProject(this.selectedProject.bind(this));
    }
}