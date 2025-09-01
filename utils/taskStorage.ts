// utils/taskStorage.ts
import { Task } from "../types/task";

const STORAGE_KEY = "tasks_v1";

export function getTasks(): Task[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw) as Task[];
    } catch (e) {
        console.error("Failed to parse tasks from localStorage:", e);
        return [];
    }
}

export function saveTasks(tasks: Task[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(title: string): Task {
    const tasks = getTasks();
    const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        done: false,
        createdAt: new Date().toISOString(),
    };
    const next = [newTask, ...tasks];
    saveTasks(next);
    return newTask;
}

export function toggleTask(id: string) {
    const tasks = getTasks().map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    saveTasks(tasks);
    return tasks;
}

export function deleteTask(id: string) {
    const tasks = getTasks().filter((t) => t.id !== id);
    saveTasks(tasks);
    return tasks;
}
