'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const placeholders = document.querySelectorAll('.placeholder');
    const itemTextInput = document.querySelector('#item-text-input');
    const itemCreateBtn = document.querySelector('#item-create-btn');

    let choosedItem;

    function dragStart(e) {
        choosedItem = e.target;
        e.target.classList.add('hold'); //Если взял тудушку, то окрашивается в голубой
    }
    function dragEnd(e) {
        e.target.classList.remove('hold');
        choosedItem = null;
    }

    function dragDrop(e) {
        e.target.classList.remove('hovered');
    }
    function dragOver(e) {
        e.preventDefault();
        if(e.target.classList.contains("placeholder")) {
            const afterCard = getAfterCard(e.target, e.clientY);
            if(afterCard) {
                afterCard.before(choosedItem);
            } else {
                e.target.append(choosedItem);
            }
        }

    }
    function dragEnter(e) {
        if(e.target.classList.contains("placeholder")) {
            e.target.classList.add('hovered');
        }
    }
    function dragLeave(e) {
        e.target.classList.remove('hovered');
    }


    function getAfterCard(column, clientY) {
        const cards = column.querySelectorAll(".item:not(.hold)");
        let afterCard;

        for(let i = 0; i < cards.length; i++) {
            let card = cards[i];
            let boundes = card.getBoundingClientRect();
            if(clientY < boundes.top) {
                return card;
            }
        }
        
        return afterCard;
    }

    /* function createItem() {
        const newItem = items[0].cloneNode(true);

        newItem.textContent = itemTextInput.value;
        
        placeholders[0].append(newItem);

        newItem.addEventListener('dragstart', dragStart);
        newItem.addEventListener('dragend', dragEnd);
    } */

    //TODO в localStorage хранить массив с items
    function createItem(text) {
        const newItem = document.createElement("div");

        newItem.classList.add("item");
        newItem.setAttribute("draggable", true);
        newItem.innerHTML = `
            <span class="item__delete-btn">&times;</span>
            <p class="item__text">${text}</p>
        `;
        newItem.querySelector(".item__delete-btn").addEventListener("click", deleteItem);


        placeholders[0].append(newItem);

        newItem.addEventListener('dragstart', dragStart);
        newItem.addEventListener('dragend', dragEnd);
    }

    function deleteItem(event) {
        const parent = event.target.parentElement;

        parent.remove();
    }


    /* items.forEach(item => {
        item.querySelector(".item__delete-btn").addEventListener("click", deleteItem);

        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    }); */

    placeholders.forEach(placeholder => {
        placeholder.addEventListener('drop', dragDrop);
        placeholder.addEventListener('dragover', dragOver);
        placeholder.addEventListener('dragenter', dragEnter);
        placeholder.addEventListener('dragleave', dragLeave);
    });

    itemCreateBtn.addEventListener('click', () => {
        createItem(itemTextInput.value);

        itemTextInput.value = "";
    })

    document.addEventListener("keydown", (e) => {
        if(e.code === "Enter") {
            createItem(itemTextInput.value);

            itemTextInput.value = "";
        }
    })
});