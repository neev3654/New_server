const express = require("express");

const app = express();

const port = 3000;

const users = [
  { id: 1, name: "Arjun", role: "student" },
  { id: 2, name: "Priyesha", role: "mentor" },
 
];



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

app.use(express.json());

app.post("/users", (req, res) => {
console.log(req.body)
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    role: req.body.role
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: newUser
  });
});


app.listen(port, () => {
  console.log("Server started on port",port);
});