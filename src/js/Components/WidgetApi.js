export default class WidgetApi {
    constructor(currentUrl) {
        this.currentUrl = currentUrl;
    }

    getRecentNews = async() => {
        const response = await fetch(this.currentUrl + '/news/recent-news');
        
        if (response.success === false) {
            console.error(await response.json());
            return;
        }
        // return response.json();
        // console.log(await response.json(), 'Все хорошо!');
        return response;
    }
}