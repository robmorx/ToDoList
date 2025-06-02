export default class Task {
    constructor(taskFormData) {
        const { title, description, deadline, priority } = taskFormData;
        
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