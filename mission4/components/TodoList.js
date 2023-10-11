import { DELETE_BUTTON_TEXT } from '../constants/constants.js';

export default class TodoList {
  constructor({ $target, initalState, onTodoItemDelete, onToggle }) {
    this.$target = $target;
    this.state = initalState;
    this.isLoading;
    this.onTodoItemDelete = onTodoItemDelete;
    this.onToggle = onToggle;

    this.$element = document.createElement('ul');
    this.$element.setAttribute('class', 'todo_list');
    this.$target.appendChild(this.$element);
    this.render();
    this.setEvent();
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    let htmlString;
    if (this.isLoading) {
      htmlString = '로딩중...';
    } else {
      htmlString =
        this.state.length === 0
          ? `<p>투두가 등록되어있지 않습니다❌</p>`
          : `${this.state
              .map(
                ({ content, isCompleted, _id }) =>
                  `<li class='todo_item' data-todo_id='${_id}'>${
                    isCompleted ? `<s>${content}</s>` : `${content}`
                  }<button data-todo_id='${_id}' type='button'>${DELETE_BUTTON_TEXT}</button></li>`
              )
              .join('')}`;
    }
    this.$element.innerHTML = htmlString;
  }

  setEvent() {
    this.$element.addEventListener('click', (e) => {
      if (
        e.target.innerText === DELETE_BUTTON_TEXT &&
        e.target.dataset.todo_id
      ) {
        const todoId = e.target.dataset.todo_id;
        this.onTodoItemDelete(todoId);
      }

      if (e.target.nodeName === 'LI' || e.target.nodeName === 'S') {
        const $item = e.target.closest('.todo_item');
        this.onToggle($item.dataset.todo_id);
      }
    });
  }

  setIsLoading(newState) {
    this.isLoading = newState;
    this.render();
  }
}
