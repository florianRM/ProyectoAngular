import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/interfaces/category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.url}/categories`);
  }

  addCategory(category: any): Observable<Category> {
    return this.http.post<Category>(`${environment.url}/category/add`, category);
  }

  deleteCategory(id: number): Observable<any> {
    console.log(id)
    return this.http.delete(`${environment.url}/category/delete/${id}`);
  }
}
