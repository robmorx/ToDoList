export default class ProjectModel {
    constructor() {
        this.projects = [];
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