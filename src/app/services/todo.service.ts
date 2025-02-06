import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // Make sure this matches your local API URL
  apiUrlLocal = 'http://localhost:4912/api';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Make sure to use your own token here
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODgwODMwMCwiZXhwIjoxNzM4ODk0NzAwfQ.iF1Mr7QbvvImpn_OU4FdcnlbIPaXl4-e0t__vSbRSJs`,
    }),
  };

  getTodo(): Observable<any> {
    return this.http.get(this.apiUrlLocal + '/todos');
  }

  getTodoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/todos/${id}`, this.httpOptions);
  }

  getTodoCategory(): Observable<any> {
    return this.http.get(this.apiUrlLocal + '/todo-categories');
  }

  createTodo(data: any): Observable<any> {
    return this.http.post(`${this.apiUrlLocal}/todos`, data, this.httpOptions);
  }

  updateTodo(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrlLocal}/todos/${id}`, data, this.httpOptions);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlLocal}/todos/${id}`, this.httpOptions);
  }
}
