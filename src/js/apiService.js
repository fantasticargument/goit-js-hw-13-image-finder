export default class NewsApiPhoto{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    fethArticls() {
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=22499502-59f4ba6839ef4b23507a26e20`)
            .then(respons => respons.json())
            .then(data => {
                this.page += 1;
                return data.hits;
            }); 
    }

    resetPsge() {
        this.page = 1;
    }

    get query(){
        return this.searchQuery
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
}