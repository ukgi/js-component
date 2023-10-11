import Component from '../core/Component.js';

export default class SearchResult extends Component {
  constructor({ $target, initalState, clickMusicians }) {
    super({ $target, initalState });
    this.clickMusicians = clickMusicians;
  }

  render() {
    this.$target.innerHTML = `
        ${
          this.state.length !== 0
            ? this.state
                .map(
                  (data) =>
                    `<div style="display: inline-block; width: 33%">
                      <img src="${
                        data.poster
                      }" style="object-fit: cover; width: 100%;">
                      <ul>
                      ${data.musicians
                        .map(
                          (musician) => `<li class='musician'>${musician}</li>`
                        )
                        .join('')}</ul>
                    </div>`
                )
                .join('')
            : `<p>해당 공연이 존재하지 않습니다.</p>`
        }
    `;
  }

  setEvent() {
    this.$target.addEventListener('click', (e) => {
      if (e.target.classList.contains('musician')) {
        const musician = e.target.textContent;
        this.clickMusicians(musician);
      }
    });
  }

  setErrorMessage = (message) => {
    this.$target.innerHTML = `<p>${message}</p>`;
  };
}
