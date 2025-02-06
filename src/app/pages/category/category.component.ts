import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

interface TodoCategory {
  id: number;
  name: string;
}

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  todoCategories: TodoCategory[] = [];

  constructor(private restApiService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.restApiService.getCategory().subscribe(
      (res) => {
        this.todoCategories = res.data;
        console.log(this.todoCategories);
      },
      (err) => {
        console.log('Error: ', err);
      }
    );
  }

  onUpdate(todoCategory: TodoCategory) {
    console.log('Update todo category:', todoCategory);
  }

  onDelete(todoCategory: TodoCategory) {
    console.log('Delete todo category:', todoCategory);
  }
}
