import Component from '../../core/Component.js';

export default class TodoList extends Component {
  constructor(target, props) {
    super(target, props);
  }

  template() {
    const { todo } = this.props;
    return todo
      .map(
        ({ text, isCompleted }, i) =>
          `<div class='todoItem'><p class='todoTitle' data-id=${i}>${
            isCompleted ? `<s data-id=${i}>${text}</s>` : `${text}`
          }</p><button class='deleteBtn' data-id=${i}>삭제</button></div>`
      )
      .join('');
  }

  setEvent() {
    this.target.addEventListener('click', (e) => {
      if (e.target.classList.contains('deleteBtn')) {
        this.props.deleteTodo(e.target.dataset.id);
      }
      if (
        e.target.classList.contains('todoTitle') ||
        e.target.nodeName === 'S'
      ) {
        this.props.clickTodoTitle(e.target.dataset.id);
      }
    });
  }
}
