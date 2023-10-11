import Component from '../../core/Component.js';

export default class TodoInput extends Component {
  constructor(target, props) {
    super(target, props);
    this.input = document.querySelector('input');
  }

  template() {
    return `
      <form>
        <input type='text' placeholder='오늘 할일을 입력하세요.'/>
        <button type='submit'>입력</button>
      </form>
    `;
  }

  setEvent() {
    this.target.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValue = e.target[0].value;
      this.props.addTodo({ text: inputValue, isCompleted: false });
      this.input.value = '';
      this.input.focus();
    });
  }
}
