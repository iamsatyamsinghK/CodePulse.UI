export interface AddBlogPost {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  author: string;
  publishedDate: Date;
  isVisible: boolean;
  categories: string[]; // to capture the categories 
  //after it get showed in dropdown menu, guid type
}//CreateBlogPost([FromBody] CreateBlogPostRequestDto request)


// public string Title { get; set; }
//  public string ShortDescription { get; set; }
//  public string Content { get; set; }
//  public string FeaturedImageUrl { get; set; }
//  public string UrlHandle { get; set; }
//  public DateTime PublishedDate { get; set; }
//  public string Author { get; set; }
//  public bool IsVisible { get; set; }

//  public Guid[] Categories { get; set; }