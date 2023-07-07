import React, { useEffect } from 'react';
import { useState } from 'react';
import { addTodo, deleteTodo, removeTodo, editTodo } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';

export default function Todo() {
  const [inputData, setInputData] = useState({ title: '', description: '', status: '' });
  const [editItemId, setEditItemId] = useState(null);
  const list = useSelector((state) => state.todoReducers.list);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedData = localStorage.getItem('todoList');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch(addTodo(parsedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  const handleAddTodo = () => {
    if (editItemId !== null) {
      dispatch(editTodo(editItemId, inputData));
      setEditItemId(null);
    } else {
      dispatch(addTodo(inputData));
    }
    setInputData({ title: '', description: '', status: '' });
  };

  const handleEdit = (id, data) => {
    setEditItemId(id);
    setInputData(data);
  };

  return (
    <div className="todo-container">
      <h1>Add Your List Here ✌️</h1>
      <div className='addItems'>
        <input
          type='text'
          className='input'
          placeholder='Title'
          value={inputData.title}
          onChange={(event) => setInputData({ ...inputData, title: event.target.value })}
        />
        <br /> 
        <textarea
          className='input'
          placeholder='Description'
          value={inputData.description}
          onChange={(event) => setInputData({ ...inputData, description: event.target.value })}
        ></textarea>
        <br />
        <input
          type='text'
          className='input'
          placeholder='Status'
          value={inputData.status}
          onChange={(event) => setInputData({ ...inputData, status: event.target.value })}
        />
        <br />
        <button className='add-btn' onClick={handleAddTodo}>
          {editItemId !== null ? 'Save Task' : 'Add Task'}
        </button>
      </div>
      <div className="task-list">
        {list.map((ele) => (
       <div className="task-item" key={ele.id}>
            {editItemId === ele.id ? (
              <div>
                <input
                  type='text'
                  className='input'
                  placeholder='Title'
                  value={inputData.title}
                  onChange={(event) => setInputData({ ...inputData, title: event.target.value })}
                />
                <br />
                <textarea
                  className='input'
                  placeholder='Description'
                  value={inputData.description}
                  onChange={(event) =>
                    setInputData({ ...inputData, description: event.target.value })
                  }
                ></textarea>
                <br />
                <input
                  type='text'
                  className='input'
                  placeholder='Status'
                  value={inputData.status}
                  onChange={(event) => setInputData({ ...inputData, status: event.target.value })}
                />
              </div>
            ) : (
              <div>
                <h3 className='h3'>Title: {ele.data.title}</h3>
                <p className='description'>Description: {ele.data.description}</p>
                <p className='status'>Status: {ele.data.status}</p>
              </div>
            )}
            <div className='todo-btn'>
              {editItemId === ele.id ? (
                <button className='edit-btn' onClick={handleAddTodo}>
                  Save
                </button>
              ) : (
                <button className='edit-btn' onClick={() => handleEdit(ele.id, ele.data)}>
                  Edit
                </button>
              )}
              <button className='delete-btn' onClick={() => dispatch(deleteTodo(ele.id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
