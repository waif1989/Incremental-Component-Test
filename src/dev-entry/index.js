import Vue from 'vue';
import {patch} from 'incremental-dom';
import IncraCom from 'demo';
import IncraCom2 from 'demo2';
import IcraCom3 from 'demo3';
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

    const instance3 = new IcraCom3({
	    className: 'coutonName',
	    title: 'IncreDom In RealDom',
	    num: 12
    });
	instance3.insert('#domapp');
    
    /*function reduce (val) {
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
    instance2.render('#domapp2');*/
}, false);