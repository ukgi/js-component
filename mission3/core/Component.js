export default class Component {
  state = [];
  $target;

  constructor({ $target, initalState }) {
    this.$target = $target;
    this.state = initalState;
    this.render();
    this.setEvent();
  }

  render() {}

  setEvent() {}

  setState(newState) {
    this.state = newState;
    this.render();
  }
}
