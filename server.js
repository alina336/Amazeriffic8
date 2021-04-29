var express = require('express'), 
    http = require("http"),
	// импорт представления ToDoController
	ToDosController = require("./controllers/todos_controller.js"),
	UsersController = require("./controllers/users_controller.js"),
    // импортируем библиотеку mongoose
    mongoose = require("mongoose"),
    app = express();

app.use(express.static(__dirname + "/client")); 
app.use(express.urlencoded());

// начинаем слушать запросы
http.createServer(app).listen(3000);

app.use('/',express.static(__dirname + "/client"));
app.use('/user/:username',express.static(__dirname + "/client"));

// командуем Express принять поступающие объекты JSON
app.use(express.urlencoded({ extended: true }));

// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true 
}).then(res => {
	console.log("DB Connected!")
}).catch(err => {
	console.log(Error, err.message);
});

app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show); 
app.post("/todos", ToDosController.create);

app.get("/user/:username/todos.json", ToDosController.index);
app.post("/user/:username/todos", ToDosController.create);
// app.put("/user/:username/todos/:id", ToDosController.update);
app.delete("/user/:username/todos/:id", ToDosController.destroy);