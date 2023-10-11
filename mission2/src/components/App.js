import Component from '../../core/Component.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';
import { getItem } from '../../utils/localstorage.js';

export default class App extends Component {
  setup() {
    this.state = getItem('todoList', []);
  }

  template() {
    return `
    <section class='todoList' data-component='TodoList'></section>
    <section data-component='TodoCount'></section>
    <footer data-component='TodoInput'></footer>
    <button class='allDeleteTodoList'>모두삭제</button> 
    `;
  }

  mounted() {
    const {
      deleteTodo,
      addTodo,
      clickTodoTitle,
      getTodoListCount,
      getCompletedTodos,
    } = this;
    const todoList = this.target.querySelector('[data-component="TodoList"]');
    const todoCount = this.target.querySelector('[data-component="TodoCount"]');
    const todoInput = this.target.querySelector('[data-component="TodoInput"]');

    new TodoList(todoList, {
      deleteTodo: deleteTodo.bind(this),
      clickTodoTitle: clickTodoTitle.bind(this),
      todo: this.state,
    });
    new TodoInput(todoInput, { addTodo: addTodo.bind(this) });
    new TodoCount(todoCount, {
      getTodoListCount,
      getCompletedTodos,
    });
  }

  setEvent() {
    const removeAll = new CustomEvent('removeAll');
    this.target.addEventListener('click', (e) => {
      if (e.target.classList.contains('allDeleteTodoList')) {
        this.target.dispatchEvent(removeAll);
      }
    });
    this.target.addEventListener('removeAll', () => {
      this.setState([]);
    });
  }

  deleteTodo(id) {
    const todos = [...this.state];
    todos.splice(id, 1);
    this.setState(todos);
  }

  addTodo(todo) {
    this.setState([...this.state, todo]);
  }

  clickTodoTitle(id) {
    const todos = [...this.state];
    todos[id].isCompleted
      ? (todos[id].isCompleted = false)
      : (todos[id].isCompleted = true);
    this.setState(todos);
  }

  get getTodoListCount() {
    return this.state.length;
  }

  get getCompletedTodos() {
    const todos = [...this.state];
    return todos.filter(({ text, isCompleted }) => isCompleted).length;
  }
}
