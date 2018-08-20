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
	updateComponent () {}
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
			this._patch(this.rootElm);
			this.didMounted();
		}
	}
	render () {
		return (<div></div>);
	}
	setState (data) {
		Object.assign(this.state, data);
		const updateComponent = this.updateComponent();
		if (typeof updateComponent !== 'boolean' && !updateComponent) {
			this._patch(this.rootElm);
		}
	}
	_patch (elm) {
		patch(elm, () => {
			this.render();
		});
	}
}
module.exports = exports = BaseIncreComponent;
module.default = BaseIncreComponent;