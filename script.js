var todoButtons = {
    todos: [],
    addTodo: function () {
        if (event.keyCode === 13) {
            var addTodoTextInput = document.getElementById('addTodoTextInput');
            this.todos.push({
                todoText: addTodoTextInput.value,
                completed: false
            });
            addTodoTextInput.value = '';
            todoView.displayTodos();
        }
    },
    changeTodo: function (position, inputValue) {
        this.todos[position].todoText = inputValue;
        todoView.displayTodos();
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
        todoView.displayTodos();
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        todoView.displayTodos();
    },
    toggleAll: function () {
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Checks for a number of completed todos
        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function (todo) {
            // If all todos are true, they will be changed to false
            if (completedTodos === totalTodos) {
                todo.completed = false;
            }
            // Otherwise, they will be changed to true
            else {
                todo.completed = true;
            }
        });
        todoView.displayTodos();
    },
    deleteAll: function () {
        this.todos.splice(0, this.todos.length);
        todoView.displayTodos();
    }
};

var todoView = {
    displayTodos: function () {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';

        todoButtons.todos.forEach(function (todo, position) {
            // Creating li element for every new todo
            var todoLi = document.createElement('li');
            todoLi.id = position;
            // Creating input element for every new todo
            var todoLiText = document.createElement('input');
            todoLiText.type = "text";
            todoLiText.disabled = true;
            todoLiText.id = 'editTodoInput';
            todoLiText.value = todo.todoText;

            // Setting text content for the todoLiText
            if (todo.completed === true) {
                todoLi.style.opacity = "0.4";
                todoLiText.style.textDecoration = "line-through";
                todoLiText.textContent = todo.todoText;
            }
            else {
                todoLiText.textContent = todo.todoText;
            }
            // Adding buttons and input to the li element
            todoLi.appendChild(todoView.createDeleteButton());
            todoLi.appendChild(todoView.createToggleButton());
            todoLi.appendChild(todoView.createEditButton());
            todoLi.appendChild(todoLiText);
            // Adding li element to the unordered list
            todosUl.appendChild(todoLi);
        });
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    createToggleButton: function () {
        var toggleButton = document.createElement('button');
        toggleButton.textContent = 'Toggle';
        toggleButton.className = 'toggleButton';
        return toggleButton;
    },
    createEditButton: function () {
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'editButton';
        return editButton;
    },
    setUpEventListeners: function () {
        var todosUl = document.querySelector('ul');
        todosUl.addEventListener('click', function (event) {
            var position = event.target.parentNode.id;
            var elementClicked = event.target.className;

            if (elementClicked === 'deleteButton') {
                // Path to the ID of each created todo
                todoButtons.deleteTodo(parseInt(position));
            }
        });
        todosUl.addEventListener('click', function (event) {
            var position = event.target.parentNode.id;
            var elementClicked = event.target.className;

            if (elementClicked === 'toggleButton') {
                todoButtons.toggleCompleted(parseInt(position));
            }
        });
        todosUl.addEventListener('click', function (event) {
            var position = event.target.parentNode.id;
            var elementClicked = event.target.className;

            if (elementClicked === 'editButton') {
                var input = document.getElementById(position).querySelector('input');
                input.disabled = false;
                input.select();

                // Saving edited todo when Enter is pressed
                input.addEventListener('keypress', function (event) {
                    if (event.keyCode === 13) {
                        var inputValue = input.value;
                        input.disabled = true;
                        todoButtons.changeTodo(position, inputValue);
                    }
                });
            }
        });
    }
};
todoView.setUpEventListeners();