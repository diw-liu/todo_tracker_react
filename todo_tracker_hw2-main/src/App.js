// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import MoveItem_Transaction from './transactions/MoveItem_Transaction.js'
import RemoveItem_Transaction from './transactions/RemoveItem_Transaction.js'
import UpdateItem_Transaction from './transactions/UpdateItem_Transaction.js'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      addButton: true,
      threeButton: false
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    }, this.afterToDoListsChangeComplete);

  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }
  //Transaction
  addNewItemTransaction = () =>{
    let transaction = new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
    this.enableButton("undo-button");
  }
  moveItemTransaction = (id,step) =>{
    let transaction = new MoveItem_Transaction(this,id,step);
    this.tps.addTransaction(transaction);
    this.enableButton("undo-button");
  }
  removeItemTransaction = (item) =>{
    let transaction = new RemoveItem_Transaction(this,item);
    this.tps.addTransaction(transaction);
    this.enableButton("undo-button");
  }
  updateItemTransaction = (item,desc,dd,status) =>{
    let oldDesc=item.description;
    let oldDD=item.due_date;
    let oldStatus=item.status;
    let transaction = new UpdateItem_Transaction(this,item,oldDesc,desc,oldDD,dd,oldStatus,status);
    this.tps.addTransaction(transaction);
    this.enableButton("undo-button");
  }

  //Constr
  addNewItem = () =>{
    let temp=this.state.currentList;
    let newToDoListItem = [this.makeNewToDoListItem()];
    temp.items = [...temp.items, ...newToDoListItem];

    this.setState({
      currentList:temp,
      nextListItemId:this.state.nextListItemId+1
    })
    return newToDoListItem[0];
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: this.state.nextListItemId,
      description: "No Description",
      due_date
      :  new Date().toUTCString(),
      status: "incomplete"
    };
    return newToDoListItem;
  }

  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recent_work", toDoListsString);
  }


  //Construction site
  moveItem = (item,step) =>{
    var items = this.state.currentList.items;
    var index=  this.iterateCurrentArray(item,items);
    if((index>0&&step==1)|(index<items.length-1&&step==-1)){
      var temp=items[index];
      items[index]=items[index-step];
      items[index-step]=temp;
    }
    this.setState({
      currentList:{items}
    })
  }

  deleteItem = (item) =>{
    var items = this.state.currentList.items;
    var index=this.iterateCurrentArray(item,items);
    items.splice(index, 1);
    this.setState({
      currentList:{items}
    })
    return index;
  }

  itemChange = (item,desc,date,status) =>{
    var items = this.state.currentList.items;
    var index=this.iterateCurrentArray(item,items); 
    items[index].description =desc;
    items[index].due_date    =date;
    items[index].status      =status;
    this.setState({
      currentList:{items}
    })
  }
  
  addItemAtIndex = (item,index) =>{
    var temp=this.state.currentList;
    temp.items.splice(index, 0, item);
    this.setState({
      currentList:temp
    })
  }

  closeCurrentList = () =>{
    this.setState({
      currentList: {items: []}
    })
  }

  removeCurrentList = () =>{
    var todoList=this.state.toDoLists
    var index=this.iterateCurrentArray(this.state.currentList,todoList); 
    todoList.splice(index, 1);
    this.setState({
      toDoLists: todoList,
      currentList: {items: []}
    })
  }

  iterateCurrentArray(item,items){
    var index = -1;
    for(var i=0;i<items.length;i++){
      if(items[i]==item){
        index=i;
     }
    }
    return index;
  }
  
  componentDidMount(){
    document.addEventListener("keydown", this.handleKey, false);
  }

  handleKey = (e) =>{
    if(e.key==="z"){
      this.undo();
    }
    if(e.key==="y"){
      this.redo();
    }
  }

  changeListName = (list,name)=>{
    var todoList=this.state.toDoLists
    var index=this.iterateCurrentArray(list,todoList);
    todoList[index].name=name;
    this.setState({
      toDoLists:todoList
    }) 
  }

  setAddButtonState = (bool) =>{
    if(!bool){
      this.disableButton("add-list-button")
    }else{
      this.enableButton("add-list-button")
    }
    var temp=document.getElementsByClassName("list-item-control")
    for(var i=2;i<5;i++){
      if(bool){
        temp[i].classList.add("disabled");
      }else{
        temp[i].classList.remove("disabled");
      }
    }
    for(var i=0;i<1;i++){
      if(bool){
        temp[i].classList.add("disabled");
      }
    }
    this.setState({
      addButton:bool,
      threeButton:!bool
    })
  }

  // SIMPLE UNDO/REDO FUNCTIONS
  undo = () => {
    if (this.tps.hasTransactionToUndo()) {
        this.tps.undoTransaction();
        if (!this.tps.hasTransactionToUndo()) {
          this.disableButton("undo-button");
        }
        this.enableButton("redo-button");
    }
  } 

  redo = () => {
    if (this.tps.hasTransactionToRedo()) {
        this.tps.doTransaction();
        if (!this.tps.hasTransactionToRedo()) {
            this.disableButton("redo-button");
        }
        this.enableButton("undo-button");
    }
  }

  disableButton(id) {
    let undoButton = document.getElementById(id);
    undoButton.classList.add("disabled");
  }

  enableButton(id) {
    let redoButton = document.getElementById(id);
    redoButton.classList.remove("disabled");
  }
  
  emptyTransaction = () =>{
    this.tps.clearAllTransactions();
  }

  render() {
    let items = this.state.currentList.items;
    console.log(this.state.toDoLists);
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          addButton={this.state.addButton}
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          changeListNameCallback={this.changeListName}
          setAddButtonStateCallback={this.setAddButtonState}
          emptyTransactionCallback={this.emptyTransaction}
        />
        <Workspace 
          threeButton={this.state.threeButton}
          toDoListItems={items} 
          moveItemCallBack={this.moveItemTransaction}
          closeCurrentListCallBack={this.closeCurrentList}
          deleteItemCallBack={this.removeItemTransaction}
          itemChangeCallBack={this.updateItemTransaction}
          removeCurrentListCallBack={this.removeCurrentList}
          addNewItemCallBack={this.addNewItemTransaction}
          undoCallBack={this.undo}
          redoCallBack={this.redo}
          setAddButtonStateCallback={this.setAddButtonState} 
          emptyTransactionCallback={this.emptyTransaction} 
        />
      </div>
    );
  }
}

export default App;