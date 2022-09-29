/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { buyItem, createItem, deleteAllItems, deleteCompleted, getItems } from './fetch-utils.js';
import { renderItem } from './render-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const deleteButton = document.getElementById('delete-button');
const deleteBoughtButton = document.getElementById('delete-bought-button');
const errorDisplay = document.getElementById('error-display');
const itemList = document.getElementById('item-list');

/* State */
let items = [];
let error = null;

/* Events */
window.addEventListener('load', async () => {
    // > Part B: Add a click event listener for the todoEl
    //      - call the async supabase function to delete all items
    //        and get the response
    //      - set the items and error state from the response
    //      - if there's an error call displayError
    //      - otherwise, display the items
    const response = await getItems();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    } else {
        displayItems();
    }
});

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };

    // Call the function to create a Item, passing in "newItem":
    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
        addItemForm.reset();
    }
});

deleteButton.addEventListener('click', async () => {
    // > Part D: Call the async supabase function to delete all items
    const response = await deleteAllItems();
    error = response.error;

    if (error) {
        displayError();
    } else {
        // > Part D: reset items state to an empty array:
        items = [];
        displayItems();
    }
});

deleteBoughtButton.addEventListener('click', async () => {
    // > Part D: Call the async supabase function to delete all items
    const response = await deleteCompleted();
    error = response.error;

    if (error) {
        displayError();
    } else {
        // > Part D: reset items state to an empty array:
        for (let item of items) {
            if (item.bought) {
                console.log(items);
                let index = items.indexOf(item);
                items.splice(index, 1);
                console.log(items);
            }
        }
        displayItems();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayItems() {
    itemList.innerHTML = '';

    for (const item of items) {
        const itemEl = renderItem(item);
        itemList.append(itemEl);

        itemEl.addEventListener('click', async () => {
            const response = await buyItem(item.id);
            error = response.error;
            const updatedItem = response.data;

            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayItems();
            }
        });
    }
}
