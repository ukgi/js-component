import Component from '../core/Component.js';
import { setSearchHistory } from '../utils/localstorage.js';

const MAX_HISTORIES_LENGTH = 5;

export default class SearchHistory extends Component {
  constructor({ $target, initalState, clickHistory }) {
    super({ $target, initalState });
    this.clickHistory = clickHistory;
  }
  checkDuplication = (newData) => {
    if (this.state.find((data) => data === newData)) {
      return this.state;
    }

    if (
      this.state.length === MAX_HISTORIES_LENGTH &&
      !this.state.find((data) => data === newData)
    ) {
      this.shiftHistory();
    }

    this.setState([...this.state, newData]);
  };

  render() {
    this.$target.innerHTML = `
    ${
      this.state.length !== 0
        ? this.state
            .map(
              (keyword, i) =>
                `<li class='searchHistoryItem' data-id=${i}>${keyword}</li>`
            )
            .join('')
        : `<p>검색기록이 없습니다.</p>`
    }
    `;
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.dataset.id) {
        const searchData = e.target.textContent;
        this.clickHistory(searchData);
      }
    });
  }

  shiftHistory() {
    this.setState(this.state.slice(1));
  }

  setState(newState) {
    this.state = newState;
    setSearchHistory('search-history', newState);
    this.render();
  }
}
