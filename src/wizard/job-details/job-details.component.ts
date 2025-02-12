import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-job-details',
    standalone: true,
    imports: [CommonModule],
    template: `
<div *ngIf="selectedJob$ | async as selectedJob" class="job-details card bg-base-100 shadow-lg p-6 rounded-lg">
  <h2 class="text-2xl font-bold text-primary mb-2">{{ selectedJob.jobName }}</h2>

  <p class="text-lg">
    <strong>Priority:</strong>
    <span class="badge badge-secondary">{{ selectedJob.priority }}</span>
  </p>

  <p class="text-lg">
    <strong>Due Date:</strong>
    <span class="text-gray-500">{{ selectedJob.dueDate | date }}</span>
  </p>

  <p class="text-lg font-semibold mt-4">Instructions:</p>
  <div class="instructions bg-gray-100 p-4 rounded-md text-gray-700">
    {{ selectedJob.instructions }}
  </div>

  <div class="actions flex gap-4 mt-6">
    <button
      class="btn btn-success"
      (click)="startJob(selectedJob.jobName)"
      [disabled]="selectedJob.status === 'in-progress'">
      START
    </button>

    <button
      class="btn btn-error"
      (click)="stopJob(selectedJob.jobName)"
      [disabled]="selectedJob.status !== 'in-progress'">
      STOP
    </button>
  </div>
</div>

  `,
    styles: [`
    .job-details {
      flex: 1;
      padding: 20px;
    }
    .instructions {
      margin: 20px 0;
      padding: 10px;
      background-color: #f5f5f5;
    }
    .actions {
      display: flex;
      gap: 10px;
    }
  `]
})
export class JobDetailsComponent {

    selectedJob$: Observable<Job | null | undefined>
    constructor(private jobService: JobService) {
        this.selectedJob$ = this.jobService.selectedJob$;
    }

    startJob(jobName: string) {
        if (jobName) {
            this.jobService.updateJobStatus(jobName, 'in-progress');
        }
    }

    stopJob(jobName: string) {
        if (jobName) {
            this.jobService.updateJobStatus(jobName, 'completed');
        }
    }
}