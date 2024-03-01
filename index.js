const express = require("express");
const app = express();
const fs = require("fs/promises");

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

const TODOS_FILE_PATH = "todos.json";

async function readTodos() {
  try {
    const data = await fs.readFile(TODOS_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeTodos(todos) {
  await fs.writeFile(TODOS_FILE_PATH, JSON.stringify(todos, null, 2), "utf-8");
}

async function deleteTodos(index) {
  const todos = await readTodos();
  todos.splice(index, 1);
  await writeTodos(todos);
}

app.get("/", async (_, res) => {
  const todos = await readTodos();
  res.render("index.ejs", { todos: todos });
});

app.post("/", async (req, res) => {
  const todos = await readTodos();
  todos.push(req.body);
  await writeTodos(todos);
  res.redirect("/");
});

app.delete("/:index", async (req, _) => {
  await deleteTodos(req.params.index);
});

app.listen(3000, () => {
  console.log("Application started on port 3000...");
});
