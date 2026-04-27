import { db } from "../db.js";


//This is our items model, this is where we handle the database interactions for our items
export function getItems() {
    return db.prepare(`SELECT * FROM items`).all();
}

export function createItem(newItem) {
    db.prepare("INSERT INTO items (label) VALUES (:newItem)").run({newItem});
}
