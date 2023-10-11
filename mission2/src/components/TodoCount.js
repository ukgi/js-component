import Component from '../../core/Component.js';

export default class TodoCount extends Component {
  template() {
    return `
        <div>할일의 갯수 : ${this.props.getTodoListCount}</div>
        <div>완료한 갯수 : ${this.props.getCompletedTodos}</div>
        `;
  }
}
