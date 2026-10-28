
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

type Filter = "all" | "active" | "completed";

let todos: Todo[] = [];
let nextId = 1;
let currentFilter: Filter = "all";


const form = document.getElementById("todo-form") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const list = document.getElementById("todo-list") as HTMLUListElement;
const itemsLeft = document.getElementById("items-left") as HTMLSpanElement;
const filters = document.querySelectorAll<HTMLButtonElement>(".filter");
const clearCompleted = document.getElementById("clear-completed") as HTMLButtonElement;
const clearAll = document.getElementById("clear-all") as HTMLButtonElement;

// Display tasks
function renderTodos(): void {
    list.innerHTML = "";

    let visibleTodos = todos;

    if (currentFilter === "active") {
        visibleTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === "completed") {
        visibleTodos = todos.filter(todo => todo.completed);
    }

    
    if (visibleTodos.length === 0) {
        const message = document.createElement("li");
        message.className = "empty-state";
        message.textContent = "No tasks to show.";
        list.appendChild(message);
    }

    for (let todo of visibleTodos) {
        const item = document.createElement("li");
        item.className = "todo-item";

        if (todo.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener("change", () => {
            todo.completed = checkbox.checked;
            renderTodos();
        });

        const text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;

        
        text.addEventListener("dblclick", () => {
            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = todo.text;

            item.replaceChild(editInput, text);
            editInput.focus();

            editInput.addEventListener("keydown", event => {
                if (event.key === "Enter") {
                    if (editInput.value.trim() !== "") {
                        todo.text = editInput.value.trim();
                    }

                    renderTodos();
                }
            });
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "X";

        deleteButton.addEventListener("click", () => {
            todos = todos.filter(task => task.id !== todo.id);
            renderTodos();
        });

        item.appendChild(checkbox);
        item.appendChild(text);
        item.appendChild(deleteButton);
        list.appendChild(item);
    }

   

    
    let count = 0;

    for (let todo of todos) {
        if (!todo.completed) {
            count++;
        }
    }

    itemsLeft.textContent = count + " items left";

    
    filters.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.filter === currentFilter
        );
    });
}

// Add a new task
form.addEventListener("submit", event => {
    event.preventDefault();

    if (input.value.trim() === "") {
        return;
    }

    todos.push({
        id: nextId,
        text: input.value.trim(),
        completed: false
    });

    nextId++;
    input.value = "";
    currentFilter = "all";
    renderTodos();
});

// Change filters
filters.forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.filter === "all") {
            currentFilter = "all";
        } else if (button.dataset.filter === "active") {
            currentFilter = "active";
        } else if (button.dataset.filter === "completed") {
            currentFilter = "completed";
        }

        renderTodos();
    });
});

// Clear completed tasks
clearCompleted.addEventListener("click", () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
});

// Clear all tasks
clearAll.addEventListener("click", () => {
    todos = [];
    renderTodos();
});


renderTodos();
