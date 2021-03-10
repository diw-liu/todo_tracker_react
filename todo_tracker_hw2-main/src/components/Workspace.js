// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteDisplay:false
        }
    }

    handleCloseCurrentList = () => {
        this.props.closeCurrentListCallBack();
    }

    handleAddNewItem = () =>{
        this.props.addNewItemCallBack();
    }

    handleRemoveCurrentList = () =>{
        this.props.removeCurrentListCallBack();
        this.removeDeleteDialog();
    }
    displayDeleteDialog = () =>{
        this.setState({
            deleteDisplay:true
        })
    }
    removeDeleteDialog = () =>{
        this.setState({
            deleteDisplay:false
        })
    }

    render() {
        console.log(this.props.toDoListItems);
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" />
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" />
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button" onClick={this.handleAddNewItem} />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" onClick={this.displayDeleteDialog} />
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" onClick={this.handleCloseCurrentList}/>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            moveItemCallBack={this.props.moveItemCallBack}
                            deleteItemCallBack={this.props.deleteItemCallBack}
                            itemChangeCallBack={this.props.itemChangeCallBack}
                        />))
                    }
                </div>
                { (this.state.deleteDisplay) ? 
                    // <div class="modal" id="delete_modal" data-animation="slideInOutLeft">
                        <div >
                            <header >
                                Delete list?
                                <div onClick={this.removeDeleteDialog}>close</div>
                            </header>
                                <button onClick={this.handleRemoveCurrentList}>Confirm</button>
                                <button onClick={this.removeDeleteDialog}>Cancel</button>
                            
                        </div>
                    // </div>
                    :null
                }
                <br />
            </div>
        );
    }
}

export default Workspace;