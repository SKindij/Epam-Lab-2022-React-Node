

### 📚 The project structure (architecture):

```go
📁 Notes-App/
│
├─ .env
├─ .eslintrc.json
├─ .gitignore
├─ package.json
│
├─ 📁 src/
│   ├─ index.js
│   │
│   ├─ authRouter.js
│   ├─ usersRouter.js
│   ├─ notesRouter.js
│   │
│   ├─ authService.js
│   ├─ usersService.js
│   ├─ notesService.js
│   │
│   ├─ 📁 models/
│   │   ├─ Users.js
│   │   └─ Notes.js
│   │
│   └─ 📁 middleware/
│      └─ authMiddleware.js
│
└─ 📁 frontend/
   ├─ index.html
   ├─ style.css
   └─ app.js
```    
