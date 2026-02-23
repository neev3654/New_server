const express = require("express");


const app = express();

const port = 3000;

const users = [
    { attendance: "80", uid: 108243, total_sub: 14, bonus: "20", name: "dax" },
    { attendance: "90", uid: 108343, total_sub: 14, bonus: "24", name: "dev" },
    { attendance: "60", uid: 107243, total_sub: 14, bonus: "22", name: "neev" }


];



app.get("/", (req, res) => {
    res.send("Server is running");
});



app.get("/users", (req, res) => {
    res.send(users);
});




app.get("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const user = users.find(u => u.uid === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
});

app.use(express.json());

app.post("/users", (req, res) => {

    for (let i = 0; i < req.body.length; i++) {
        const newUser = {
            uid: users.length + 1,
            name: req.body[i].name,
            attendance: req.body[i].attendance,
            total_sub: req.body[i].total_sub,
            bonus: req.body[i].bonus

        };
        users.push(newUser);
    }


    res.status(201).json({
        message: "Users added successfully!",
        allUsers: users
    });
});

app.put("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);

    let index = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].uid === userId) {
            index = i;
            break;
        }
    }

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = {
        uid: userId,
        name: req.body.name,
        attendance: req.body.attendance,
        total_sub: req.body.total_sub,
        bonus: req.body.bonus
    };

    res.status(200).json({
        message: "User replaced",
        user: users[index]
    });
});



app.delete("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const index = users.findIndex(u => u.uid === userId);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(index, 1);

    res.status(204).end();
});


app.patch("/users/:uid", (req, res) => {
    const userId = Number(req.params.uid);
    const user = users.find(u => u.uid === userId);

    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    if (req.body.name) {
        user.name = req.body.name;
    }
    if (req.body.attendance) {
        user.attendance = req.body.attendance;
    }
    if (req.body.total_sub) {
        user.total_sub = req.body.total_sub;
    }
    if (req.body.bonus) {
        user.bonus = req.body.bonus;
    }

    res.status(200).json({
        message: "user updated",
        user
    });
});

app.listen(port, () => {
    console.log("Server started on port", port);
});