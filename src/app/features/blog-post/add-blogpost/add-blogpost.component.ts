import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  model: AddBlogPost;
  isImageSelectorVisible : boolean = false;
  categories$?: Observable<Category[]>; //CategoryDto

  imageSelectorSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService) {
    this.model = {
      title: '',    // initalized here
      shortDescription: '',// set blank
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true, // set true
      publishedDate: new Date(), // show the browser's date
      categories: []
    }
  }


  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();
     //to fetch all the categories form the database, so that we can
     // select it from there for form submission

     this.imageSelectorSubscription = this.imageService.onSelectImage()
     .subscribe({
      next: (selectedImage) => {
        this.model.featuredImageUrl = selectedImage.url;
        this.closeImageSelector();
      }
     })

  }

  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
