import './index.css';
(() => {
    const TODO = document.querySelector('.todo');
    const BTN_TODO_SAVE = document.querySelector('.btn_save');
    const TODO_UL = document.querySelector('.todo_ul');
    const BTN_TODO_DELETE = document.querySelector('.btn_delete');
    const DUE_DATE = document.querySelector('.due_date');

    init();
    function init() {
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        let list = '';
        if (todoList) {
            todoList.forEach((todo, idx) => {
                // list += `<li class="todo_li" id="${idx}"><span class="todo_value">${todo}</span><span class="btn_delete">삭제</span></li>`;
                // TODO_UL.innerHTML = list;
                writeList(todo, idx);
            });
        }
    }

    function writeList(todo, id) {
        if (todo) {
            console.log(todo);
            const li = document.createElement('li');
            const headerDiv = document.createElement('div');
            const contentDiv = document.createElement('div');
            const todoValue = document.createElement('span');
            const dueDate = document.createElement('span');
            const btnDelete = document.createElement('span');
            const btnUpdate = document.createElement('span');
            headerDiv.className = 'headerDiv';
            contentDiv.className = 'contentDiv';
            li.className = 'todo_li';
            li.id = id;
            todoValue.className = 'todo_value';
            todoValue.textContent = todo.todo;
            dueDate.textContent = todo.due_date;
            dueDate.className = 'todo_value';
            btnDelete.addEventListener('click', deleteTodo);
            btnDelete.id = id;
            btnDelete.textContent = 'delete';
            btnDelete.className = 'btn_delete';
            headerDiv.appendChild(dueDate);
            headerDiv.appendChild(btnDelete);
            contentDiv.appendChild(todoValue);
            li.appendChild(headerDiv);
            li.appendChild(contentDiv);
            TODO_UL.appendChild(li);
        }
    }

    BTN_TODO_SAVE.addEventListener('click', () => {
        const saveTodoData = {};
        if (TODO.value === '') {
            alert('Input to do something.');
            return;
        } else {
            saveTodoData.todo = TODO.value;
        }

        if (DUE_DATE.value === '') {
            saveTodoData.due_date = 'No due date';
        } else {
            saveTodoData.due_date = DUE_DATE.value;
        }

        setTodoList(saveTodoData);
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        writeList(saveTodoData, todoList.length);
        TODO.value = '';
        DUE_DATE.value = '';
    });

    function setTodoList(todo) {
        let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        todoList.push(todo);
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }

    function deleteTodo(id) {
        const deleteId = id.target.id;
        let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
        todoList.splice(id, 1);
        localStorage.setItem('todoList', JSON.stringify(todoList));
        const li = document.getElementById(deleteId);
        li.remove();
    }
})();
