// grab all the todos by class
const todos = document.querySelectorAll(".todo input");
// add a click event to each of them
todos.forEach((todo, index) => {
  todo.addEventListener("click", () => {
    todo.parentNode.style.textDecoration = "line-through";
    todo.parentNode.classList.add("completed");
    // send a DELETE request to the server
    fetch(`/${index}`, {
      method: "DELETE",
    });

    setTimeout(() => {
      todo.parentNode.remove();
    }, 1000);
  });
});
