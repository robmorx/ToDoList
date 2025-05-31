export default class Task {
    constructor(title, description, deadline, priority) {
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