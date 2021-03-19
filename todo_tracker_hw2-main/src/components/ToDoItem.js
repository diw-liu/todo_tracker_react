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
        this.props.moveItemCallBack(this.props.toDoListItem,1);
    }
    handleItemDown = (e) => {
        this.props.moveItemCallBack(this.props.toDoListItem,-1);
    }
    handleDeleteItem = () =>{
        this.props.deleteItemCallBack(this.props.toDoListItem);
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
        this.props.itemChangeCallBack(listItem, task, listItem.due_date, listItem.status);
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
        this.props.itemChangeCallBack(listItem, listItem.description, date, listItem.status);
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
        this.props.itemChangeCallBack(listItem, listItem.description, listItem.due_date, status);
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
        let moveup=""
        if (this.props.topDisable){
            moveup="disabled"
        }
        let movedown=""
        if (this.props.bottomDisable){
            movedown="disabled"
        }
        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {this.state.taskChange ? 
                    <input className='item-col task-col spacer-small' type="text" defaultValue={listItem.description} onBlur={this.handleTaskChange}></input> 
                  : <div className='item-col task-col spacer-small' onClick={this.handleTaskInput}>{listItem.description}</div>
                  }
                {this.state.dueDateChange ? 
                    <input className='item-col due-date-col spacer-small' type="date" defaultValue={listItem.due_date} onBlur={this.handleDateChange}></input> 
                  : <div className='item-col due-date-col spacer-small' onClick={this.handleDateInput}>{listItem.due_date}</div>
                  }
                {this.state.statusChange ? 
                    <select className='item-col status-col spacer-small' className={statusType} defaultValue={listItem.status} onBlur={this.handleStatusChange}>
                        <option value="complete">complete</option>
                        <option value="incomplete">incomplete</option>
                    </select> 
                  : <div className='item-col status-col spacer-small' className={statusType} onClick={this.handleStatusInput}>{listItem.status}</div>
                }
                <div className='item-col test-4-col spacer-small'></div>
                <div className='item-col list-controls-col spacer-small'>
                    <KeyboardArrowUp className={'list-item-control todo-button '+moveup} onClick={this.handleItemUp}/>
                    <KeyboardArrowDown className={'list-item-control todo-button '+movedown} onClick={this.handleItemDown}/>
                    <Close className='list-item-control todo-button' onClick={this.handleDeleteItem}/>
                    <div className='list-item-control'></div>
                <div className='list-item-control spacer-small'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;