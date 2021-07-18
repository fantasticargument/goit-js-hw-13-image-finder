export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.rfs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const rfs = {};
    rfs.button = document.querySelector(selector);
    // rfs.label = rfs.button.querySelector('.label');
    rfs.spinner = rfs.button.querySelector('span');

    return rfs;
  }

  enable() {
    this.rfs.button.disabled = false;
    this.rfs.button.textContent = 'find more';
    // this.rfs.spinner.classList.add('loader');
  }

  disable() {
    this.rfs.button.disabled = true;
    this.rfs.button.textContent = 'Loading...';
    // this.rfs.spinner.classList.remove('loader');
  }

  show() {
    this.rfs.button.classList.remove('is-hidden');
  }

    hide() {
    this.rfs.button.classList.add('is-hidden');
  }
}