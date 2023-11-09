'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
const localArray = localStorage.getItem('todoData');
if(localArray !== null) {
    todoData = JSON.parse(localArray);
}

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    todoData.forEach(function(item){

        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                    '<div class="todo-buttons">' +
                        '<button class="todo-remove"></button>' +
                        '<button class="todo-complete"></button>' +
                    '</div>';
        if(item.completed){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        })

        const todoRemove = li.querySelector('.todo-remove');

        todoRemove.addEventListener('click', function(){
            const index = todoData.indexOf(item);
            if (index > -1) {
                todoData.splice(index, 1);
            }
            localStorage.setItem('todoData', JSON.stringify(todoData));
            render();
        })
    })
}

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    
    if(headerInput.value.trim() === ''){
        alert('Введите задачу')
    } else {
        todoData.push(newTodo)
        render();
        headerInput.value = '';
        localStorage.setItem('todoData', JSON.stringify(todoData));
    }
})



render();
