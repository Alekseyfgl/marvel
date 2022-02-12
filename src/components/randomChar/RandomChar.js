import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import Spinner from "../spiner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";


class RandomChar extends Component {

    // ЕСЛИ У НАС ОБРАБОТЧИК НАЗНАЧЕН ЧЕРЕЗ addEventListener и мы перерисорвали страницу, то нужно обязательно удалить его, т.к. он будет хранить в памяти


    state = {
        char: {},
        loading: true,
        error: false,
    }


    marvelService = new MarvelService();


    _getNewChar() {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }


    componentDidMount() {
        this._getNewChar();
    }


    //для спинера
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false,
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    }

    getRandomChar = (char) => {
        this.setState({
            char,
            loading: true,
            error: false,
        });

        this._getNewChar();
    }


    render() {

        const {char, loading, error} = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">

                {errorMessage}
                {spinner}
                {content}


                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.getRandomChar}
                            className="button button__main">
                        <div className="inner">try it
                        </div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    let imgStyle = null
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'contain'};
    }

    return (

        <div className="randomchar__block">
            <img src={thumbnail}
                 style={imgStyle}
                 className="randomchar__img"
                 alt="Random character"/>


            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description : 'data not available'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;