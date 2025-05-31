export default class ProjectModel {
    constructor() {
        this.projects = [];
    }

    static addProject(project) {
        this.projects.push(project);
    }

    static deleteProject(index) {
        if (index >= 0 && index < this.projects.length) {
            this.projects.splice(index, 1);
        }
    }

    static getProjects() {
        return this.projects;
    }

    static getProjectByIndex(index) {
        if (index >= 0 && index < this.projects.length) {
            return this.projects[index];
        }
        return null;
    }
}