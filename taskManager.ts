// web/src/modules/taskManager.ts
import Task from '@/model/Task';
import { initialTasks } from '@/utils/TaskList';

// Initialize the tasks with initial tasks
let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
    if (tasks.length === 0) {
        tasks = [...initialTasks];
    }
}

// Retrieve currently active tasks (tasks that are not completed)
export function getActiveTasks(): Task[] {
    return tasks.filter(task => !task.completed);
}

// Retrieve completed tasks
export function getCompletedTasks(): Task[] {
    return tasks.filter(task => task.completed);
}

// Retrieve the full list of tasks
export function getAllTasks(): Task[] {
    return tasks;
}

// Mark a task as completed by its title
export function completeTask(taskTitle: string): void {
    const task = tasks.find(task => task.title === taskTitle);
    if (task) {
        task.completed = true;
    } else {
        throw new Error('Task Not Found');
    }
}

// Create a new task and add it to the tasks list
export function createTask(title: string, description: string, persona: string, group: number): void {
    const newTask = new Task(
        tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, // Increment ID
        title,
        description,
        persona,
        group,
        false // Newly created tasks are not completed by default
    );
    tasks.push(newTask);
}

// Update an existing task by its ID
export function updateTask(taskId: number, updatedTask: Partial<Omit<Task, 'id'>>): void {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex >= 0) {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...updatedTask,
            // Optionally update the `completed` status
        };
    } else {
        throw new Error('Task not found');
    }
}

// Delete a task by its ID
export function deleteTask(taskId: number): void {
    tasks = tasks.filter(task => task.id !== taskId);
}