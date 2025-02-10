import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrlLocal = 'http://localhost:4912/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczOTE1MjE3MCwiZXhwIjoxNzM5MjM4NTcwfQ.80LvFGKcUIQNFdQHK6AVrNrBo9VnbMXZoaWALGSiVgk`,
    }),
  };

  constructor(private http: HttpClient) {}

  getCategory(): Observable<any> {
    return this.http.get(this.apiUrlLocal + '/todo-categories');
  }

  createTodoCategory(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrlLocal}/todo-categories`,
      data,
      this.httpOptions
    );
  }

  updateTodoCategory(data: any, id: number): Observable<any> {
    return this.http.put(
      `${this.apiUrlLocal}/todo-categories/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteTodoCategory(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrlLocal}/todo-categories/${id}`,
      this.httpOptions
    );
  }
}
