export default class TodoInput {
  constructor({ $target, onSubmit, onAllDelete }) {
    this.$target = $target;
    this.$element = document.createElement('form');
    this.$element.innerHTML = `
    <input type='text' />
    <button type='submit' class="add_button">추가하기</button>
    <button data-btn_type='delete' type='button' class="allDelete_button">전체 삭제</button>
    `;
    this.$target.appendChild(this.$element);
    this.onSubmit = onSubmit;
    this.onAllDelete = onAllDelete;
    this.setEvent();
  }

  setEvent() {
    this.$element.addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target[0].value.length === 0) {
        return alert('한글자 이상 입력해주세요!');
      }
      this.onSubmit(e.target[0].value);
      e.target[0].value = '';
      e.target[0].focus();
    });

    this.$element.addEventListener('click', (e) => {
      if (e.target.dataset.btn_type === 'delete') this.onAllDelete();
    });
  }
}
