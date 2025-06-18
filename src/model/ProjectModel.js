import Task from '../entity/Task.js';
import Project from '../entity/Project.js';

export default class ProjectModel {
    constructor() {
        this.projects = [];
        
    }

    async getFromApi() {
        try {
            const response = await fetch('http://localhost:8080/api/projects/');
            const data = await response.json();
            this.projects = [];
            data.forEach((project) => {
                const newProject = new Project(project.id, project.name, project.tasks);
                newProject.tasks = project.tasks.map(task => new Task(task));
                this.projects.push(newProject);
            });
            console.log('Projects loaded:', this.projects);
            return true;
        } catch (error) {
            console.error('GET error:', error);
            return false;
        }
    }

    async postProject(project) {
    try {
        const response = await fetch('http://localhost:8080/api/projects/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: project.getId(),
                name: project.getName(),
                task: project.getTasks()
            })
        });
        const data = await response.json();
        this.projects = this.projects.filter(p => p.getId() !== data.id);
        this.addProject(new Project(data.id, data.name, data.tasks));
        return data;
    } catch (error) {
        console.error('POST error:', error);
        throw error;
    }
}

async postTasks(projectId, task) {
    try {
        const response = await fetch(`http://localhost:8080/api/projects/${projectId}/tasks/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        const data = await response.json();
        const project = this.projects.find(p => p.getId() === projectId);
        if (project) {
            project.addTask(new Task(data));
        }
        return data;
    } catch (error) {
        console.error('POST error:', error);
        throw error;
    }
}

    async deleteProject(projectId) {
        try {
            const response = await fetch(`http://localhost:8080/api/projects/${projectId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.projects = this.projects.filter(project => project.getId() !== projectId);
                return true;
            } else {
                throw new Error('Error deleting project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }

    async deleteTask(projectId, taskId) {
        try {
            const response = await fetch(`http://localhost:8080/api/projects/${projectId}/tasks/${taskId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                const project = this.projects.find(p => p.getId() === projectId);
                if (project) {
                    project.deleteTask(taskId);
                }
                return true;
            } else {
                throw new Error('Error deleting task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
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
       console.log('Adding project:', project);
        this.projects.push(project);
        console.log('Current projects:', this.projects);
        
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