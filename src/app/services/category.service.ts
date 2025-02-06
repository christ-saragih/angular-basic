import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrlLocal = 'http://localhost:4912/api';
  constructor(private http: HttpClient) {}

  getCategory(): Observable<any> {
    return this.http.get(this.apiUrlLocal + '/todo-categories');
  }
}
