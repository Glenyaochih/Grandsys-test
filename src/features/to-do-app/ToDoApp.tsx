import React, { useEffect, useState } from 'react';
import {
  MdOutlineModeEdit,
  MdOutlineFilterList,
  MdDeleteOutline,
  MdCheck,
} from 'react-icons/md';

//待辦事項類型定義;
interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}
// 篩選類型
type FilterType = 'all' | 'completed' | 'incomplete';

export default function ToDoApp() {
  const localStorageSave = () => {
    const saveTodos = localStorage.getItem('todos');
    return saveTodos ? JSON.parse(saveTodos) : [];
  };
  //編輯 Todo 的暫存資料
  const [editTempId, setEditTempId] = useState<number | null>(null);
  const [tempText, setTempText] = useState<string>('');

  //將取得的localStorage 資料放入state
  const [todos, setTodos] = useState<TodoItem[]>(localStorageSave);
  //篩選狀態
  const [filter, setFilter] = useState<FilterType>('all');

  //新增Todo
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const addTodoInput = form.elements.namedItem(
      'addTodoInput'
    ) as HTMLInputElement;
    const created = Date.now();

    if (addTodoInput.value.trim() !== '') {
      const newTodo: TodoItem = {
        id: Date.now(),
        title: addTodoInput.value,
        isCompleted: false,
        createdAt: new Date(created),
      };
      setTodos([...todos, newTodo]);
      addTodoInput.value = '';
    }
  };

  //刪除Todo

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //觸發修改
  const handleStartEdit = (id: number, text: string) => {
    setEditTempId(id);
    setTempText(text);
  };
  //修改Todo
  const handleEditTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempText.trim() !== '' && editTempId !== null) {
      setTodos(
        todos.map((todo) =>
          editTempId === todo.id ? { ...todo, title: tempText } : todo
        )
      );
    }
    setEditTempId(null);
    setTempText('');
  };
  //改變狀態
  const handleStatusSwitch = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };
  //過濾todo
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.isCompleted; //回傳已完成
    }
    if (filter === 'incomplete') {
      return !todo.isCompleted; // 回傳已完成
    }
    return true; //回傳全部
  });

  //只要todos變動就存入localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <div className='to-do'>
        <div className='container'>
          <div>
            <h1 className='py-3'>TODO</h1>
          </div>
          <hr className='thick-hr' />

          <div className='d-sm-flex pt-2 pb-3'>
            {/* 搜尋框 */}
            <section>
              <div className='add-to-do'>
                <form onSubmit={handleAddTodo}>
                  <div className='input-group'>
                    <input
                      type='text'
                      name='addTodoInput'
                      className='form-control'
                      placeholder='新增待辦清單'
                      aria-label='新增待辦清單'
                      aria-describedby='button-addon2'
                    />
                    <button
                      className='btn btn-outline-secondary'
                      type='submit'
                      id='button-addon2'
                    >
                      新增
                    </button>
                  </div>
                </form>
              </div>
            </section>
            {/* 搜尋框 */}
            {/* 篩選 */}
            <section className='ms-auto'>
              <div>
                <div className='dropdown'>
                  <a
                    className='btn btn-outline-secondary'
                    type='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <MdOutlineFilterList size={20} />
                  </a>
                  <ul className='dropdown-menu dropdown-menu-end'>
                    <li>
                      <button
                        className='dropdown-item '
                        type='button'
                        onClick={() => setFilter('all')}
                      >
                        全部
                      </button>
                    </li>
                    <li>
                      <button
                        className='dropdown-item'
                        type='button'
                        onClick={() => setFilter('completed')}
                      >
                        已完成
                      </button>
                    </li>
                    <li>
                      <button
                        className='dropdown-item'
                        type='button'
                        onClick={() => setFilter('incomplete')}
                      >
                        未完成
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
          {/* 渲染區 */}
          <section>
            <div className='py-4'>
              <div className='row row-cols-1 row-cols-md-4 gy-4'>
                {filteredTodos.map((todo) => {
                  return (
                    <div className='col ' key={todo.id}>
                      {/* 卡片區塊 */}
                      <div className='card h-auto'>
                        <div className='card-header d-flex'>
                          <span
                            className={`px-3  rounded-pill ${todo.isCompleted ? 'bg-success-100' : 'bg-neutral-60 text-white'}`}
                          >
                            {todo.isCompleted ? '已完成' : '未完成'}
                          </span>
                          <div className='ms-auto'>
                            <input
                              className='form-check-input'
                              type='checkbox'
                              onChange={() => handleStatusSwitch(todo.id)}
                              aria-label='改變狀態'
                              aria-describedby='改變狀態'
                            />
                          </div>
                        </div>
                        <div className='card-body'>
                          {editTempId === todo.id ? (
                            <input
                              value={tempText}
                              type='text'
                              name='editTodoInput'
                              className='form-control form-control-sm'
                              aria-label='編輯待辦'
                              onChange={(e) => setTempText(e.target.value)}
                            />
                          ) : (
                            <h5 className='card-title'>{todo.title}</h5>
                          )}
                          <ul></ul>
                          <div className='d-flex'>
                            <div
                              className='btn-group ms-auto'
                              role='group'
                              aria-label='Basic outlined example'
                            >
                              {editTempId === todo.id ? (
                                <button
                                  type='button'
                                  className='btn btn-sm btn-outline-neutral-60 ms-auto'
                                  onClick={(e) => {
                                    handleEditTodo(e);
                                    setEditTempId(null);
                                  }}
                                  form='editInputForm'
                                >
                                  <MdCheck size={20} />
                                </button>
                              ) : (
                                <button
                                  type='button'
                                  className='btn btn-sm btn-outline-neutral-60 ms-auto'
                                  onClick={() => {
                                    handleStartEdit(todo.id, todo.title);
                                    // 開始編輯
                                  }}
                                  disabled={editTempId !== null}
                                >
                                  <MdOutlineModeEdit size={20} />
                                </button>
                              )}

                              <button
                                type='button'
                                className='btn btn-sm btn-outline-accent-100'
                                onClick={() => handleDeleteTodo(todo.id)}
                                disabled={editTempId !== null}
                              >
                                <MdDeleteOutline size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 卡片區塊 */}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
