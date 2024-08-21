document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    // Function to create a new todo item
    function createTodoItem(text, id) {
        const li = document.createElement('li');
        li.setAttribute('data-id', id);

        // Create a text span
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        li.appendChild(textSpan);

        // Create Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => {
            const newText = prompt('Edit todo:', text);
            if (newText !== null && newText.trim() !== '') {
                textSpan.textContent = newText;
                updateTodoInStorage(id, newText);
            }
        });
        li.appendChild(editButton);

        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            deleteTodoFromStorage(id);
        });
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    }

    // Add todo when the Add button is clicked
    addButton.addEventListener('click', () => {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const id = Date.now(); // Unique ID based on timestamp
            createTodoItem(todoText, id);
            saveTodoToStorage(todoText, id);
            todoInput.value = ''; // Clear input field
        }
    });

    // Add todo when Enter key is pressed
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    // Save a new todo to local storage
    function saveTodoToStorage(text, id) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text, id });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Update a todo in local storage
    function updateTodoInStorage(id, newText) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const index = todos.findIndex(todo => todo.id === id);
        if (index > -1) {
            todos[index].text = newText;
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }

    // Delete a todo from local storage
    function deleteTodoFromStorage(id) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Load todos from local storage on page load
    function loadTodosFromStorage() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            createTodoItem(todo.text, todo.id);
        });
    }

    loadTodosFromStorage();
});
