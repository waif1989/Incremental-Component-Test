import Vue from 'vue';
import {patch} from 'incremental-dom';
import IncraCom from 'demo';
import IncraCom2 from 'demo2';
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
    
    function reduce (val) {
        console.log('Real DOM Parent Val:', val)
    }
    function add (val) {
        console.log('Real DOM Parent Val:', val)
    }
	const instance = Object.create(IncraCom2());
    instance.initCom({
        className: 'coutonName',
        title: 'IncreDom In RealDom',
        num: 1
    }, reduce, add);
    instance.render('#domapp');
    setTimeout(() => {
        instance.updateProps({
            num: 2
        });
    }, 3000);
    
    const instance2 = Object.create(IncraCom2());
    instance2.initCom({
        className: 'coutonName',
        title: 'IncreDom In RealDom2',
        num: -1
    });
    instance2.render('#domapp2');
    
    /*function render (data) {
        elementVoid('input', '', [ 'type', 'text' ]);
        elementOpen('div', '', null);
        if (data.someCondition) {
            text(data.text);
        }
        text(data.val);
        elementClose('div');
    }*/
    /*function inputHandlerCb (val) {
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
    }, 2500);*/
}, false);