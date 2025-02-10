import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  selectedTodoCategory: TodoCategory | null = null;
  todoCategories: TodoCategory[] = [];
  addForm!: UntypedFormGroup;
  updateForm!: UntypedFormGroup;

  constructor(
    private restApiService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
  ) {}

  ngOnInit(): void {
    this.getCategories();

    this.addForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });

    this.updateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
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

  get af() {
    return this.addForm.controls;
  }

  get uf() {
    return this.updateForm.controls;
  }

  onSubmit() {
    if (this.addForm.invalid) {
      console.log('Form invalid:', this.addForm.errors);
      return;
    }

    this.restApiService.createTodoCategory(this.addForm.value).subscribe({
      next: (response) => {
        this.modalService.dismissAll();
        this.getCategories();
        this.addForm.reset();
      },
      error: (error) => {
        console.error('Error creating todo category:', error);
      },
    });
  }

  onUpdate() {
    if (this.updateForm.invalid || !this.selectedTodoCategory) {
      console.log('Form invalid: ', this.updateForm.errors);
      return;
    }

    const updateData = {
      name: this.updateForm.value.name,
    };

    this.restApiService
      .updateTodoCategory(updateData, this.selectedTodoCategory.id)
      .subscribe({
        next: (response) => {
          this.modalService.dismissAll();
          this.getCategories();
          this.selectedTodoCategory = null;
        },
        error: (error) => {
          console.log('Error updating todo category: ', error);
        },
      });
  }

  onDelete() {
    if (!this.selectedTodoCategory) return;

    this.restApiService
      .deleteTodoCategory(this.selectedTodoCategory.id)
      .subscribe({
        next: (response) => {
          this.modalService.dismissAll();
          this.getCategories();
          this.selectedTodoCategory = null;
        },
        error: (error) => {
          console.error('Error deleting todo category:', error);
        },
      });
  }

  openModal(content: any) {
    this.modalService.open(content, {
      size: 'md',
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }

  openModalUpdate(content: any, todoCategory: TodoCategory) {
    this.selectedTodoCategory = todoCategory;
    this.updateForm.patchValue({
      name: todoCategory.name,
    });
    this.modalService.open(content, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }

  openModalDelete(content: any, todoCategory: TodoCategory) {
    this.selectedTodoCategory = todoCategory;
    this.modalService.open(content, {
      centered: true,
      scrollable: true,
      backdrop: 'static',
    });
  }
}
