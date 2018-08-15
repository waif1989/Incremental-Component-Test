import Vue from 'vue';
import {patch} from 'incremental-dom';
import IncraCom from 'demo';
import ReactRender from '../react-component';
import MyComponent from '../my-component';
new Vue({
	el: '#vueapp',
	components: {
        MyComponent
	},
	data: {}
});
window.addEventListener('DOMContentLoaded', () => {  // 添加DOMContentLoaded事件
    ReactRender('reactapp');
    /*function render (data) {
        elementVoid('input', '', [ 'type', 'text' ]);
        elementOpen('div', '', null);
        if (data.someCondition) {
            text(data.text);
        }
        text(data.val);
        elementClose('div');
    }*/
    function inputHandlerCb (val) {
        console.log('In Read Dom Parent:', val);
    }
    function setStateData (data = {}, myElement, _data) {
        Object.assign(_data, data);
        patch(myElement, function() {
            IncraCom(_data, inputHandlerCb);
        });
    }
    const data = {
        text: 'Read Dom!',
        val: 3,
        someCondition: true
    };
    const myElement = document.getElementById('domapp');
    patch(myElement, () => {
        IncraCom(data, inputHandlerCb);
    });
    setTimeout(() => {
        setStateData({
            text: 'Read Dom Change!',
            val: data.val + 5,
        }, myElement, data);
    }, 1500);
    setTimeout(() => {
        setStateData({
            text: 'Read Dom End!'
        }, myElement, data);
    }, 2500);
}, false);