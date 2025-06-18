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
        this.initAsync();
    }

    async initAsync() {
        await this.ProjectModel.getFromApi();
        this.init();
    }

    init() {
        this.renderProjects();
        this.bindEvents();
        this.renderProjects();
    }

    renderProjects() {
        console.log('RenderProjects: ',this.ProjectModel.getProjects());
        this.ProjectView.renderProjects(this.ProjectModel.getProjects());
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
    
    async addProject() {
        const project = new Project("", this.ProjectView.getFormData());
        if (project.getName() !== '' ) {
            await this.ProjectModel.postProject(project);
            this.renderProjects();
            this.ProjectView.cleanForm();
        }
    }

    async addTask() {
        const task = new Task(this.taskView.getDataFromModal());
        const project = this.ProjectModel.getProjectByIndex(this.selectedProjectIndex);
        await this.ProjectModel.postTasks(project.getId(), task);
        this.taskView.renderTaskList(project.getTasks());
    }

    toggleTaskCompletion(taskIndex) {
        const project = this.ProjectModel.getProjectByIndex(this.selectedProjectIndex);
        console.log('Project:', project);
        if (project) {
            project.toggleTaskCompletion(taskIndex);
            //this.ProjectModel.postProject(project);
            this.taskView.renderTaskList(project.getTasks());

        }
    }
    closeTask() {
        this.taskView.hideView();
        this.ProjectView.renderProjects(this.ProjectModel.getProjects());
        this.ProjectView.showView();
        this.selectedProjectIndex = null; 
        this.taskView = null; 
    }
    async deleteTask(taskIndex) {
        const project = this.ProjectModel.getProjectByIndex(this.selectedProjectIndex);
        if (project) {
            const tasks = project.getTasks();
            const taskId = tasks[taskIndex].getId();
            console.log('Task ID to delete:', taskId, 'Project ID:', project.getId());
            await this.ProjectModel.deleteTask(project.getId(), taskId);
            console.log(project.getTasks());
            project.deleteTask(taskIndex);
            this.taskView.renderTaskList(project.getTasks());
        }
    }

    async deleteProject(index) {
        const project = this.ProjectModel.getProjectByIndex(index);
        if (project) {
            await this.ProjectModel.deleteProject(project.getId());
            this.renderProjects();
        }
    }

    bindEvents() {
        this.ProjectView.bindCreateProject(this.addProject.bind(this));
        this.ProjectView.delete(this.deleteProject.bind(this));
        this.ProjectView.bindSelectProject(this.selectProject.bind(this));
    }
}