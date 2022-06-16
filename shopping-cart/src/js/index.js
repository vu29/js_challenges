import {btnTransformToInCart, incrementItemCount, addItemToCart} from "./utils.js"

const menuNode = document.querySelector('.panel');
window.subTotalDisplay = document.getElementById('subtotal-display');

menuNode.addEventListener('click',(event)=>{
    const clickedElement = event.path[0];
    //console.log(clickedElement.tagName);
    if(clickedElement.tagName === 'BUTTON'){
        if(clickedElement.classList.contains('add')){
            btnTransformToInCart(clickedElement);

            const itemId = Number(clickedElement.getAttribute('item-id'));
            incrementItemCount(itemId);
            // #TODO: add to cart
            addItemToCart(itemId);
        }
    }
});