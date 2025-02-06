import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from '../../services/todo.service';
import { Router } from '@angular/router';

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
  selector: 'app-todo',
  standalone: false,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  selectedTodo: Todo | null = null;
  todos: Todo[] = [];
  categories: TodoCategory[] = [];

  constructor(
    private restApiService: TodoService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTodos();
    this.getTodoCategories();

    this.addForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      category_id: [null, [Validators.required]],
      description: [null],
      progress: [0],
    });
  }

  private getTodos() {
    this.restApiService.getTodo().subscribe(
      (res) => {
        this.todos = res.data;
        console.log(this.todos);
      },
      (err) => {
        console.log('Error: ', err);
      }
    );
  }

  private getTodoCategories() {
    this.restApiService.getTodoCategory().subscribe(
      (res) => {
        this.categories = res.data; // Simpan data kategori
        console.log('Categories:', this.categories);
      },
      (err) => {
        console.log('Error fetching categories:', err);
      }
    );
  }

  openModal(content: any) {
    this.modalService.open(content, {
      size: 'lg',
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }

  addForm!: UntypedFormGroup;
  get af() {
    return this.addForm.controls;
  }

  onSubmit() {
    console.log('On submit');

    if (this.addForm.invalid) {
      console.log('Form invalid:', this.addForm.errors);
      return;
    }

    this.restApiService.createTodo(this.addForm.value).subscribe({
      next: (response) => {
        console.log('Todo created successfully:', response);
        this.modalService.dismissAll();
        this.getTodos(); // Panggil getTodos() langsung, bukan ngOnInit()
        this.addForm.reset(); // Reset form setelah submit berhasil
      },
      error: (error) => {
        console.error('Error creating todo:', error);
        // Di sini bisa ditambahkan logic untuk menampilkan pesan error ke user
      },
    });
  }

  onUpdate(todo: Todo) {
    this.router.navigate(['/pages/todos/edit', todo.id]);
  }

  openDeleteModal(content: any, todo: Todo) {
    this.selectedTodo = todo;
    this.modalService.open(content, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }

  onDelete() {
    if (!this.selectedTodo) return;

    this.restApiService.deleteTodo(this.selectedTodo.id).subscribe({
      next: () => {
        this.modalService.dismissAll();
        this.getTodos(); // Refresh the list
        this.selectedTodo = null;
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
        // Here you could add error handling, like showing a toast notification
      },
    });
  }
}
