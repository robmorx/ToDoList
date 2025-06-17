import Task from '../entity/Task.js';
import Project from '../entity/Project.js';

export default class ProjectModel {
    constructor() {
        this.projects = [];
        console.log(this.projects);
    }

    getFromApi() {
        $.ajax({
            url: 'http://localhost:8080/api/projects/',
            method: 'GET',
            success: (data) => {
                this.projects = [];
                data.forEach((project) => {
                    const newProject = new Project(project.id, project.name, project.tasks);
                    newProject.tasks = project.tasks.map(task => new Task(task.id, task.title, task.description, task.completed));
                    this.projects.push(newProject);
                });
                return data;
            },
            error: (xhr, status, error) => {
                console.error('GET error:', error);
            }
        });
    }

    postProject(project) {
        $.ajax({
            url: 'http://localhost:8080/api/projects/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: project.getName(),
                task: project.getTasks()
            }),
            success: (data) => {
                this.projects = this.projects.filter(p => p.getId() !== data.id);
                this.addProject(new Project(data.id, data.name, data.tasks));
            },
            error: (xhr, status, error) => {
                console.error('POST error:', error);
            }
        });
    }

    postTasks(projectId, task) {
        $.ajax({
            url: `http://localhost:8080/api/projects/${projectId}/tasks`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(task),
            success: (data) => {
                console.log('POST success:', data);
                const project = this.projects.find(p => p.getId() === projectId);
                if (project) {
                    project.addTask(new Task(data.id, data.title, data.description, data.completed));
                }
            },
            error: (xhr, status, error) => {
                console.error('POST error:', error);
            }
        });
    }

    deleteProject(projectId) {
        $.ajax({
            url: `http://localhost:8080/api/projects/${projectId}`,
            method: 'DELETE',
            success: () => {
                console.log('Project deleted');
                const index = this.projects.findIndex(project => project.getId() === projectId);
                if (index !== -1) {
                    this.projects.splice(index, 1);
                }
            },
            error: (xhr, status, error) => {
                console.error('Error deleting project:', error);
            }
        });
    }

    deleteTask(projectId, taskId) {
        $.ajax({
            url: `http://localhost:8080/api/projects/${projectId}/tasks/${taskId}`,
            method: 'DELETE',
            success: () => {
                console.log('Task deleted');
                const project = this.projects.find(p => p.getId() === projectId);
                if (project) {
                    project.deleteTask(taskId);
                }
            },
            error: (xhr, status, error) => {
                console.error('Error deleting task:', error);
            }
        });
    }

    updateLocalStorage() {
        localStorage.removeItem('projects');
        const json = JSON.stringify(this.projects);
        localStorage.setItem('projects', json);
    }

    getFromLocalStorage() {
        const json = JSON.parse(localStorage.getItem('projects')) || [];
        this.projects = [];
        json.forEach((project) => {
            const newProject = new Project(project.name, project.tasks);
            newProject.tasks = project.tasks.map(task => new Task(task.title, task.description, task.completed));
            this.projects.push(newProject);
        });
    }

    addProject(project) {
        this.projects.push(project);
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