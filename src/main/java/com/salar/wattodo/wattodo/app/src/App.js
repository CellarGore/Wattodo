import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Toggle from 'react-toggle'

class TaskForm extends Component {

    emptyItem = {
        name: '',
        isComplete: 'false'
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            isLoading: true,
            tasks: [],
            showCompleted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowCompleteChange = this.handleShowCompleteChange.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/home');
        const body = await response.json();
        this.setState((prevState, props) => {
            return {tasks: body, isLoading: false};
        });
    }

    handleShowCompleteChange(event) {
        this.setState((prevState, props) => {
            return {showCompleted : !prevState.showCompleted};
        });
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState((prevState, props) => {
            return {item: item};
        });
    }

    async changeStatus(event, idhere, taskname) {

        var sammy = {
          "name"  :  taskname
        }
        await fetch('/home', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sammy),
        });

        const response = await fetch('/home');
        const body = await response.json();
        this.setState((prevState, props) => {
            return {tasks: body, isLoading: false};
        });

    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/home', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        const response = await fetch('/home');
        const body = await response.json();
        this.setState((prevState, props) => {
            return {tasks: body, isLoading: false};
        });
    }

    render() {
        const {tasks, isLoading, item} = this.state;

        const title = <h2>WATTODO</h2>;

        if (isLoading) {
            return <p>Loading...</p>
        }

        if (!this.state.showCompleted) {
            var tasksToShow = this.state.tasks.filter(task => task.isComplete == false);
        } else {
            var tasksToShow = this.state.tasks;
        }

        return <div>
        <div>
          <Container>
            {title}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="name">Task</Label>
                <Input type="text" name="name" id="name" value={item.name || ''}
                       onChange={this.handleChange} autoComplete="name"/>
              </FormGroup>
              <FormGroup>
                <Button color="primary" type="submit">Save</Button>{' '}
              </FormGroup>
            </Form>
          </Container>
        </div>
        <br/>


        <label>
          <span>Show Completed</span>
          <Toggle
            defaultChecked={this.state.showCompleted}
            onChange={this.handleShowCompleteChange} />
        </label>

        <div>
            <h2>List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Task</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksToShow.map(task =>
                        <div key={task.id}>
                        <tr>
                            <td><Toggle
                                defaultChecked={task.isComplete}
                                onChange={(e) => this.changeStatus(task.id, e, task.name)} /> </td>
                            <td>{task.name}</td>
                        </tr>
                        </div>
                    )}
                </tbody>
            </table>
        </div>
        </div>

    }

}

export default TaskForm;
