import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-side-menu',
    standalone: true,
    imports: [CommonModule],
    template: `
<div class="side-menu w-64 bg-base-200 p-4 rounded-lg shadow-md">
  <div *ngFor="let priority of priorities" class="mb-4">
    <!-- Priority Header -->
    <h3 class="text-lg font-bold text-primary mb-2">{{ priority }}</h3>

    <!-- Job List -->
    <div *ngFor="let job of getJobsByPriority(priority)"
         (click)="selectJob(job)"
         [class.active]="(selectedJob$ | async)?.jobName === job.jobName"
         class="p-2 cursor-pointer rounded-md hover:bg-primary hover:text-white transition duration-300"
         [ngClass]="{'bg-primary text-black': (selectedJob$ | async)?.jobName === job.jobName}">
      {{ job.jobName }}
    </div>
  </div>
</div>
  `,
    styles: [`
    .side-menu {
      width: 250px;
      padding: 20px;
      border-right: 1px solid #ddd;
    }
    .active {
      background-color: #e0e0e0;
    }
  `]
})
export class SideMenuComponent implements OnInit {
    jobs: Job[] = [];
    priorities: string[] = [];
    selectedJob$: Observable<Job | null | undefined>

    constructor(private jobService: JobService) {
        this.selectedJob$ = this.jobService.selectedJob$;
    }

    ngOnInit() {
        this.jobService.jobs$.subscribe(jobs => {
            this.jobs = jobs;
            this.priorities = [...new Set(jobs.map(job => job.priority))];
        });
    }

    getJobsByPriority(priority: string): Job[] {
        return this.jobs.filter(job => job.priority === priority);
    }

    selectJob(job: Job) {

        this.jobService.selectJob(job);
    }
}