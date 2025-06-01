import TaskView from '../view/TaskView.js';
import TaskModel from '../model/TaskModel.js';
export default class TaskController {
    constructor(project, index) {
        
        this.init(project ,index);
        this.bindEvents();
  }
    init(project,  index) {
        this.project = project;
        this.tasks = project.getTasks();
        this.model = new TaskModel(this.tasks);
        this.view = new TaskView(project.getTasks(), index);
        this.view.renderTasks(this.tasks, index);
    }
    bindEvents() {
        this.view.onTaskSubmit(this.addTask.bind(this));
        this.view.bindToggle(this.toggleTaskCompletion.bind(this));
        this.view.bindDelete(this.deleteTask.bind(this));
    }

    addTask(task) {
        this.model.addTask(task);
        this.view.renderTasks(this.model.getTasks());
    }

    toggleTaskCompletion(index) {
        this.model.toggleTaskCompletion(index);
        this.view.renderTasks(this.model.getTasks());
    }

    deleteTask(index) {
        this.model.deleteTask(index);
        this.view.renderTasks(this.model.getTasks());
    }
}