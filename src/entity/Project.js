export default class Project {
    

    constructor(name, tasks = []) {
        this.name = name;
        this.tasks = tasks;
    }

    getName() {
        return this.name;
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