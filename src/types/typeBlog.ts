export type BlogViewModelT = {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
};

export type BlogInputModelT = {
    name: string;
    description: string;
    websiteUrl: string;
  };
  


  
export type dbBl = {
  dbBlogs:BlogViewModelT[]
}