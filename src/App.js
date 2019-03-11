import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    tasks: [
      {
        id: 1,
        name: "Task 1",
        category: "wip",
        bgcolor: "yellow"
      },
      {
        id: 2,
        name: "Task 2",
        category: "wip",
        bgcolor: "green"
      },
      {
        id: 3,
        name: "Task 3",
        category: "completed",
        bgcolor: "blue"
      }
    ]
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, category) => {
    let id = e.dataTransfer.getData("id");

    let newTasks = this.state.tasks.filter(task => {
      console.log(task.id, id);
      if (task.id === parseInt(id)) {
        task.category = category;
      }
      return task;
    });

    this.setState({tasks: newTasks})
  }

  onDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  }

  render() {
    var tasks = {
      wip: [],
      completed: []
    }

    this.state.tasks.forEach(t => {
      tasks[t.category].push(
        <div
          className="draggable"
          onDragStart={(e) => this.onDragStart(e, t.id)}
          draggable
          key={t.id}
          style={{backgroundColor: t.bgcolor}}
        >
        {t.name}
        </div>
      )
    });

    return (
      <div className="App">
        <h2>Drag & Drop Demo</h2>
        <div
          className="wip"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e)=>this.onDrop(e, "wip")}
        >
          <span className="task-header">WIP</span>
          {tasks.wip}
        </div>
        <div
          className="droppable"
          onDragOver={(e) => this.onDragOver(e)}
          onDrop={(e)=>this.onDrop(e, "completed")}
        >
          <span className="task-header">Completed</span>
          {tasks.completed}
        </div>
      </div>
    );
  }
}

export default App;
