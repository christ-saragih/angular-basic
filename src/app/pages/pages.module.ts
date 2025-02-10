import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoryComponent } from './category/category.component';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    TodoModule,
    MatIconModule,
    NgbTooltipModule,
    NgbModule
  ],
})
export class PagesModule {}
