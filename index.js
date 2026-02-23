const express = require("express");

const cors = require("cors");

const app = express();

const port = 3000;

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
 
];


app.use(express.json());

app.use(cors);


app.get("/", (req, res) => {
  res.send("Server is running");
});



app.get("/users", (req, res) => {
  res.send(users);
});




app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});



app.post("/users", (req, res) => {

  for(let i=0; i<req.body.length; i++){
    const newUser = {
      id: users.length + 1,
      name: req.body[i].name,
      role: req.body[i].role
    };
    users.push(newUser);
  }

 
  res.status(201).json({
    message: "Users added successfully!",
    allUsers: users
  });
});

app.put("/users/:id", (req, res) => {
  const userId = Number(req.params.id);

  let index = -1;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === userId) {
      index = i;
      break;
    }
  }

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: userId,
    name: req.body.name,
    role: req.body.role,
    age: req.body.age
  };

  res.status(200).json({
    message: "User replaced",
    user: users[index]
  });
});


app.listen(port, () => {
  console.log("Server started on port",port);
});