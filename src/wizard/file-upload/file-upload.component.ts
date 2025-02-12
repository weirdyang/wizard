import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { JobService } from '../services/job.service';
import { Job } from '../models/job.model';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    imports: [CommonModule],
    template: `
<div class="upload-container flex flex-col items-center justify-center p-6 border-2 border-dashed border-primary rounded-lg bg-base-100 shadow-md">
  <input type="file"
         (change)="onFileChange($event)"
         accept=".xlsx,.xls"
         class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
  <p class="mt-4 text-sm text-gray-500 text-center">
    Upload Excel file with columns: <br>
    <span class="font-semibold">Job Name, Priority, Instructions, Due Date</span>
  </p>
</div>

  `
})
export class FileUploadComponent {
    @Output() fileUploaded = new EventEmitter<Job[]>();

    constructor(private jobService: JobService) { }

    onFileChange(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e: any) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

            // Configure date parsing
            const options = { raw: false, dateNF: 'yyyy-mm-dd' };
            const rawData = XLSX.utils.sheet_to_json(firstSheet, options) as Job[];

            // Process the data and ensure proper date parsing
            const jobs: Job[] = rawData.map(row => {
                // Assuming the date is in the format "YYYY-MM-DD" or Excel date number
                row = row as Job;
                let dueDate: Date;
                if (row.dueDate) {
                    // Try parsing various date formats
                    if (row.dueDate instanceof Date) {
                        dueDate = row.dueDate;
                    } else if (typeof row.dueDate === 'number') {
                        // Handle Excel number date format
                        dueDate = new Date((row.dueDate - 25569) * 86400 * 1000);
                    } else {
                        // Try parsing string date
                        dueDate = new Date(row.dueDate);
                    }
                } else {
                    dueDate = new Date(); // Default to current date if no date provided
                }
                console.log(row);
                return {
                    jobName: row.jobName || '',
                    priority: row.priority || 'Medium',
                    instructions: row.instructions || '',
                    dueDate: dueDate,
                    status: 'idle' as const
                };
            });

            this.jobService.setJobs(jobs);
            this.fileUploaded.emit(jobs);
        };

        reader.readAsBinaryString(file);
    }
}
