import React from 'react';
import ReactDOM from 'react-dom';
import IncraCom from 'demo';
import IncraCom2 from 'demo2';
import {patch} from 'incremental-dom';
class App extends React.Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        const instance = Object.create(IncraCom2());
        instance.initCom({
            className: 'coutonName3',
            title: 'IncreDom In React',
            num: 100
        });
        instance.render('#react-child');
        setTimeout(() => {
            instance.updateProps({
                num: 101
            });
        }, 1000);
        /*function inputHandlerCb (val) {
            console.log('In React Parent:', val);
        }
        function setStateData (data = {}, myElement, _data) {
            Object.assign(_data, data);
            patch(myElement, function() {
                IncraCom(_data, inputHandlerCb);
            });
        }
        const data = {
            text: 'React Inside!',
            val: 5,
            someCondition: true
        };
        const myElement = document.getElementById('react-child');
        patch(myElement, () => {
            IncraCom(data, inputHandlerCb);
        });
        setTimeout(() => {
            setStateData({
                text: 'React Inside Change!',
                val: 6,
            }, myElement, data);
        }, 1500);
        setTimeout(() => {
            setStateData({
                text: 'React Inside End!'
            }, myElement, data);
        }, 2500);*/
    }
    render () {
        return (
            <div className="react-app">
                <p>My React Component↓</p>
                <div id="react-child"></div>
            </div>
        );
    }
}
function ReactRender (id) {
    const rootElement = document.getElementById(id);
    ReactDOM.render(<App />, rootElement);
}
export default ReactRender;

