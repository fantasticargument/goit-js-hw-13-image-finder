import NewsPictureApi from './apiService';
import listPicture from '../templates/listPicture';

const rfs = {
  searchForm: document.querySelector('#search-form'),
  loadMoreButton: document.querySelector('[data-action="load-more"]'),
  conteinerCard: document.querySelector('.gallery'),
  modalCase: document.querySelector('.lightbox'),
  closedModalbatton: document.querySelector('[data-action="close-lightbox"]'),
  currentImage: document.querySelector('.lightbox-image'),
  beckDrop: document.querySelector('.lightbox-overlay'),
}

rfs.searchForm.addEventListener('submit', onSubmit);
rfs.loadMoreButton.addEventListener('click', onLoadMore);
rfs.conteinerCard.addEventListener('click', createModal);
rfs.closedModalbatton.addEventListener('click', closedModal)
rfs.beckDrop.addEventListener('click', closedModal)

const newsPictureApi = new NewsPictureApi();

function onSubmit(eve) {
  eve.preventDefault();

  newsPictureApi.query = eve.currentTarget.elements.query.value;
  newsPictureApi.resetPsge();
  newsPictureApi.fethArticls().then(appEndPictureMarkup);
}

function onLoadMore() {
  newsPictureApi.fethArticls().then(appEndPictureMarkup);
}

function appEndPictureMarkup(pictures) {
  rfs.conteinerCard.insertAdjacentHTML('beforeend', listPicture(pictures));
}

function createModal(eve) {
  eve.preventDefault();
  if (!eve.target.classList.contains('gallery-image')) {
    return;
  };
  rfs.modalCase.classList.add('is-open');
  rfs.currentImage.src = eve.target.dataset.source;
  window.addEventListener('keydown', onEscDown);
}

function closedModal() {
  rfs.currentImage.src =' ';

  rfs.modalCase.classList.remove('is-open');
  window.removeEventListener('keydown', onEscDown);
  
}

function onEscDown(event) {
  if (event.code === 'Escape') {
    closedModal();
  }
}