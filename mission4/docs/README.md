## 구현 목록

- 컴포넌트 관계 ✅

  - main, App, TodoInput, TodoList으로 컴포넌트를 나눈다.
  - 조금 더 세분화시키면 TodoItem으로 TodoList를 분리할 수 있다.

- 할 일 목록 불러오기 ✅

  - API_URL: https://todo-api.roto.codes/:username
  - username을 입력하여 할 일 목록 불러오기
  - 불러온 데이터는 App의 state로 받아서 TodoList에게 전달하기 (일종의 props 개념)
  - TodoList는 데이터를 받아서 랜더링

- 할 일 추가하기 ✅

  - TodoInput에서 Form을 활용해 할 일 추가하기
  - onSubmit활용
  - onSubmit하면 App의 setState를 통해 새로운 할일이 추가된 데이터로 변경
  - TodoList에서는 변경된 새로운 데이터로 state를 변경하고 리랜더링

- 할 일 삭제하기 ✅

  - todo_id를 이용해서 해당하는 투두 아이템을 삭제할 수 있음
  - TodoList의 삭제버튼을 클릭
  - 클릭하게 되면 onTodoItemDelete 실행
  - App에서 해당 투두아이템을 삭제
  - 변경된 state로 다시 리랜더링 (할 일 추가하기와 같은 작업)

- 할 일 전체 삭제하기 ✅

  - TodoInput에서 구현, 추가하기 옆에 전체삭제 버튼구현하기
  - 전체 삭제를 클릭하면 App의 state를 모두 삭제하고 리랜더링
  - 상위 컴포넌트의 state가 변경되면 이를 props로 받는 하위컴포넌트들도 전부 리랜더링이 된다.

- 할 일 완료여부 토글하기 ✅

  - TodoList의 todoItem을 클릭하면 onToggle 실행
  - App에서 onToggle 기능구현
  - TodoList에서는 onToggle이 무슨 기능을 하는지 몰라도 됨.

## 보너스 구현목록

### 이슈 #36

- Users 컴포넌트를 만들어서 사용자 목록을 보여주고 특정 사용자를 클릭하면 그 사용자의 투두리스트를 보여주게한다.

- 클릭한 사용자의 이름을 onShowUserTodos에 전달한다.
- main에서 해당 함수의 기능을 구현한다.
  - 전달받은 사용자의 이름을 App 컴포넌트의 username에 넣어준다.
- username이 변경되면 fetch함수를 통해 해당 유저의 투두정보를 받아와야한다.
- app에 username이라는 상태를 만들어서 Users컴포넌트에서 유저이름을 클릭할 때 클릭한 유저의 이름을 App컴포넌트의 username으로 세팅해서 상태를 변경시키게 구현

### 이슈 #37

- 로딩처리
- fetchTodoList가 완료되는 동안은 로딩시간이라 생각함
- await 키워드를 사용했으므로 비동기작업이 완료될때까지 뒤의 코드는 실행되지 않음
- 로딩시간이면 TodoList컴포넌트의 isLoading 상태를 true로 설정하여 화면에 로딩중... 이라는 메세지가 랜더링 되도록 구현
- 비동기통신이 완료가 되고 todoList가 반환되면 TodoList컴포넌트의 isLoading을 false로 바꾸고 todoList로 다시 리랜더링

### 이슈 #38

### 이슈 #39

- favorite 유저 필터링
- fetch한 데이터에 대해 변경이 필요하다.
- 유저이름, 유지id, favorite유저여부를 판단할 수 있는 정보를 모아둔 객체로 데이터를 변경한다.
- 즐겨찾기 버튼을 클릭하면 해당 유저의 isFavorite상태를 변경한다.
- favoriteUsers라는 배열에 isFavorite이 true인 유저들을 저장한다.
  - 해당기능은 새로고침 시에도 변경되지 않도록 localstorage기능을 사용하여 관리한다.
- 체크박스를 통해 즐겨찾기 목록을 클릭하면 favoriteUsers배열의 목록을 랜더링한다.
  - 체크박스가 chekced가 되면 favoriteUsers배열을 this.state로 설정한다. setState를 이용한다.
  - 체크박스가 unChecked가 되면 다시 ths.state를 users값으로 설정한다. setState를 이용한다.

## 질문

```js
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
```

Users.js에서 체크박스를 누르면 즐겨찾기 목록을 랜더링하도록 구현했습니다.

`setEvent메서드`에서 이벤트 타겟이 input일때, 체크박스에 체크가 되어있으면 현재 랜더링하는 유저데이터를 즐겨찾기 유저로 바꿔주는 코드입니다.

```js
// setEvent 메서드 내부에 있는 코드
if (e.target.nodeName === 'INPUT') {
  if (e.target.checked) {
    this.setState(localstorage.getItem(FAVORITE_USERS, []));
  } else {
    this.fetchUsers();
  }
}
```

이전에는 위의 코드와 같이 로컬스토리지에 저장되어있는 즐겨찾기 목록을 바로 setState의 파라미터로 넘겼습니다.

이유는 `this.favoriteUsers`은 컴포넌트가 초기화될 때 한번 로컬스토리지에서 데이터를 받아와 세팅된 후, 사용자가 즐겨찾기 버튼을 클릭하면 업데이트 되지 않고 기존의 데이터를 가지고 있을 것이라 생각했기 때문입니다.

```js
if (e.target.nodeName === 'INPUT') {
  if (e.target.checked) {
    this.setState(this.favoriteUsers);
  } else {
    this.fetchUsers();
  }
}
```

하지만 위의 코드와 같이 `this.favoriteUsers`를 그대로 넘겨주어도 state가 최신상태로 유지되는 것을 확인했습니다.
왜 그런건가요?
