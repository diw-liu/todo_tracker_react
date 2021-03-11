'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR REMOVING AN ITEM
export default class RemoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, initItem) {
        super();
        this.model = initModel;
        this.item = initItem;
    }

    doTransaction() {
        this.index=this.model.deleteItem(this.item);
    }

    undoTransaction() {
        this.model.addItemAtIndex(this.item, this.index);
    }
}