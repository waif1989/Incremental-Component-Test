<template>
	<div>
		<p>My Vue Component↓</p>
		<div id="vue-inside"></div>
	</div>
</template>

<script>
import IncraCom from 'demo';
import IncraCom2 from 'demo2';
import {patch} from 'incremental-dom';
export default {
    name: 'MyComponent',
	/*mounted () {
        function inputHandlerCb (val) {
            console.log('In Vue Parent:', val);
        }
        function setStateData (data = {}, myElement, _data) {
            Object.assign(_data, data);
            patch(myElement, function() {
                IncraCom(_data, inputHandlerCb);
            });
        }
        const data = {
            text: 'Vue Inside!',
            val: 1,
            someCondition: true
        };
        const myElement = document.getElementById('vue-inside');
        patch(myElement, () => {
            IncraCom(data, inputHandlerCb);
        });
        setTimeout(() => {
            setStateData({
                text: 'Vue Inside Change!',
                val: 2,
            }, myElement, data);
        }, 1500);
        setTimeout(() => {
            setStateData({
                text: 'Vue Inside End!'
            }, myElement, data);
        }, 2500);
	}*/
	mounted () {
        function reduce (val) {
            console.log('Vue Parent Val:', val)
        }
        function add (val) {
            console.log('Vue Parent Val:', val)
        }
        const instance = Object.create(IncraCom2());
        instance.initCom({
            className: 'coutonName2',
            title: 'IncreDom In Vue',
            num: 90
        }, reduce, add);
        instance.render('#vue-inside');
        setTimeout(() => {
            instance.updateProps({
                num: 91
            });
        }, 2000);
	}
}
</script>

<style scoped>

</style>