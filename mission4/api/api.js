const API_END_POINT = '서버API주소';

export const fetchTodoList = async (username) => {
  try {
    const res = await fetch(`${API_END_POINT}/${username}?delay=1500`);
    if (!res.ok) throw new Error('http error');
    return res.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const addTodo = async (todo, username) => {
  try {
    const res = await fetch(`${API_END_POINT}/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: todo,
      }),
    });
    if (!res.ok) throw new Error('http error');
    return res.status;
  } catch (err) {
    throw new Error(err);
  }
};

export const deleteTodo = async (todoId, username) => {
  try {
    const res = await fetch(`${API_END_POINT}/${username}/${todoId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('http error');
    return res.status;
  } catch (err) {
    throw new Error(err);
  }
};

export const allDeleteTodo = async (username) => {
  try {
    const res = await fetch(`${API_END_POINT}/${username}/all`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('http error');
    return res.status;
  } catch (error) {
    throw new Error(err);
  }
};

export const toggleTodoItem = async (username, todoId) => {
  try {
    const res = await fetch(`${API_END_POINT}/${username}/${todoId}/toggle`, {
      method: 'PUT',
    });
    if (!res.ok) throw new Error('http error');
    return res.json();
  } catch (error) {
    throw new Error(err);
  }
};

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${API_END_POINT}/users`);
    if (!res.ok) throw new Error('http error');
    const data = res.json();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
