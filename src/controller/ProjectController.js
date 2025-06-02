import ProjectView from '../view/ProjectView.js';
import ProjectModel from '../model/ProjectModel.js';
import TaskView from '../view/TaskView.js';
import Project from '../entity/Project.js';
import Task from '../entity/Task.js';

export default class ProjectController {
    constructor() {
        this.ProjectView = new ProjectView();
        this.ProjectModel = new ProjectModel();
        this.selectedProjectIndex = null;
        this.taskView = null;
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
        const project = new Project(this.ProjectView.getFormData());
        //if (project.getName().trim() !== '' ) {
            this.ProjectModel.addProject(project);
            this.renderProjects();
            this.ProjectView.cleanForm();
        //}
    }

    selectProject(index) {
        this.selectedProjectIndex = index;
        const project = this.ProjectModel.getProjectByIndex(index);
        if (project) {

            this.ProjectView.hideView(); 
            this.taskView = new TaskView(project.getTasks(), index);
            this.taskView.onTaskSubmit(this.addTask.bind(this));
            this.taskView.bindToggle(this.toggleTaskCompletion.bind(this));
            this.taskView.bindDelete(this.deleteTask.bind(this));
            this.taskView.bindCloseTaskView(this.closeTask.bind(this));
        }
    }
    
    addTask() {
        
        const task = new Task(this.taskView.getDataFromModal());
        const project = this.ProjectModel.getProjectByIndex(this.selectedProjectIndex);
        if (project) {
            project.addTask(task);
            this.taskView.renderNewTask(task);
            //this.ProjectModel.updateProject(this.selectedProjectIndex, project);
            //this.taskView.renderTasks(project.getTasks(), this.selectedProjectIndex);
        }
    }

    toggleTaskCompletion(taskIndex) {
        const project = this.ProjectModel.getProjectByIndex(this.selectedProjectIndex);
        if (project) {
            project.toggleTaskCompletion(taskIndex);
            //this.ProjectModel.updateProject(this.selectedProjectIndex, project);
            //this.taskView.renderTasks(project.getTasks(), this.selectedProjectIndex);
            this.renderProjects();
        }
    }
    closeTask() {
        this.taskView.hideView();
        this.ProjectView.renderProjects(this.ProjectModel.getProjects());
        this.ProjectView.showView();
        this.selectedProjectIndex = null; // Reset the selected project index
        this.taskView = null; // Clear the task view
    }
    deleteTask(taskIndex) {
        const project = this.ProjectModel.getProjectByIndex(this.selectedProjectIndex);
        if (project) {
            project.deleteTask(taskIndex); // Asegúrate de tener este método en Project
            //this.ProjectModel.updateProject(this.selectedProjectIndex, project);
            //this.taskView.renderTasks(project.getTasks(), this.selectedProjectIndex);
            this.renderProjects();
        }
    }

    deleteProject(index) {
        this.ProjectModel.deleteProject(index);
        this.renderProjects();
    }

    bindEvents() {
        this.ProjectView.bindCreateProject(this.addProject.bind(this));
        this.ProjectView.delete(this.deleteProject.bind(this));
        this.ProjectView.bindSelectProject(this.selectProject.bind(this));
    }
}