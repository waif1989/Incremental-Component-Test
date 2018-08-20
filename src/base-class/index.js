import {elementOpen, elementClose, elementVoid, text, patch} from 'incremental-dom';
import select from 'select-dom';
class BaseIncreComponent {
	constructor (props) {
		this.props = props;
		this.state = {};
		this.rootElm = null;
	}
	beforeMounted () {}
	didMounted () {}
	beforeDestroy () {}
	destroy () {}
	update (elm) {
		patch(elm, () => {
			this.setTemplate();
		});
	}
	insert (elm) {
		let root = null;
		if (!elm) {
			root = document.createElement('div');
		} else {
			root = select(elm);
		}
		this.rootElm = root;
		const beforeMounted = this.beforeMounted();
		if (typeof beforeMounted !== 'boolean' && !beforeMounted) {
			this.render(this.rootElm);
			this.didMounted();
		}
	}
	render (elm) {
		this.update(elm);
	}
	setTemplate () {
		return (<div></div>);
	}
	setState (data) {
		Object.assign(this.state, data);
		this.update(this.rootElm);
	}
}
module.exports = exports = BaseIncreComponent;
module.default = BaseIncreComponent;