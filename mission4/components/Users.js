import { fetchUsers } from '../api/api.js';
import { FAVORITE_USERS } from '../constants/constants.js';
import * as localstorage from '../localstorage.js';

export default class Users {
  constructor({ $target, initalState, onShowUserTodos }) {
    this.state = initalState;
    this.onShowUserTodos = onShowUserTodos;
    this.favoriteUsers = localstorage.getItem(FAVORITE_USERS, []);
    this.$target = $target;
    this.$element = document.createElement('div');
    this.$users = document.createElement('div');
    this.$checkBox = document.createElement('div');
    this.$checkBox.innerHTML = `
    <input style='margin-top: 120px' type="checkbox" id="favoriteUsers" name="favoriteUsers"/>
    <label for="favoriteUsers">즐겨찾기 목록</label>
    `;
    this.$element.appendChild(this.$checkBox);
    this.$element.appendChild(this.$users);
    this.$target.appendChild(this.$element);
    this.fetchUsers();
    this.setEvent();
  }

  async fetchUsers() {
    try {
      const fetchData = await fetchUsers();
      const userData = fetchData.map((username, i) => ({
        username,
        userId: i,
        isFavorite: false,
      }));
      this.setState(userData);
    } catch (err) {
      alert(err.message);
    }
  }

  setState(newState) {
    this.state = newState;
    this.render();
  }

  render() {
    const htmlString = `
    <p>유저목록</p>
    <ul class='user_list'>
    ${this.state
      .map(
        (user) =>
          `<li class='user_name'>${user.username}</li>${
            user.isFavorite
              ? ``
              : `<button data-user_id="${user.userId}">즐겨찾기</button>`
          }`
      )
      .join('')}
    </ul>
    `;
    this.$users.innerHTML = htmlString;
  }

  setEvent() {
    this.$element.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        const clickedUser = this.state.find(
          (user) => user.userId === Number(e.target.dataset.user_id)
        );
        const favoriteUser = { ...clickedUser, isFavorite: true };
        this.favoriteUsers.push(favoriteUser);
        localstorage.setItem(FAVORITE_USERS, this.favoriteUsers);
      }

      if (e.target.nodeName === 'INPUT') {
        if (e.target.checked) {
          this.setState(this.favoriteUsers);
        } else {
          this.fetchUsers();
        }
      }

      const $user = e.target.closest('.user_name');
      if ($user) {
        this.onShowUserTodos($user.textContent);
      }
    });
  }
}
