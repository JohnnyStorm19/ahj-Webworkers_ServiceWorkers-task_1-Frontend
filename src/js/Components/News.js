import '../../css/news-style.css';

export default class News {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    getNewsMarkup() {
        return `
            <div class="news-item">
                <span class="news-date">
                    <span class="loader"></span>
                </span>
                <span class="news-logo">
                    <span class="loader"></span>
                </span>
                <div class="news-content">
                    <div class="news-content-pre"></div>
                    <div class="news-content-pre"></div>
                </div>
            </div>
        `
    }

    renderNews() {
        const newsMarkup = this.getNewsMarkup();

        //! убрать потом
        this.parentEl.insertAdjacentHTML('beforeend', newsMarkup);
        this.parentEl.insertAdjacentHTML('beforeend', newsMarkup);
        this.parentEl.insertAdjacentHTML('beforeend', newsMarkup);

        this.newsDateEl = this.parentEl.querySelector('.news-date');
        this.newsInfoEl = this.parentEl.querySelector('.news-info');
        this.newsLogoEl = this.parentEl.querySelector('.news-logo');
        this.newsContentEl = this.parentEl.querySelector('.news-content');
    }
}