import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './image.service';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false}) imageUploadForm?: NgForm;
//defining a variable, which is a viewchild variable
// of the form element( in html file) and now we can use
// this variable(imageUploadForm) to clear the form
  constructor(private imageService: ImageService) {

  }
  ngOnInit(): void { // this function executes when page loads
    this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {  //console.log(response);
          this.imageUploadForm?.resetForm(); // clearing the form of
          // browsing and uploading image
          this.getImages();
        }
      });
    }
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }

}
