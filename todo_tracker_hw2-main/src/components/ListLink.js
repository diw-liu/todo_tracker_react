// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameChange:false
        }
        this.timer=0
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleClick = (event) =>{
        clearTimeout(this.timer);
        if(event.detail === 1){
            this.timer = setTimeout(()=>{
                    this.props.loadToDoListCallback(this.props.toDoList)
                }, 200)
            
            this.props.setAddButtonStateCallback(false);
        }else if (event.detail === 2){
            this.setState({
                nameChange:true
            })
        }
        this.props.emptyTransactionCallback();
    }
    handleNameChange =(event)=>{
        this.props.changeListNameCallback(this.props.toDoList,event.target.value);
        this.setState({
            nameChange:false
        })
    }
    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");
        return (
            <div>
                {this.state.nameChange ? <input className='todo-list-button' type="text" onBlur={this.handleNameChange} defaultValue={this.props.toDoList.name} ></input>
                    :  <div className='todo-list-button' onClick={this.handleClick}>{this.props.toDoList.name}</div>
                }
            </div>
            
        )
    }
}

export default ListLink;