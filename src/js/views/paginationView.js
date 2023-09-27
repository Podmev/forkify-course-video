import View from './View.js';

// parcel 1
//import icons from '../img/icons.svg'
// parcel 2
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = '';
  _message = '';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextButtonMarkup(curPage);
    }
    //Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevButtonMarkup(curPage);
    }
    // Others
    if (this._data.page < numPages) {
      return `
      ${this._generatePrevButtonMarkup(curPage)}
      ${this._generateNextButtonMarkup(curPage)}
    `;
    }
    // Page 1 and there are NO other pages
    return '';
  }

  _generatePrevButtonMarkup(curPage) {
    const goto = curPage - 1;
    return `
        <button data-goto="${goto}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${goto}</span>
        </button>
      `;
  }

  _generateNextButtonMarkup(curPage) {
    const goto = curPage + 1;
    return `
    <button data-goto="${goto}" class="btn--inline pagination__btn--next">
      <span>Page ${goto}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
  }
}

export default new PaginationView();
