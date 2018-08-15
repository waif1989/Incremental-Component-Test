import {elementOpen, elementClose, elementVoid, text, patch} from 'incremental-dom';
const baseComponent = {
	rootElm: document.createElement('div'),
	props: {},
	state: {},
	template () {
		return (
			<div></div>
		);
	},
	created () {},
	render () {
		patch(this.rootElm, () => {
			this.template();
		});
	},
	update () {
		patch(this.rootElm, () => {
			this.template();
		});
	},
	setState () {},
	setProps () {}
};
module.exports = exports = baseComponent;
module.default = baseComponent;