## 필수구현사항

### feature-1

- TodoList 클래스 생성하기
  - data 배열을 인자로 받아서 멤버변수에 저장한다.
  - render 메서드를 통해 해당 데이터의 text를 렌더링되도록 한다.

## 보너스 구현 사항

### feature-2

- 유효성을 검사하는 함수 만들기
  - validator 함수를 이용한다.
  - data가 배열이 아니거나 falsy이면 오류를 던진다.

### feature-3

- 다중 컴포넌트를 구현한다.
- 현재 클래스로는 'todo-list'에만 아이템을 추가할 수 있으므로 외부에서 투두리스트의 id를 받아올 수 있게끔 수정한다.

### feature-4

- isCompleted 처리를 한다.
- 삼항연산자를 활용해서 isCompleted가 true일 때만 <s>를 추가한다.
- 이를 위해서 render 함수의 코드를 수정한다.
  - createElement와 appendChild가 아닌 innerHTML을 이용한다.

### feature -5

- setState 메서드 내에서 this.data를 메서드 파라미터로 변경한다.
- this.render 메서드를 통해 리랜더링을 한다.

## 리팩토링

### refactor -1

- validator 함수 이름 바꾸기
  - 함수는 동작을 나타내므로 동사형으로 바꾸기
