import React, { Component } from 'react'

export class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };
    }

    onSubmit = e => {
        e.preventDefault();
        const newItem = {
            title: this.state.title
        };

        this.props.addListItem(this.props.todoId, newItem);

        this.setState({ title: "" });

    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <form style={{ display: "flex" }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Add item..."
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    value="Submit"
                    className="btn"
                    onClick={this.onSubmit}
                />
            </form>
        );
    }
}

export default AddItem
