export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        }
    }

    toggleTaskCompletion(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks[index].toggleCompletion();
        }
    }

    getTasks() {
        return this.tasks;
    }
    deleteTask(index) {
        if (index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        }
    }
}