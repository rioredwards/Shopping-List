export function renderItem(item) {
    const li = document.createElement('li');

    // Conditionally add a "complete" class to the li
    // if the item is complete
    if (item.bought) li.classList.add('bought');

    const p = document.createElement('p');
    p.textContent = `${item.quantity} ${item.item}`;
    li.append(p);

    return li;
}
