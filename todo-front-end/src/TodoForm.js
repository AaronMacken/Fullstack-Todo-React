import React, { Component } from 'react'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
             inputValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }

    handleSubmit() {
        this.props.addTodos(this.state.inputValue);
    }

    render() {
        const {inputValue} = this.state;
        return (
            <div>
                <input type="text" value={inputValue} onChange={this.handleChange}></input>
                <button onClick={this.handleSubmit}>Add Todo</button>
            </div>
        )
    }
}

export default TodoForm
