#### React Home Task 1 

## Components, state and props
> _The main goal of this task is to create app skeleton - set of some simple components for the app._

**Project structure requirements:**
+  You should use functions components for your app.
+   App.jsx - main app file.
+   Create folders and jsx files for each component.
+   You can use any way to add styles to components

```
src
 |-- App.jsx
 |-- App.css
 |
 |-- components
 |   |-- Header
 |   |   |__ Header.jsx
 |   |   |
 |   |   |__ components
 |   |       |__ Logo
 |   |           |__ Logo.jsx
 |   |
 |   |-- CreateCourse
 |   |   |__ CreateCourse.jsx
 |   | 
 |   |-- Courses
 |   |   |-- Courses.jsx
 |   |   |
 |   |   |__ components
 |   |       |-- SearchBar
 |   |       |   |__ SearchBar.jsx
 |   |       |
 |   |       |__ CourseCard
 |   |           |__ CourseCard.jsx
 |   |
 |   |__ // any components you want to add 
 |
 |-- common
 |   |--Button
 |   |  |__ Button.jsx
 |   | 
 |   |__Input
 |   |  |__ Input.jsx 
 |   |
 |   |__ //any common components you want to add
 | 
 |-- helpers
 |   |
 |   |--pipeDuration.js // to format course duration 
 |   |
 |   |-- dateGeneratop.js // to get current date in correct format 
 |   |
 |   |__ // any helpers you want to add
 |
 |-- constants.js // file with mocked data
 |
 |_ ...

```

CourseCard component should contain the following information:
+ Title (Course name);
2. Duration (format: hh:mm + 'hours');
3. Creation date;
4. Description;
5. Show course button;
6. Authors list


Courses component should include:
+ SearchBar component.
+ CourseCard component.
+ Add new course button.


Add functionality for searching courses:
- User should have ability to search course by title and id;
- The search is performed by the occurrence of characters in the string;
- Case-insensitive search;
- When user clicks on Search button it displays all courses that match the search query;
- All courses are displayed when user cleans search field.
