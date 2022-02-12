import './charList.scss';
import PropTypes from 'prop-types';
import Spinner from "../spiner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";
import {Component} from "react";

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1537,
        charEnded: null,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {

        this.onCharListLoading();

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onCharsLoaded = (newCharList) => {
        //проверка на пустой массив для удаления кнопки
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        //на основе предыдущего состояния
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }


    renderItems(arr) {
        const items = arr.map(item => {

            //динамические стили
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'};
            }

            return (
                <li onClick={() => this.props.onCharSelected(item.id)}
                    className="char__item"
                    key={item.id}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button onClick={() => this.onRequest(offset)}
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;