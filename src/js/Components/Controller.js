import News from "./News";
import Widget from "./Widget";
import { CURRENT_URL } from './globals.js';
import WidgetApi from "./WidgetApi";

export default class Controller {
    constructor(container) {
        this.container = container;
    }

    createWidget() {
        const widgetApi = new WidgetApi(CURRENT_URL);

        const widget = new Widget(this.container);
        widget.renderWidget();
        widget.recentNewsHandler.push(widgetApi.getRecentNews);


        const news = new News(widget.newsContainerEl); 
        news.renderNews();
    }
}