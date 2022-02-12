import {Component} from "react";

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    static getDerivedStateFromError() {
        return  {error: true};
    }

    //можно и так, но лучше 1 способ (тот что выше)
    // componentDidCatch(error, errorInfo) {
    //     console.log('error------------->>>>>>',error, errorInfo);
    //     this.setState({
    //         error: true,
    //     })
    // }


    render() {
        if (this.state.error) {
            return (
                <h2>Something went wrong</h2>
            );
        }

        return this.props.children;
    }
}


export default ErrorBoundary;