import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../../services/todo.service';

interface TodoCategory {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  title: string;
  category: TodoCategory;
  description: string;
  progress: number;
}

@Component({
  selector: 'app-edit',
  standalone: false,
  
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})


export class EditComponent implements OnInit {
  todoId!: number;
  editForm!: UntypedFormGroup;
  categories: TodoCategory[] = [];
  isLoading = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category_id: [null, [Validators.required]],
      description: [''],
      progress: [0],
    });
  }

  ngOnInit(): void {
    // Get todo ID from route params
    this.route.params.subscribe(params => {
      this.todoId = +params['id'];  
      this.loadTodoData();
      this.loadCategories();
    });
  }

  private loadTodoData() {
    this.todoService.getTodoById(this.todoId).subscribe({
      next: (response) => {
        const todo = response.data;
        this.editForm.patchValue({
          title: todo.title,
          category_id: todo.category.id,
          description: todo.description,
          progress: todo.progress
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading todo:', error);
        this.router.navigate(['/pages/todos']);
      }
    });
  }

  private loadCategories() {
    this.todoService.getTodoCategory().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  get ef() {
    return this.editForm.controls;
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }

    this.todoService.updateTodo(this.todoId, this.editForm.value).subscribe({
      next: () => {
        this.router.navigate(['/pages/todos']);
      },
      error: (error) => {
        console.error('Error updating todo:', error);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/pages/todos']);
  }
}
