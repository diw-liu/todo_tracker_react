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
        if(this.props.threeButton){
            this.props.closeCurrentListCallBack();
            this.props.setAddButtonStateCallback(true);
            this.props.emptyTransactionCallback();
        }
    }
    handleRedo =()=>{
        this.props.redoCallBack();
    }
    handleUndo =()=>{
        this.props.undoCallBack();
    }
    handleAddNewItem = () =>{
        if(this.props.threeButton){
            this.props.addNewItemCallBack();
        }
    }
    handleRemoveCurrentList = () =>{
        this.props.removeCurrentListCallBack();
        this.removeDeleteDialog();
        this.props.setAddButtonStateCallback(true);
        this.props.emptyTransactionCallback();
    }
    displayDeleteDialog = () =>{
        if(this.props.threeButton){
            this.setState({
                deleteDisplay:true
            })
        }
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
                        <Undo id="undo-button" className="list-item-control material-icons todo-button disabled" onClick={this.handleUndo}/>
                        <Redo id="redo-button" className="list-item-control material-icons todo-button disabled" onClick={this.handleRedo}/>
                        <AddBox id="add-item-button" className="list-item-control material-icons todo-button disabled" onClick={this.handleAddNewItem} />
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button disabled" onClick={this.displayDeleteDialog} />
                        <Close id="close-list-button" className="list-item-control material-icons todo-button disabled" onClick={this.handleCloseCurrentList}/>
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem,index) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            moveItemCallBack={this.props.moveItemCallBack}
                            topDisable={index==0}
                            bottomDisable={index==this.props.toDoListItems.length-1}
                            deleteItemCallBack={this.props.deleteItemCallBack}
                            itemChangeCallBack={this.props.itemChangeCallBack}
                        />))
                    }
                </div>
                { (this.state.deleteDisplay) ? 
                    <div id="modal-layout">
                        <div id="modal">
                            <div class="modal-header header">
                                <h3>Delete List?</h3>
                                <div class="modal-button deleteList" id="cancelDeleteList-button" onClick={this.removeDeleteDialog}>X</div>
                            </div>   
                            <div class="modal-header">
                                <div class="modal-button" id="confirm" onClick={this.handleRemoveCurrentList}> Confirm </div>
                                <div class="modal-button deleteList" id="noconfirm" onClick={this.removeDeleteDialog}> Cancel </div>
                            </div>
                        </div>
                    </div>
                    :null
                }
                <br />
            </div>
        );
    }
}

export default Workspace;