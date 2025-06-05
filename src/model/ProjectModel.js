import Task from '../entity/Task.js';
import Project from '../entity/Project.js';
export default class ProjectModel {
    constructor() {
        this.projects = [];
    }
    updateLocalStorage() {
        localStorage.removeItem('projects');
        const json = JSON.stringify(this.projects);
        localStorage.setItem('projects', json);
    }
    getFromLocalStorage() {
        const json = JSON.parse(localStorage.getItem('projects')) || [];
        json.forEach((project) => {
            const newProject = new Project(project.name, project.tasks);
            newProject.tasks = project.tasks.map(task => new Task(task.title, task.description, task.completed));
            this.projects.push(newProject);
        })
        
    }

    addProject(project) {
        this.projects.push(project);
    }

    deleteProject(index) {
        if (index >= 0 && index < this.projects.length) {
            this.projects.splice(index, 1);
        }
    }

    getProjects() {
        return this.projects;
    }

    getProjectByIndex(index) {
        if (index >= 0 && index < this.projects.length) {
            return this.projects[index];
        }
        return null;
    }
}