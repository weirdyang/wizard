import { Component } from '@angular/core';
import { WizardComponent } from '../wizard/wizard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WizardComponent],
  template: `
    <app-wizard></app-wizard>
  `
})
export class AppComponent { }