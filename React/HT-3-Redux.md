#### React Home Task 3

## State management, Redux
> _In this assignment, you should continue to work on your project with a slight modification._\
> _This module is designed to teach how to work with state management in React and what is Redux._

* Firstly, you need to install the Redux and React-redux modules in your project using npm:
  + `npm i redux react-redux --save`
* Create new folders for redux where put the code for redux `src/store`.
* Create new file services.js.

#### Project structure
```
src
 |-- store
 | |-- index.js // Add store creation, root reducer
 | |
 | |-- user
 | | |-- reducer.js // Code with reducer for user
 | | |-- actionCreators.js // Code with actions
 | | |__ actionTypes.js // Code with action types
 | |
 | |-- courses
 | | |-- reducer.js // Code with reducer for courses
 | | |-- actionCreators.js // Code with actions
 | | |__ actionTypes.js // Code with action types
 | |
 | |__ authors
 | |-- reducer.js // Code with reducer for user
 | |-- actionCreators.js // Code with actions
 | |__ actionTypes.js // Code with action types
 | 
 |-- servisces.js
 |
 |__ ...
```

### App component
- Use combineReducers function to create rootReducer. Use createStore function to create store.
- Import store to the index.js.
- Wrap App component in the "Provider"
- Pass store to the Provider.














