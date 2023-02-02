export function renderItem(item) {
    const li = document.createElement('li');
    li.classList.add('list-item');

    // Conditionally add a "complete" class to the li
    // if the item is complete
    if (item.bought) li.classList.add('bought');

    const p1 = document.createElement('p');
    p1.textContent = `${item.quantity}`;
    p1.classList.add('grocery-item-quantity');
    const p2 = document.createElement('p');
    p2.textContent = `${item.item}`;
    p2.classList.add('grocery-item-name');
    li.append(p1, p2);

    return li;
}
