(() => {
    const TODO = document.querySelector('.todo');
    const BTN_TODO_SAVE = document.querySelector('.btn_save');
    const TODO_UL = document.querySelector('.todo_ul');
    const BTN_TODO_DELETE = document.querySelector('.btn_delete');

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
            const li = document.createElement('li');
            const todoValue = document.createElement('span');
            const btnDelete = document.createElement('span');
            const btnUpdate = document.createElement('span');
            li.className = 'todo_li';
            li.id = id;
            todoValue.className = 'todo_value';
            todoValue.textContent = todo;
            todoValue.id = id;
            btnDelete.addEventListener('click', deleteTodo);
            btnDelete.id = id;
            btnDelete.textContent = 'delete';
            btnDelete.className = 'btn_delete';
            // btnUpdate.addEventListener('click', updateTodo);
            // btnUpdate.className = 'btn_update';
            li.appendChild(todoValue);
            li.appendChild(btnDelete);
            // li.appendChild(btnUpdate);
            TODO_UL.appendChild(li);
        }
    }

    BTN_TODO_SAVE.addEventListener('click', () => {
        if (TODO.value === '') {
            alert('Input to do something.');
            return;
        }
        setTodoList(TODO.value);
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        writeList(TODO.value, todoList.length);
        TODO.value = '';
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
