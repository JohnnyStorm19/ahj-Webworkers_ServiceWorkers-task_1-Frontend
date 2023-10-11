import '../../css/widget-style.css';

export default class Widget {
    constructor(container) {
        this.container = container;

        this.recentNewsHandler = [];
    }

    getWidgetMarkup() {
        return `
            <div class="widget-container">
                <header class="widget-header">
                    <h2 class="widget-title">Новости мира и кино</h2>
                    <span class="widget-reload">Обновить</span>
                </header>
                <main class="widget-news-container"></main>
            </div>
        `
    }

    renderWidget() {
        const widgetMarkup = this.getWidgetMarkup();
        this.container.insertAdjacentHTML('beforeend', widgetMarkup);

        this.widgetContainer = this.container.querySelector('.widget-container');
        this.newsContainerEl = this.container.querySelector('.widget-news-container');
        this.reloadBtn = this.container.querySelector('.widget-reload');

        this.addListeners();
    }

    addListeners() {
        this.reloadBtn.addEventListener('click', this.getRecentNews);
    }

    getRecentNews = async() => {
        this.deleteUnableToConnectEl();

        this.recentNewsHandler.forEach(async handler => {
            const response = await handler();
            console.log(response);
            if (!response.ok) {
                const widgetContainer = document.querySelector('.widget-container');
                widgetContainer.append(this.getUnableToConnectEl());
                return;
            } 
            console.log({ response: await response.json(), comments: 'Вставляем сообщения в виджет' })
        //    return { response: await response.json(), comments: 'Вставляем сообщения в виджет' };
        });
    }

    getUnableToConnectEl = ()  => {
        this.unableEl = document.createElement('div');
        this.unableEl.classList.add('unable-to-connect');

        const paragraphEl = document.createElement('p');
        paragraphEl.classList.add('unable-text');
        paragraphEl.textContent = 'Не удалось загрузить данные. Проверьте подключение к интернету или перезагрузите страницу';
        
        
        const removerEl = document.createElement('span');
        removerEl.classList.add('remover');

        removerEl.addEventListener('click', () => {
            console.log('deleted!')
            this.deleteUnableToConnectEl();
        })

        this.unableEl.append(paragraphEl);
        this.unableEl.append(removerEl);

        return this.unableEl;
    }

    deleteUnableToConnectEl = () => {
        if (this.unableEl) {
            this.unableEl.remove();
            this.unableEl = false;
        } 
    }
}