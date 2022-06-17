import {btnTransformToInCart, incrementItemCount, addItemToCart, updateAllPrices,updateItemCount, decrementItemCount, getMenuItemCount, removeItemFromCart, cartItemCount} from "./utils.js"

const panel = document.querySelector('.panel');
const cart = document.querySelector('.cart');

panel.addEventListener('click',(event)=>{
    const clickedElement = event.target;
    if(clickedElement.tagName === 'BUTTON'){
        if(clickedElement.classList.contains('add')){
            btnTransformToInCart(clickedElement);

            const itemId = Number(clickedElement.getAttribute('item-id'));
            incrementItemCount(itemId);
            document.querySelector('.empty').style.display = 'None';
            updateAllPrices();
            addItemToCart(itemId);
        }
    }
});

cart.addEventListener('click', (event)=>{
    const clickedElePath = event.path;

    if(clickedElePath[2].classList.contains('quantity__wrapper') || clickedElePath[1].classList.contains('quantity__wrapper')){
        let clickAction;
        let itemId;
        if(event.target.tagName === 'BUTTON'){
            clickAction = event.target.className;
            itemId = event.path[2].getAttribute('item-id');
        }
        else if(event.target.tagName === 'IMG'){
            clickAction = event.target.parentElement.className;
            itemId = event.path[3].getAttribute('item-id');
        }
        if(clickAction === 'increase')
            incrementItemCount(itemId);
        else if(clickAction === 'decrease'){
            decrementItemCount(itemId);
        }

        if(getMenuItemCount(itemId) == 0){
            removeItemFromCart(itemId);
            
            if(cartItemCount === 0)
                document.querySelector('.empty').style.display = '';
        }
        else
            updateItemCount(itemId);
        
        updateAllPrices();
    }
});



