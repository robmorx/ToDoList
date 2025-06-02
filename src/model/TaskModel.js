export default class TaskModel {
    constructor(tasks = []) {
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(index) {
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
}