import { menuItems } from './menu.js';

const CHEVRON_IMAGE_PATH = './images/chevron.svg';

let cartItemCount = 0;

const getItemById = (id) => {
	return menuItems.find((obj) => obj.id === Number(id));
};

const getMenuItemCount = (id) => {
	return getItemById(id).count;
};

const getItemSubTotal = (id) => {
	const item = getItemById(id);
	return (item.count * item.price).toFixed(2);
};

const getSubTotal = () => {
	let subTotal = 0;
	menuItems.forEach((item) => {
		subTotal += item.price * item.count;
	});
	return subTotal.toFixed(2);
};

const getTaxAmount = (subTotal) => {
	const TAX_MUL = 0.0975;
	return (subTotal * TAX_MUL).toFixed(2);
};

const replaceTextInDiv = (div, text) => {
	while (div.firstChild) {
		div.removeChild(div.lastChild);
	}
	const textNode = document.createTextNode(text);
	div.appendChild(textNode);
};

export const isItemInCart = (id) => getItemById(id).count > 0;

export const btnTransformToInCart = (btn) => {
	const btnTextNode = document.createTextNode('In Cart');
	const btnImagElement = document.createElement('img');
	btn.classList.remove('add');
	btn.classList.add('in-cart');
	btn.removeChild(btn.firstChild);
	btnImagElement.src = './images/check.svg';
	btn.appendChild(btnImagElement);
	btn.appendChild(btnTextNode);
};

export const btnTransformToAddToCart = (btn) => {
	btn.classList.remove('in-cart');
	btn.classList.add('add');
	while (btn.firstChild) {
		btn.removeChild(btn.lastChild);
	}
	const btnTextNode = document.createTextNode('Add to Cart');
	btn.appendChild(btnTextNode);
};

export const addItemToCart = (id) => {
	const item = getItemById(id);

	const liNode = document.createElement('li');
	liNode.setAttribute('item-id', id);
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
	plateDiv.appendChild(quantityDiv);

	const contentDiv = document.createElement('div');
	contentDiv.classList.add('content');
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
	decreaseBtnImg.src = CHEVRON_IMAGE_PATH;
	decreaseBtn.appendChild(decreaseBtnImg);

	const increaseBtn = document.createElement('button');
	increaseBtn.classList.add('increase');
	const increaseBtnImg = document.createElement('img');
	increaseBtnImg.src = CHEVRON_IMAGE_PATH;
	increaseBtn.appendChild(increaseBtnImg);
	quantityWrapperDiv.appendChild(decreaseBtn);
	quantityWrapperDiv.appendChild(quantityDiv.cloneNode(true));
	quantityWrapperDiv.appendChild(increaseBtn);

	const subTotalDiv = document.createElement('div');
	subTotalDiv.classList.add('subtotal');
	const subTotalTextNode = document.createTextNode(
		`$${item.count * item.price}`
	);
	subTotalDiv.appendChild(subTotalTextNode);

	liNode.appendChild(plateDiv);
	liNode.appendChild(contentDiv);
	liNode.appendChild(quantityWrapperDiv);
	liNode.appendChild(subTotalDiv);

	const cartSummaryUl = document.querySelector('.cart-summary');
	cartSummaryUl.appendChild(liNode);
};

export const updateAllPrices = () => {
	const subTotalDiv = document.getElementById('subtotal-display');
	const subTotal = getSubTotal();
	const taxAmount = getTaxAmount(subTotal);
	const total = (Number(subTotal) + Number(taxAmount)).toFixed(2);

	replaceTextInDiv(subTotalDiv, `$${subTotal}`);
	const taxDiv = document.getElementById('tax-display');
	replaceTextInDiv(taxDiv, `$${taxAmount}`);
	const totalDiv = document.getElementById('total-display');
	replaceTextInDiv(totalDiv, `$${total}`);
};

export const removeItemFromCart = (id) => {
	document
		.querySelector('.cart')
		.querySelector(`[item-id = '${id}']`)
		.remove();
	let btn = document
		.querySelector('.panel')
		.querySelector(`[item-id='${id}']`);
	btnTransformToAddToCart(btn);
};

export const updateItemCount = (id) => {
	id = Number(id);
	let quantityElements = document
		.querySelector('.cart')
		.querySelector(`[item-id = '${id}']`)
		.querySelectorAll('.quantity');
	quantityElements.forEach((ele) => {
		ele.textContent = getMenuItemCount(id);
	});
};

export const updateItemSubtotal = (id) => {
	const subtotalDiv = document
		.querySelector('.cart')
		.querySelector(`[item-id = '${id}']`)
		.querySelector('.subtotal');
	console.log(subtotalDiv);
	replaceTextInDiv(subtotalDiv, `$${getItemSubTotal(id)}`);
};

export const hideEmptyCartMsg = () => {
	document.querySelector('.empty').style.display = 'None';
};

export const showEmptyCartMsg = () => {
	document.querySelector('.empty').style.display = '';
};

export const isCartEmpty = () => cartItemCount === 0;

export const incrementItemCount = (id) => {
	cartItemCount++;
	getItemById(id).count++;
};

export const decrementItemCount = (id) => {
	cartItemCount--;
	getItemById(id).count--;
};
