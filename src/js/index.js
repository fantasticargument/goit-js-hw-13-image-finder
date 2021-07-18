import NewsPictureApi from './apiService';
import listPicture from '../templates/listPicture';
import LoadMoreBtn from './loaudMomreBtn';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';
defaultModules.set(PNotifyMobile, {});

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
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

function onSubmit(eve) {
  eve.preventDefault();
  clearConteiner();
  newsPictureApi.query = eve.currentTarget.elements.query.value;
  newsPictureApi.resetPsge();
  newsPictureApi.fethArticls().then(appEndPictureMarkup);
}

function onLoadMore() {
  newsPictureApi.fethArticls().then(appEndPictureMarkup);
  loadMoreBtn.disable();
}

function appEndPictureMarkup(pictures) {
  if (pictures.length === 0) {
    alert({
      title: 'NO PICTURE',
      text: 'We could not find any pictures that match your query. Please try another name',
      delay: 3000
    });
    return
  }
  rfs.conteinerCard.insertAdjacentHTML('beforeend', listPicture(pictures));
  loadMoreBtn.show();
  loadMoreBtn.enable();
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

function clearConteiner() {
  rfs.conteinerCard.innerHTML = '';
}