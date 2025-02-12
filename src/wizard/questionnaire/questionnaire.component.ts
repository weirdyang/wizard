import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-questionnaire',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
  <form [formGroup]="questionForm" (ngSubmit)="onSubmit()" class="bg-base-100 p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4">
  <!-- Experience Level -->
  <div class="form-control">
    <label class="label text-lg font-semibold">What is your experience level?</label>
    <select formControlName="experience" class="select select-bordered w-full">
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="expert">Expert</option>
    </select>
  </div>

  <!-- Preferred Working Hours -->
  <div class="form-control">
    <label class="label text-lg font-semibold">Preferred working hours?</label>
    <input type="time" formControlName="workingHours" class="input input-bordered w-full" />
  </div>

  <!-- Task Allocation Method -->
  <div class="form-control">
    <label class="label text-lg font-semibold">Preferred task allocation method?</label>
    <select formControlName="allocation" class="select select-bordered w-full">
      <option value="fifo">First In First Out</option>
      <option value="priority">Priority Based</option>
      <option value="deadline">Deadline Based</option>
    </select>
  </div>

  <!-- Submit Button -->
  <div class="flex justify-center">
    <button type="submit" [disabled]="!questionForm.valid" class="btn btn-primary w-full">
      Continue
    </button>
  </div>
</form>

  `
})
export class QuestionnaireComponent {
    @Output() completed = new EventEmitter<void>();
    questionForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.questionForm = this.fb.group({
            experience: ['', Validators.required],
            workingHours: ['', Validators.required],
            allocation: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.questionForm.valid) {
            this.completed.emit();
        }
    }
}