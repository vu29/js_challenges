import { episodeList } from './episodes.js';
import {
  getEpisodeId,
  removeFromArrayByValue,
  renderList,
  tickCheckBoxInRange
} from './utils.js';

renderList(episodeList, document.querySelector('.content'));

window.checkedBoxIDList = [];

document
  .querySelector('.content')
  .querySelectorAll('li')
  .forEach((li) =>
    li.addEventListener('click', (event) => {
      if (event.target.tagName === 'INPUT') {
        const currentEpisodeId = getEpisodeId(event.target);

        if (!event.target.checked) {
          removeFromArrayByValue(window.checkedBoxIDList, currentEpisodeId);
          return;
        } else if (event.shiftKey && checkedBoxIDList.length !== 0) {
          console.log(
            checkedBoxIDList[checkedBoxIDList.length - 1],
            currentEpisodeId
          );
          tickCheckBoxInRange(
            checkedBoxIDList[checkedBoxIDList.length - 1],
            currentEpisodeId
          );
        }

        window.checkedBoxIDList.push(Number(currentEpisodeId));
      }
    })
  );
