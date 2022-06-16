import {menuItems} from "./menu.js";

const CHEVRON_IMAGE_PATH = './images/chevron.svg'

const getItemById = (id) => menuItems.find((obj) => obj.id === id);

export const getMenuItemCount = (id) => {
    return getItemById(id).count;
}

export const incrementItemCount = (id) => {
    getItemById(id).count++;
    updateAllPrices();
}

export const decrementItemCount = (id) => {
    getItemById(id).count--;
    updateAllPrices();
}

export const getSubTotal = () => {
    let subTotal = 0;
    menuItems.forEach((item) => {
        subTotal += item.price * (item.count > 0);
    });
    return subTotal.toFixed(2);
}

export const getTaxAmount = (subTotal) => {
    const TAX_MUL = 0.0975;
    return (subTotal * TAX_MUL).toFixed(2);
}

export const isInCart = (id) => getItemById(id).count > 0;

export const btnTransformToInCart = (btn) => {
    const btnTextNode = document.createTextNode('In Cart');
    const btnImagElement = document.createElement('img');
    btn.classList.remove('add');
    btn.classList.add('in-cart');
    btn.removeChild(btn.firstChild);
    btnImagElement.src = './images/check.svg'
    btn.appendChild(btnImagElement);
    btn.appendChild(btnTextNode);
}

export const btnTransformToAddToCart = (btn) => {
    btn.classList.remove('in-cart');
    btn.classList.add('add');
    while (btn.firstChild) {
        btn.removeChild(btn.lastChild);
    }
    const btnTextNode = document.createTextNode('Add to Cart');
    btn.appendChild(btnTextNode);    
}

export const addItemToCart = (id) => {

    const item = getItemById(id);

    const liNode = document.createElement('li');
        const plateDiv = document.createElement('div');
        plateDiv.classList.add('plate');
            const imgNode = document.createElement('img');
            imgNode.classList.add('plate');
            imgNode.src = `./images/${item.image}`;
            const quantityDiv = document.createElement('div');
            quantityDiv.classList.add('quantity');
                const quantityText = document.createTextNode(`${item.count}`);
            quantityDiv.appendChild(quantityText);
        plateDiv.appendChild(imgNode);
        console.log(quantityDiv);
        plateDiv.appendChild(quantityDiv);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content')
            const menuItemPara = document.createElement('p');
            menuItemPara.classList.add('menu-item');
                const menuItemTextNode = document.createTextNode(`${item.name}`);
            menuItemPara.appendChild(menuItemTextNode);
            const pricePara = document.createElement('p');
            pricePara.classList.add('price');
                const priceTextNode = document.createTextNode(`$${item.price}`);
            pricePara.appendChild(priceTextNode);
        contentDiv.appendChild(menuItemPara);
        contentDiv.appendChild(pricePara);

        const quantityWrapperDiv = document.createElement('div');
        quantityWrapperDiv.classList.add('quantity__wrapper');
            const decreaseBtn = document.createElement('button');
            decreaseBtn.classList.add('decrease');
                const decreaseBtnImg = document.createElement('img');
                decreaseBtnImg.src = CHEVRON_IMAGE_PATH
            decreaseBtn.appendChild(decreaseBtnImg);

            // quantity div

            const increaseBtn = document.createElement('button');
            increaseBtn.classList.add('increase');
                const increaseBtnImg = document.createElement('img');
                increaseBtnImg.src = CHEVRON_IMAGE_PATH
            increaseBtn.appendChild(increaseBtnImg);
        quantityWrapperDiv.appendChild(decreaseBtn);
        quantityWrapperDiv.appendChild(quantityDiv.cloneNode(true));
        quantityWrapperDiv.appendChild(increaseBtn);

        const subTotalDiv = document.createElement('div');
        subTotalDiv.classList.add('subtotal');
            const subTotalTextNode = document.createTextNode(`$${item.count * item.price}`)
        subTotalDiv.appendChild(subTotalTextNode);

    liNode.appendChild(plateDiv);
    liNode.appendChild(contentDiv);
    liNode.appendChild(quantityWrapperDiv);
    liNode.appendChild(subTotalDiv);

    const cartSummaryUl = document.querySelector('.cart-summary');
    cartSummaryUl.appendChild(liNode);
}

const replaceTextInDiv = (div,text) => {
    while (div.firstChild) {
        div.removeChild(div.lastChild);
    }
    const textNode = document.createTextNode(text);
    div.appendChild(textNode);
}

export const updateAllPrices = () => {
    const subTotalDiv = document.getElementById('subtotal-display');
    const subTotal = getSubTotal();
    const taxAmount = getTaxAmount(subTotal);
    const total = (Number(subTotal) + Number(taxAmount)).toFixed(2);

    replaceTextInDiv(subTotalDiv,`$${subTotal}`);
    const taxDiv = document.getElementById('tax-display');
    replaceTextInDiv(taxDiv,`$${taxAmount}`);
    const totalDiv = document.getElementById('total-display');
    replaceTextInDiv(totalDiv,`$${total}`);

}



