// creates the server and the port it runs on
const express = require("express"),
       app = express(),
       port = process.env.PORT || 8080,
       cors = require("cors");
const bodyParser = require('body-parser');
const fs = require("fs").promises;


// sets up the express application + returns a message once the application is running
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.listen(port, () => console.log("Backend server live on " + port));


// returns a message once a *get* request is made to the specifed route
app.get("/", (req, res) => {
    res.send({ message: "Connected to Backend server!" });
});


// makes a request to the add item function once a post request to the specified route is made
app.post("/add/item", addItem)


// This snippet of code takes in a request body from the Todo List Application which represents a todo item. 
// The body is then converted into a new json object called newTask to represent the new todo item. 
// The new json object is finally appended to a json list located in a file called database.json to represent our todos list.
async function addItem (request, response) {
    try {
        // Converting Javascript object (Task Item) to a JSON string
        const id = request.body.jsonObject.id
        const task = request.body.jsonObject.task
        const curDate = request.body.jsonObject.currentDate
        const dueDate = request.body.jsonObject.dueDate
        const newTask = {
          ID: id,
          Task: task,
          Current_date: curDate,
          Due_date: dueDate
        }

        const data = await fs.readFile("database.json");
        const json = JSON.parse(data);
        json.push(newTask);
        await fs.writeFile("database.json", JSON.stringify(json))
        console.log('Successfully wrote to file') 
        response.sendStatus(200)
    } catch (err) {
        console.log("error: ", err)
        response.sendStatus(500)
    }
}