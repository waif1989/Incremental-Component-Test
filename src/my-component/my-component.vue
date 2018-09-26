<template>
	<div>
		<p>My Vue Component↓</p>
		<div id="vue-inside"></div>
		<p>{{title}}</p>
	</div>
</template>

<script>
import IncraCom from 'demo';
import IncraCom2 from 'demo2';
import IcraCom3 from 'demo3';
import {patch} from 'incremental-dom';
export default {
    name: 'MyComponent',
	data () {
    	return {
    		val: 100,
            title: 'Test VUE'
		}
	},
	created () {
		setTimeout(() => {
			this.val = 900;
		}, 3000);
	},
	mounted () {
        const props = {
            className: 'coutonName',
            title: this.title,
            num: 1,
	        arrayTmp: [10, 11]
        };
        const instance3 = new IcraCom3(props);
        instance3.insert('#vue-inside');
        setTimeout(() => {
            // props.title = 'hello world1'; // new RAM address
            this.title = 'hello world2'; // 'props.title' RAM not change
            props.arrayTmp.$set(0, 99); // new RAM address
        }, 1000);
	}
}
</script>

<style scoped>

</style>