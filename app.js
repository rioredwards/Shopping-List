/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createItem } from './fetch-utils.js';
import { renderItem } from './render-utils.js';

/* Get DOM Elements */
const addItemForm = document.getElementById('add-item-form');
const deleteButton = document.getElementById('delete-button');
const errorDisplay = document.getElementById('error-display');
const itemList = document.getElementById('item-list');

/* State */
let items = [];
let error = null;

/* Events */
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

        /* itemEl.addEventListener('click', async () => {
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
        }); */
    }
}
