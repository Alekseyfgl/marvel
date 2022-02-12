class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=1bcf8471890c798cf5449560c3d86f78';
    _baseOffSet = '210';


    getResource = async (url) => {

        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }


    getAllCharacters = async (offset = this._baseOffSet) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    //не забываем про async / await т.к. у нас getResource ассинхронная функция
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);

        return this._transformCharacter(res.data.results[0]);
    }


    _transformCharacter = (characterPath) => {
        //получаем данные и возвращаем объект
        return {
            id: characterPath.id,
            name: characterPath.name,
            description: characterPath.description,
            thumbnail: `${characterPath.thumbnail.path}.${characterPath.thumbnail.extension}`,
            homepage: characterPath.urls[0].url,
            wiki: characterPath.urls[1].url,
            comics: characterPath.comics.items,
        }
    }
}

export default MarvelService;