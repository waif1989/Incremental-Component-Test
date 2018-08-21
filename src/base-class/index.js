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
	updateComponent (nextProps, nextState) {
		return true;
	}
	insert (elm) {
		let root = null;
		if (!elm) {
			root = document.createElement('div');
		} else {
			root = select(elm);
		}
		this.rootElm = root;
		this.beforeMounted();
		this._patch(this.rootElm);
		this.didMounted();
	}
	render () {
		return (<div></div>);
	}
	setState (data) {
		const updateComponent = this.updateComponent(this.props, Object.assign({}, this.state, data));
		if (typeof updateComponent === 'boolean' && updateComponent) {
			Object.assign(this.state, data);
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