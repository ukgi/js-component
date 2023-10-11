import validateData from '../utils/ValidateData.js';
import { setItem } from '../utils/localstorage.js';

export default class Component {
  state = [];
  target;
  props = {};

  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() {}

  mounted() {}

  template() {
    return '';
  }

  render() {
    this.target.innerHTML = this.template();
    this.mounted();
  }

  setEvent() {}

  setState(newState) {
    const newData = validateData(newState);
    this.state = newData;
    setItem('todoList', newData);
    this.render();
  }
}
