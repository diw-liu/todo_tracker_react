// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state ={
            taskChange:false,
            dueDateChange:false,
            statusChange:false,
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }
    handleItemUp = () => {
        this.props.moveItemCallBack(this.props.toDoListItem.id,1);
    }
    handleItemDown = () => {
        this.props.moveItemCallBack(this.props.toDoListItem.id,-1);
    }
    handleDeleteItem = () =>{
        this.props.deleteItemCallBack(this.props.toDoListItem.id);
    }

    //for task change
    handleTaskInput = () =>{
        console.log("handletaskinput call")
        this.setState({
            taskChange:true
        })
    }
    handleTaskChange = (e) =>{
        let listItem = this.props.toDoListItem;
        var task=e.target.value;
        this.props.itemChangeCallBack(listItem.id, task, listItem.due_date, listItem.status);
        this.setState({
            taskChange:false
        })
    }
    
    //for date change
    handleDateInput = () =>{
        console.log("dueDateChange call")
        this.setState({
            dueDateChange:true
        })
    }
    handleDateChange = (e) =>{
        let listItem = this.props.toDoListItem;
        var date=e.target.value;
        this.props.itemChangeCallBack(listItem.id, listItem.description, date, listItem.status);
        this.setState({
            dueDateChange:false
        })
    }

    //for status change
    handleStatusInput = () =>{
        console.log("statusChange call")
        this.setState({
            statusChange:true
        })
    }
    handleStatusChange = (e) =>{
        let listItem = this.props.toDoListItem;
        var status=e.target.value;
        this.props.itemChangeCallBack(listItem.id, listItem.description, listItem.due_date, status);
        this.setState({
            statusChange:false
        })
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {this.state.taskChange ? 
                    <input className='item-col task-col' type="text" defaultValue={listItem.description} onBlur={this.handleTaskChange}></input> 
                  : <div className='item-col task-col' onClick={this.handleTaskInput}>{listItem.description}</div>
                  }
                {this.state.dueDateChange ? 
                    <input className='item-col due-date-col' type="date" defaultValue={listItem.due_date} onBlur={this.handleDateChange}></input> 
                  : <div className='item-col due-date-col' onClick={this.handleDateInput}>{listItem.due_date}</div>
                  }
                {this.state.statusChange ? 
                    <select className='item-col status-col' className={statusType} defaultValue={listItem.status} onBlur={this.handleStatusChange}>
                        <option value="complete">complete</option>
                        <option value="incomplete">incomplete</option>
                    </select> 
                  : <div className='item-col status-col' className={statusType} onClick={this.handleStatusInput}>{listItem.status}</div>
                }
                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button' onClick={this.handleItemUp}/>
                    <KeyboardArrowDown className='list-item-control todo-button' onClick={this.handleItemDown}/>
                    <Close className='list-item-control todo-button' onClick={this.handleDeleteItem}/>
                    <div className='list-item-control'></div>
                <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;