'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class UpdateItem_Transaction extends jsTPS_Transaction {
    constructor(initModel, initItem, initOldDesc, initNewDesc, initOldDate, initNewDate, initOldStatus, initNewStatus) {
        super();
        this.model = initModel;
        this.item = initItem;
        this.oldDesc = initOldDesc;
        this.newDesc = initNewDesc;
        this.oldDate = initOldDate;
        this.newDate = initNewDate;
        this.oldStatus = initOldStatus;
        this.newStatus = initNewStatus;
    }

    doTransaction() {
        console.log("uddc")
        this.model.itemChange(this.item, this.newDesc, this.newDate, this.newStatus);
    }

    undoTransaction() {
        console.log("uduc")
        this.model.itemChange(this.item, this.oldDesc, this.oldDate, this.oldStatus);
    }
}