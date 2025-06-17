export default class Task {
    constructor(taskFormData) {
        const { id, title, description, deadline, priority } = taskFormData;
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
        this.completed = false;
    }
    
    toggleCompletion() {
        this.completed = !this.completed;
    }
    
}