'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

// THIS TRANSACTION IS FOR MOVING AN ITEM
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, id, step) {
        super();
        this.model = initModel;
        this.id = id;
        this.step = step;
    }

    doTransaction() {
        // MAKE A NEW ITEM
        this.model.moveItem(this.id, this.step);
    }

    undoTransaction() {
        this.model.moveItem(this.id, -1*(this.step));
    }
}