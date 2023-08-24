import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;

  constructor(private categoryService: CategoryService) {
  }                  //export class CategoryService {.. from service.ts


  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  } // calling the getAllCategories() in the service folder,
    //which will fetch data from API
}
