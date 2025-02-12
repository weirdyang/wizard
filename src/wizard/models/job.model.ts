export interface Job {
    jobName: string;
    priority: string;
    instructions: string;
    dueDate: Date;
    status?: 'idle' | 'in-progress' | 'completed';
}
