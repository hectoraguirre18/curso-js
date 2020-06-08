import React, { useState, useEffect } from 'react';
import {firebase} from './firebase'
import * as Icon from 'react-bootstrap-icons'
import logo from './assets/img/logo_dark.png'
import githubLogo from './assets/img/github.png'

function App() {
  const [todos, setTodos] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editId, setEditId] = useState("")
  const [editName, setEditName] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editUrgent, setEditUrgent] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const db = firebase.firestore()
      try {
        const data = await db.collection('todos').orderBy("createdAt").get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setTodos(arrayData)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
  }, [])

  const onCreatePressed = () => {
    if(editMode)
      return;
    setTodos([
      ...todos,
      {
        id: undefined,
        name: ""
      }
    ])
    setEditMode(true)
    setEditId(undefined)
    setEditName("")
    setEditDescription("")
    setEditUrgent(false)
  }

  const deleteTodo = async (id) => {
    try {
      const db = firebase.firestore()
      await db.collection('todos').doc(id).delete()

      const todosFilter = todos.filter(item => item.id !== id)
      setTodos(todosFilter)
    } catch (error) {
      console.error(error)
    }
  }

  const startEdit = (item) => {
    if(!editMode) {
      setEditMode(true)
      setEditId(item.id);
      setEditName(item.name);
      setEditDescription(item.description);
      setEditUrgent(item.urgent);
    }
  }

  const saveChanges = async () => {
    if(!editName.trim()){
      // Don't save empty name
      return
    }

    if(editId) {
      // Save changes to existing to-do

      try {
        const db = firebase.firestore()
        await db.collection('todos').doc(editId).update({
          name: editName,
          description: editDescription,
          urgent: editUrgent
        })

        const arrayEdit = todos.map(item => (
          item.id === editId ? { ...item, name: editName, description: editDescription, urgent: editUrgent } : item
        ))
        setTodos(arrayEdit)
        setEditMode(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      // Save new to-do
      try {
        const now = new Date()
        const db = firebase.firestore()
        const data = await db.collection('todos').add({
          name: editName,
          description: editDescription,
          urgent: editUrgent,
          createdAt: now
        })

        const todoNew = {
          name: editName,
          description: editDescription,
          urgent: editUrgent,
        }

        setTodos([
          ...(todos.filter(e => e.id)),
          {id: data.id, ...todoNew}
        ])
        setEditMode(false)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const cancelEdit = () => {
    if(editId) {
      // Stop editing existing to-do
      setEditMode(false)
      setEditId("")
      setEditName("")
    } else {
      // Cancel creation of new to-do
      setEditMode(false)
      setEditId("")
      setEditName("")
      setTodos(todos.filter(e => e.id))
    }
  }

  const toggle = async (item) => {
    if(editMode) //Dont toggle items while editing
      return;
    let oldTodos = todos;
    try {
      const db = firebase.firestore()
      const arrayEdit = todos.map(t => (
        t.id === item.id ? { ...t, done: !t.done } : t
      ))
      setTodos(arrayEdit)
      await db.collection('todos').doc(item.id).update({
        done: !item.done
      })
    } catch (error) {
      console.error(error)
      setTodos(oldTodos) //Rollback changes if an error occurred
    }
  }

  return (
    <div>
      <div className="container mb-8">
        <div className="row align-items-center mr-4">
          <img src={logo} height="96" alt="logo"/>
          <div className="flex-grow-1"/>
          <a href="https://github.com/hectoraguirre18/curso-js/tree/master/examen%20tercer%20parcial">
            <img src={githubLogo} height="64" alt="logo" style={{cursor: "pointer"}}/>
          </a>
        </div>
      </div>
      <div className="container">
        <ul className="list-group">
          {
            todos.map(item => {
              const editingThis = editMode && editId === item.id;
              const editingOther = editMode && editId !== item.id;

              const textColor = !editingOther ? "black" : "#bfbfbf";
              return (
                <li className="list-group-item" key={item.id || "key"}>
                  {
                    !editingThis
                      ? (
                        <div className="row">
                          <div className="col-md-8">
                            {
                              item.urgent
                                ? <div className="row align-items-center" style={{color: !editingOther ? "crimson" : "#fbd0d9"}}>
                                  <Icon.ExclamationTriangleFill className="ml-2 mr-2"/>
                                  Urgent!
                                  <div className="flex-grow-1"/>
                                </div>
                                : <div/>
                            }
                            <div className="row align-items-center">
                              {
                                item.done
                                  ? (<Icon.CheckCircleFill color={!editingOther ? "green" : "grey"} className="ml-2 mr-2" size="20" style={editMode ? {} : {cursor: "pointer"}} onClick={() => toggle(item)}/>)
                                  : (<Icon.Circle color={textColor} className="ml-2 mr-2" size="20" style={editMode ? {} : {cursor: "pointer"}} onClick={() => toggle(item)}/>)
                              }
                              <div className="flex-grow-1">
                                <span style={{fontWeight: "bold", color: textColor}}>{item.name}<br/></span>
                                <small className="mr-2" style={{color: textColor}}>{item.description}</small>
                              </div>
                            </div>
                          </div>
                          {
                            editingOther
                              ? (
                                <div className="col">
                                  <button className="btn btn-sm btn-danger mr-2 float-right disabled" disabled>
                                    <Icon.Trash size="18"/>
                                  </button>
                                  <button className="btn btn-sm btn-primary mr-2 float-right disabled" disabled>Edit</button>
                                </div>
                              )
                              : (
                                <div className="col">
                                  <button className="btn btn-sm btn-danger mr-2 float-right" onClick={() => deleteTodo(item.id)}>
                                    <Icon.Trash size="18"/>
                                  </button>
                                  <button className="btn btn-sm btn-primary mr-2 float-right"onClick={() => startEdit(item)}>Edit</button>
                                </div>
                              )
                          }
                        </div>
                      )
                      : (
                        <div className="row">
                          <div className="col">
                            <div className="row align-items-center mb-2 mr-0" style={{cursor: "pointer", color: "crimson"}} onClick={() => setEditUrgent(!editUrgent)}>
                              {
                                editUrgent
                                  ? (<Icon.ExclamationTriangleFill className="ml-2 mr-2" size="16"/>)
                                  : (<Icon.Triangle className="ml-2 mr-2" size="16"/>)
                              }
                              {editUrgent ? "Marked as Urgent" : "Not marked as urgent"}
                              <div className="flex-grow-1"/>
                              <button className="btn btn-sm btn-success mr-2 float-right" onClick={saveChanges}>Save</button>
                              <button className="btn btn-sm btn-secondary mr-2 float-right" onClick={cancelEdit}>Cancel</button>
                              <button className="btn btn-sm btn-danger mr-2 float-right" onClick={() => deleteTodo(item.id)}>
                                <Icon.Trash size="18"/>
                              </button>
                            </div>
                            <div className="row align-items-center">
                              <div className="col">
                                  <label>Name:</label>
                                  <input type="text"
                                    autoFocus="autofocus"
                                    placeholder="Name"
                                    className="form-control input-sm mr-2"
                                    value={editName}
                                    onChange = {e => setEditName(e.target.value)}
                                  />
                              </div>
                              <div className="col">
                              <label>
                                Description:
                              </label>
                                <input type="text"
                                  placeholder="Description"
                                  className="form-control input-sm mr-2"
                                  value={editDescription}
                                  onChange = {e => setEditDescription(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                  }
                </li>
              )
            }).concat((
              <li className="list-group-item" key="" style={{cursor: editMode ? "auto" : "pointer", backgroundColor: editMode ? "#ababab" : "#40a6fb"}} onClick={onCreatePressed}>
                <Icon.PlusCircleFill color="white" className="mr-2" size="20"/>
                <span style={{color: "white"}}>New To-Do</span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
