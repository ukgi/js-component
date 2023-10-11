## ✅ 필수 구현사항 - #15, #19

- 할 일을 입력하여 `TodoList`컴포넌트의 데이터에 추가하도록 한다.
- form 태그의 submit 이벤트를 활용한다.
- `TodoList`로 그려지는 할 일 목록에 기능 추가한다.
- 삭제버튼 구현
  - 삭제버튼 클릭 시, 해당하는 todo를 DOM에서 삭제한다.
- 완료기능 구현
  - 텍스트 클릭 시, 해당 todo의 isCompleted값을 true로 만든다.
  - true가 되면 삭선 처리를 한다.

## ✅ ✨보너스 구현사항 - #16 input 컴포넌트화

- TodoInput 클래스를 생성해 input과 관련된 로직들을 클래스로 정리한다.
  - Component 추상 클래스를 만든다.
    - input 컴포넌트, todo 컴포넌트 등 컴포넌트가 꼭 가져야하는 기능들을 추상화시켜 클래스로 만든 후 상속을 통해 구현하면 유지보수에 도움이 될 거 같다.

## ✅ 보너스 구현사항 - #17 TodoCount 컴포넌트

- 해당 컴포넌트는 총 Todo의 갯수, 완료처리된 Todo의 갯수를 표시한다.
- TodoList 컴포넌트 아래에 렌더링 되도록 한다.

- 총 Todo의 갯수, 완료처리된 Todo의 갯수는 이전 값들에서 구할 수 있는 값이므로 state는 아니다.(리액트처럼 생각하기)
  - App 컴포넌트의 state의 배열의 길이와 isCompletd가 true인 요소들을 filter로 걸러서 요소의 갯수를 TodoCount 컴포넌트에게 넘겨주면 된다.

## ✅ 보너스 구현사항 - #18 커스텀 이벤트

- 모두삭제 버튼을 만든다.
- 버튼 클릭 시 removeAll이라는 커스텀 이벤트가 발생하도록 한다.
- App 컴포넌트에서 removeAll 이라는 이벤트를 받도록 한다.
- 해당 이벤트를 수신하면 현재 state를 모두 삭제한다.

## ✅ 보너스 구현사항 - #20 localStorage 활용

- todo 데이터를 하드코딩 해놓은 부분을 삭제합니다.
- localStorage를 활용해 todo data가 변경될 때마다 localStorage에 저장하게 합시다.
- 프로그램 초기 기동 시 todo는 localStorage에 저장해둔 todo가 있다면 그걸 사용하고, 없으면 빈 배열로 만듭니다.
- 새로고침 시 입력해둔 todo가 유지해되도록 localStorage를 활용해봅시다.

## 세부 수정

- ✅ 현재 innerHTML로 전달하는 코드가 너무길다.

  - template 함수를 이용해서 innerHTML로 전달하는 string을 리턴한다.

- ✅ isCompleted가 true인 것을 클릭하면 false로 만든다. 즉 삭선을 없앤다.

- ✅ TodoInput컴포넌트와 TodoList컴포넌트가 공유하는 state가 다르다.
  - 두 컴포넌트 모두 data라는 state에 영향을 받는다. 즉, 하나의 state를 공유하고 있는 상태이다.
  - 그렇기 위해선 각각 컴포넌트마다 state를 따로 만드는 것이 아니라 상위컴포넌트에 state를 하나 만들고 함수를 전달하여 각각 자식 컴포넌트 내부에서 상위컴포넌트의 state를 변경할 수 있도록 해보자.
    - ✨ App 컴포넌트의 state를 변경할 수 있는 함수들을 자식 컴포넌트(TodoInput, TodoList)에게 props로 넘겨준다.

## FIX

- TodoList 컴포넌트에서 props에서 todo항목을 찾을 수 없다는 오류
  - 로그에는 값이 잘 찍히는데 왜 항목을 찾을 수 없다는지 이해가 되지 않는다.

## 느낀점

