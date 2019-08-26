import React, { Component } from 'react'
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import * as apiCalls from './api';
export class TodoList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todos: []
        }

        this.addTodos = this.addTodos.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        this.loadTodos();
    }


    // function that uses the async getTodos function defined in our helper file
    // api call is made to the back end api and json is returned. setState is called with the returned value from that function
    async loadTodos() {
        let todos = await apiCalls.getTodos();
        this.setState({ todos });
    }

    // calls helper file
    // adds a new state item to the state array with the returned json of the newly created item
    async addTodos(inputText) {
        let newTodo = await apiCalls.createTodo(inputText);
        this.setState({ todos: [...this.state.todos, newTodo] })
    }


    // calls helper file
    // updates value for the passed in todo element that was chosen by id
    async toggleTodo(todo) {
        await apiCalls.updateTodo(todo);

        // creates a new array of the state
        // if the id of the current map element and the passed in todo element match, 
        // return that element with with it's completed boolean value changed
        // otherwise return the state element without changing anything
        // cal set state with the newly updated state that matches the DB
        const todos = this.state.todos.map(e =>
            (e._id === todo._id)
                ? { ...e, completed: !e.completed }
                : e)
        this.setState({ todos: todos })
    }

    // uses the helper file that takes in the passed id from the component and removes it from the database
    // set state is then called on an array that filtered out the passed in element by id
    async deleteTodo(id) {
        await apiCalls.deleteTodo(id);
        const todos = this.state.todos.filter(deleteTodo => deleteTodo._id !== id)
        this.setState({ todos: todos })
    }




    render() {
        const todos = this.state.todos.map((element) => (
            <TodoItem
                key={element._id}
                {...element}
                // bind the functions to the elements being loaded
                // the unique id arg is passed in as a second parameter
                onDelete={this.deleteTodo.bind(this, element._id)}
                onToggle={this.toggleTodo.bind(this, element)}
            />
        ))

        return (
            <div>
                <h1>Todos!</h1>
                <TodoForm addTodos={this.addTodos} />
                <ul>
                    {todos}
                </ul>

            </div>
        )
    }
}

export default TodoList
