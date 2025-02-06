import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoryComponent } from './category/category.component';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTableModule,
    TodoModule,
  ],
})
export class PagesModule {}