- 컴포넌트 단위 관리의 중요성
  - 이슈#15를 막 구현하고 나서 이슈#16에서 컴포넌트 단위로 리팩토링을 하는 과정이 이번 미션에서 가장 힘들었습니다. 특히 리액트의 props를 JS로 구현하는 과정이 까다로웠습니다. 리액트처럼 사고하기 파트를 읽어보며 state가 어디에 위치해야하고 역방향 데이터흐름을 제어하기 위해 부모 컴포넌트에서 자식컴포넌트에게 어떤 함수를 줘야되는지 고민하는 시간이었습니다. 확실히 컴포넌트 단위로 관리하니 이전보다 각 클래스들이 어떤 기능을 하는지 명확해진 것 같습니다.

## 질문

### 1.

```js
import Component from '../core/Component.js';
import TodoList from '../src/components/TodoList.js';
import TodoInput from './components/TodoInput.js';

const initialState = [{ text: '코딩하기', isCompleted: false }];
const list = document.createElement('div');

export default class App extends Component {
  constructor() {
    super(document.querySelector('#app'));
    this.todoList = new TodoList(list);
    this.todoInput = new TodoInput(list, initialState);
  }

  setup() {
    this.state = [{ text: '코딩하기', isCompleted: false }];
  }

  template() {
    return `
    <section data-component='TodoList'></section>
    <footer data-component='TodoInput'></footer> 
    `;
  }

  mounted() {
    const { deleteTodo, addTodo } = this;
    const todoList = this.target.querySelector('[data-component="TodoList"]');
    const todoInput = this.target.querySelector('[data-component="TodoInput"]');

    new TodoList(todoList, {
      deleteTodo: deleteTodo.bind(this),
      todo: this.state,
    });
    new TodoInput(todoInput, { addTodo: addTodo.bind(this) });
  }

  deleteTodo(id) {
    const todos = [...this.state];
    todos.splice(id, 1);
    this.setState(todos);
  }

  addTodo(todo) {
    this.setState([...this.state, todo]);
  }
}

const app = new App();
```

해당 코드에서 `deleteTodo` 와 `addTodo` 를 bind 메서드를 사용하지 않고 화살표 함수로 고친후에 넘겨주면 `TodoList`, `TodoInput` 컴포넌트에서는 해당 함수가 undefined가 됩니다.

화살표 함수로 정의하면 화살표함수는 상위 스코프의 this를 바인딩하는 렉시컬 this 바인딩이기 때문에 `App`컴포넌트가 생성할 인스턴스를 바인딩하기때문에 정상적으로 작동할 것이라고 생각했습니다.

하지만 bind 메서드로 this를 바인딩하지 않으면 다른 컴포넌트에서 객체로 넘겨주는 함수의 값을 찾을 수 없습니다. 어떠한 이유 때문에 그런가요?

### 2.

```js
import Component from '../../core/Component.js';

export default class TodoInput extends Component {
  constructor(target, props) {
    super(target, props);
    this.input = document.querySelector('input');
  }

  template() {
    return `
      <form>
        <input type='text' placeholder='오늘 할일을 입력하세요.'/>
        <button type='submit'>입력</button>
      </form>
    `;
  }

  setEvent() {
    this.target.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValue = e.target[0].value;
      this.props.addTodo({ text: inputValue, isCompleted: false });
      this.input.value = '';
      this.input.focus();
    });
  }
}
```

해당코드에서 `this.input.value`는 빈 문자열로 초기화가 되지만 `this.input.focus`는 작동하지 않습니다. 왜 그런건가요?

### 3.

`TodoList` 컴포넌트에서 props로 넘겨준 todo항목을 찾을 수 없다는 오류가 계속 나옵니다. 로그에 값도 잘 찍히고 todo가 화면에 랜더링도 잘 되는데 왜 항목을 찾을 수 없다고 하는지 이해가 되지 않습니다. 정확한 오류는 undefined에서 구조분해할당을 사용할 수 없다는 오류입니다.

### 4.

파일의 위치를 바꾸거나 새로운 폴더를 만드는 경우에는 커밋 메세지를 어떻게 남기는 게 좋은가요?
