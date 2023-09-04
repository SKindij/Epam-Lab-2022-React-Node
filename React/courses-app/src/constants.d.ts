interface Course {
    id:string;
    title:string;
    description:string;
    creationDate:string;
    duration:number;
    authors:string[];
}
  
interface Author {
    id:string;
    name:string;
}

export const mockedCoursesList:Course[]; 
export const mockedAuthorsList:Author[]; 

export const SEARCH_BUTTON_TEXT:string;
export const LOGOUT_BUTTON_TEXT:string;
export const ADD_BUTTON_TEXT:string;
export const SHOW_BUTTON_TEXT:string;
export const CREATE_BUTTON_TEXT:string;
export const CREATE_AUTHOR_BUTTON_TEXT:string;
export const ADD_AUTHOR_BUTTON_TEXT:string;
export const DELETE_AUTHOR_BUTTON_TEXT:string;
