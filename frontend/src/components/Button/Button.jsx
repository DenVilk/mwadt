import {Component} from 'react';
import "./Button.css";

export default class Button extends Component{
    render() {
        return <button className={'btn ' + this.props.color} {...this.props}>{this.props.children}</button>
    }
}
