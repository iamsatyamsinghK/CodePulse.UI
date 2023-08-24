import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root' // this service is available 
  //throughout the application
  // and in every component
})
export class CategoryService {

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

   //  returns observable of type Category(coming from domain model)
                                            //category.model.ts
  getAllCategories(): Observable<Category[]> { //returns an array of Category
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
  }
                                        //CategoryDto
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }                  //CategoryDto

  // take request from model of type AddCategoryRequest and returns observable
  addCategory(model: AddCategoryRequest): Observable<void> { //should 
   //have been         <Category>                  <Category>
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories?addAuth=true`, model);
  } //we don't want a return from addCategory method  this is the url it should go to     body
// this is the POST(Create) endpoint of Categories controller of API        CreateCategoryRequestDto request


  updateCategory(id: string, updateCategoryRequest: UpdateCategoryRequest) : Observable<Category> {
    return this.http.put<Category>(`${environment.apiBaseUrl}
    /api/categories/${id}?addAuth=true`, updateCategoryRequest
    //,{
      //headers: {
     // 'Authorization': this.cookieService.get('Authorization')
      //} key                      value           same as login.component.ts
    //}
    );
  }//public async Task<IActionResult> EditCategory([FromRoute] Guid id, UpdateCategoryRequestDto request)

  deleteCategory(id: string) : Observable<Category> {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`)
  }
}
