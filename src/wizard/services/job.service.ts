import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    private jobs = new BehaviorSubject<Job[]>([]);
    jobs$ = this.jobs.asObservable();
    private selectedJob = new BehaviorSubject<Job | null | undefined>(null);
    selectedJob$ = this.selectedJob.asObservable();

    setJobs(jobs: Job[]) {
        this.jobs.next(jobs);
    }

    selectJob(job: Job) {
        this.selectedJob.next(job);
    }
    updateJobStatus(jobName: string, status: 'idle' | 'in-progress' | 'completed') {
        const currentJobs = this.jobs.value;
        const updatedJobs = currentJobs.map(job =>
            job.jobName === jobName ? { ...job, status } : job
        );
        this.jobs.next(updatedJobs);
        this.selectedJob.next(updatedJobs.find(x => x.jobName === jobName))
    }
}