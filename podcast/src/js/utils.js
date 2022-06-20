export const tickCheckBoxInRange = (startId, endId) => {
	if (startId > endId) [startId, endId] = [endId, startId];

	for (let currentId = startId; currentId <= endId; currentId++) {
		document.getElementById(`episode-${currentId}`).checked = true;
		window.checkedBoxIDList.push(currentId);
	}
};

export const removeFromArrayByValue = (array, val) => {
	const itemIndex = array.indexOf(val);
	if (itemIndex != -1) array.splice(itemIndex, 1);
};

export const getEpisodeId = (liElement) => liElement.id.slice(8);

export const renderList = (list, parentElement) => {
	list.forEach((item) => {
		parentElement.appendChild(generateLiElement(item));
	});
};

const generateLiElement = (item) => {
	const liElement = document.createElement('li');
	const labelElement = document.createElement('label');
	const inputElement = document.createElement('input');
	const spanElement = document.createElement('span');

	labelElement.setAttribute('for', `episode-${item.id}`);
	inputElement.type = 'checkbox';
	inputElement.name = `episode-${item.id}`;
	inputElement.setAttribute('id', `episode-${item.id}`);

	labelElement.appendChild(inputElement);

	spanElement.innerHTML = `${item.id} || ${item.name}`;
	labelElement.appendChild(spanElement);

	liElement.appendChild(labelElement);
	return liElement;
};
