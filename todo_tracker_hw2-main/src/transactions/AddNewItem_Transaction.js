'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR ADDING A NEW ITEM TO A TODO LIST
export default class AddNewItem_Transaction extends jsTPS_Transaction {
    constructor(initModel) {
        super();
        this.model = initModel;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        console.log("ani active");
        this.itemAdded = this.model.addNewItem();
        console.log(this.itemAdded);
    }

    undoTransaction() {
        this.model.deleteItem(this.itemAdded);
    }
}