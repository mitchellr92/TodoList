import React, { Component } from 'react'

export class ListItem extends Component {
    render() {
        return (
            <div>
                {this.props.item}
            </div>
        )
    }
}

export default ListItem
