import Component from '../core/Component.js';

export default class SearchInput extends Component {
  constructor({ $target, onSearch, checkDuplication }) {
    super({ $target });
    this.onSearch = onSearch;
    this.checkDuplication = checkDuplication;
  }

  setEvent() {
    let timer;
    this.$target.addEventListener('keyup', (e) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (e.target.value !== '') {
          this.onSearch(e.target.value);
          this.checkDuplication(e.target.value);
        }
      }, 500);
    });
  }
}
