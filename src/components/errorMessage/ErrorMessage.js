import img from './error.gif'

const ErrorMessage = () => {

    return (
        //обращение к файлам из папки public  это статичные файлы
        // <img src={process.env.PUBLIC_URL + '/error.gif'} alt={'this is error!!!'}/>
        <img src={img}
             style={{display: 'block', width: '250px', height: '250px', margin: '0 auto', objectFit: 'contain'}}
             alt='this is error'/>
    )
}

export default ErrorMessage;