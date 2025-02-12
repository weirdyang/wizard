import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';

@Component({
    selector: 'app-job-grid',
    standalone: true,
    imports: [CommonModule],
    providers: [DatePipe],
    template: `
<div class="overflow-x-auto">
  <table class="table table-zebra w-full border rounded-lg shadow-md">
    <!-- Table Header -->
    <thead class="bg-primary text-white">
      <tr>
        <th class="cursor-pointer" (click)="sort('jobName')">Job Name</th>
        <th class="cursor-pointer" (click)="sort('priority')">Priority</th>
        <th class="cursor-pointer" (click)="sort('dueDate')">Due Date</th>
        <th>Instructions</th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody>
      <tr *ngFor="let job of jobs" class="hover">
        <td class="font-semibold">{{ job.jobName }}</td>
        <td>
          <span class="badge badge-secondary">{{ job.priority }}</span>
        </td>
        <td class="text-gray-500">{{ job.dueDate | date:'mediumDate' }}</td>
        <td>{{ job.instructions }}</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Continue Button -->
<div class="mt-4 flex justify-center">
  <button class="btn btn-primary" (click)="nextStep()">Continue</button>
</div>

  `,
    styles: [`
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th {
      cursor: pointer;
    }
    th, td {
      padding: 8px;
      border: 1px solid #ddd;
    }
  `]
})
export class JobGridComponent implements OnInit {
    @Output() next = new EventEmitter<void>();
    jobs: Job[] = [];
    sortDirection = 1;

    constructor(
        private jobService: JobService,
        private datePipe: DatePipe
    ) { }

    ngOnInit() {
        this.jobService.jobs$.subscribe(jobs => {
            this.jobs = jobs.map(job => ({
                ...job,
                dueDate: new Date(job.dueDate) // Ensure date is properly parsed
            }));
        });
    }

    sort(column: keyof Job) {
        this.jobs.sort((a, b) => {
            let comparison: number;

            if (column === 'dueDate') {
                comparison = new Date(a[column]).getTime() - new Date(b[column]).getTime();
            } else {
                comparison = String(a[column]).localeCompare(String(b[column]));
            }

            return comparison * this.sortDirection;
        });
        this.sortDirection *= -1;
    }

    nextStep() {
        this.next.emit();
    }
}