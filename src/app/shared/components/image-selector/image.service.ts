import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '', //  behaviour subject emit multiple value from observable
    fileExtenstion: '',
    fileName: '',
    title: '',
    url: ''
  });

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(`${environment.apiBaseUrl}/api/images`);
  }


  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file); // key name matches API request object
    //                key    value
    //public async Task<IActionResult> UploadImage([FromForm] IFormFile file,
    //[FromForm] string fileName, [FromForm] string title)
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(`${environment.apiBaseUrl}/api/images`, formData);
  }

  selectImage(image: BlogImage): void {// to select image
    // from lhs box, which appears as page loads,
    // and that image and it's url gets filled in the
    // edit blogpost form page
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> { //this is the method 
    //which other components like
    // add or edit(blogpost)will subscribe to
    return this.selectedImage.asObservable()
  }

}
