import Component from '../core/Component.js';
import SearchHistory from './SearchHistory.js';
import SearchInput from './SearchInput.js';
import SearchResult from './SearchResult.js';
import { getSearchHistory } from '../utils/localstorage.js';
import searchHandler from '../utils/searchHandler.js';

export default class App extends Component {
  constructor({ $target, initalState }) {
    super($target, initalState);
    this.searchHistory = new SearchHistory({
      $target: document.querySelector('#search-history'),
      initalState: getSearchHistory('search-history', []),
      clickHistory: this.setEvent,
    });

    this.searchInput = new SearchInput({
      $target: document.querySelector('#search-keyword'),
      onSearch: this.setEvent,
      checkDuplication: this.searchHistory.checkDuplication,
    });

    this.searchResult = new SearchResult({
      $target: document.querySelector('#search-result'),
      initalState,
      clickMusicians: this.setEvent,
    });
  }

  setEvent = (keyword) => {
    searchHandler(
      keyword,
      this.setState.bind(this),
      this.searchResult.setErrorMessage.bind(this)
    );
  };

  setState(newState) {
    this.state = newState;
    this.searchResult.setState(newState);
  }
}
