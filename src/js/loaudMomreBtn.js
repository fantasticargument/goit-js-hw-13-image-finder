export default class LoadMoreBtn {
  constructor({ selector, hidden = false }) {
    this.rfs = this.getRfs(selector);

    hidden && this.hide();
  }

  getRfs(selector) {
    const rfs = {};
    rfs.button = document.querySelector(selector);
    rfs.label = rfs.button.querySelector('.label');
    rfs.spinner = rfs.button.querySelector('.loader');
    return rfs;
  }

  enable() {
    this.rfs.button.disabled = false;
    this.rfs.label.textContent = 'Show more...';
    this.rfs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.rfs.button.disabled = true;
    this.rfs.label.textContent = 'load...';
    this.rfs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.rfs.button.classList.remove('is-hidden');
  }

  hide() {
    this.rfs.button.classList.add('is-hidden');
  }
}