import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TodoComponent } from './todo.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [TodoComponent, EditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent,
    NgbTooltipModule,
    MatIconModule
  ],
  exports: [TodoComponent],
})
export class TodoModule {}
