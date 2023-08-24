import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})                                 // lifecycle hooks
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest; 
  private addCategorySubscribtion?: Subscription;// for
                                    // subscription and unsubscription

   // injecting the category service       type
  constructor(private categoryService: CategoryService,
    private router: Router) {
    this.model = {    // initialized the model that we have over here  
      name: '', // if we write Satyam over here, 
                 //it will display that on the input block by default
      urlHandle: ''
    };
  }


  onFormSubmit() { // using the service here, after injecting  
    this.addCategorySubscribtion = this.categoryService.addCategory(this.model)
    .subscribe({                          //       passing the model
      next: (response) => {//when this call gets executed successfully,
        // then do this
        this.router.navigateByUrl('/admin/categories'); // it will 
        // redirect to category-list page, whenever we have a success
        //response from the addCategory(), basically when the category
        //gets added.
      }
    })
  }

  ngOnDestroy(): void { 
    this.addCategorySubscribtion?.unsubscribe();
    // want to unsubscribe when we destory this component
  }

}
