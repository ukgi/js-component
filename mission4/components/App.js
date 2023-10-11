import {
  addTodo,
  allDeleteTodo,
  deleteTodo,
  fetchTodoList,
  toggleTodoItem,
} from '../api/api.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

export default class App {
  constructor({ $target, initalState, username }) {
    this.$target = $target;
    this.$title = document.createElement('h1');
    this.$target.appendChild(this.$title);
    this.state = initalState;
    this.username = username;
    this.todoInput = new TodoInput({
      $target,
      onSubmit: async (todo) => {
        try {
          const statusCode = await addTodo(todo, this.username);
          if (statusCode === 200) {
            alert('성공적으로 저장되었습니다👍');
            this.getTodoList(this.username);
          }
        } catch (err) {
          alert(err.message);
        }
      },
      onAllDelete: async () => {
        if (confirm('정말로 모든 투두를 삭제하시겠습니까?')) {
          try {
            const newTodoList = await fetchTodoList(this.username);
            if (newTodoList.length === 0) {
              return alert('삭제할 목록이 없습니다.');
            }
            const statusCode = await allDeleteTodo(this.username);
            if (statusCode === 200) {
              alert('성공적으로 모두 삭제했습니다...👌');
              this.getTodoList(this.username);
            }
          } catch (err) {
            alert(err.message);
          }
        }
      },
    });
    this.todoList = new TodoList({
      $target,
      initalState: this.state,
      onTodoItemDelete: async (todoId) => {
        if (confirm('정말로 삭제하시겠습니까?')) {
          try {
            const statusCode = await deleteTodo(todoId, this.username);
            if (statusCode === 200) {
              alert('성공적으로 삭제되었습니다...👌');
              this.getTodoList(this.username);
            }
          } catch (err) {
            alert(err.message);
          }
        }
      },
      onToggle: async (todoId) => {
        try {
          const res = await toggleTodoItem(this.username, todoId);
          if (res.message.includes('updated')) this.getTodoList(this.username);
        } catch (err) {
          alert(err.message);
        }
      },
    });
    this.getTodoList(this.username);
    this.render();
  }

  async getTodoList(username) {
    try {
      this.todoList.setIsLoading(true);
      const todoList = await fetchTodoList(username);
      if (todoList) {
        this.setState(todoList);
        this.todoList.setIsLoading(false);
      }
      return todoList;
    } catch (err) {
      alert(err.message);
    }
  }

  setState(newState) {
    this.state = newState;
    this.todoList.setState(newState);
    this.render();
  }

  setUsername(newName) {
    this.username = newName;
    this.getTodoList(newName);
    this.render();
  }

  render() {
    this.$title.textContent = `${this.username}의 투두리스트입니다.`;
  }
}
