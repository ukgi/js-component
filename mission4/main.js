import App from './components/App.js';
import Users from './components/Users.js';

const app = new App({
  $target: document.querySelector('#App'),
  initalState: [],
  username: 'chanukPark',
});

new Users({
  $target: document.querySelector('body'),
  initalState: [],
  onShowUserTodos: (user) => {
    app.setUsername(user);
  },
});
