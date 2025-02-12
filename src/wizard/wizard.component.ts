import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { JobGridComponent } from './job-grid/job-grid.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { Job } from './models/job.model';

@Component({
    selector: 'app-wizard',
    standalone: true,
    imports: [
        CommonModule,
        FileUploadComponent,
        QuestionnaireComponent,
        JobGridComponent,
        JobDetailsComponent,
        SideMenuComponent
    ],
    template: `
<div class="wizard-container bg-base-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
  <!-- Step 1: File Upload -->
  <div class="wizard-step" *ngIf="currentStep === 1">
    <app-file-upload (fileUploaded)="onFileUploaded($event)"></app-file-upload>
  </div>

  <!-- Step 2: Questionnaire -->
  <div class="wizard-step" *ngIf="currentStep === 2">
    <app-questionnaire (completed)="onQuestionnaireCompleted()"></app-questionnaire>
  </div>

  <!-- Step 3: Job Grid -->
  <div class="wizard-step" *ngIf="currentStep === 3">
    <app-job-grid (next)="currentStep = 4"></app-job-grid>
  </div>

  <!-- Step 4: Side Menu & Job Details -->
  <div class="wizard-step" *ngIf="currentStep === 4">
    <div class="flex flex-col md:flex-row gap-6">
      <app-side-menu class="md:w-1/3"></app-side-menu>
      <app-job-details class="md:w-2/3"></app-job-details>
    </div>
  </div>

  <!-- Navigation Buttons
  <div class="flex justify-between mt-6">
    <button class="btn btn-secondary" (click)="currentStep = currentStep - 1" [disabled]="currentStep === 1">
      Previous
    </button>
    <button class="btn btn-primary" (click)="currentStep = currentStep + 1" [disabled]="currentStep === 4">
      Next
    </button>
  </div> -->
</div>

  `,
    styles: [`
    .wizard-container {
      padding: 20px;
    }
    .flex-container {
      display: flex;
      gap: 20px;
    }
  `]
})
export class WizardComponent {
    currentStep = 1;

    onFileUploaded(jobs: Job[]) {
        this.currentStep = 2;
    }

    onQuestionnaireCompleted() {
        this.currentStep = 3;
    }
}