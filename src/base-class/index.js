import {elementOpen, elementClose, elementVoid, text, patch} from 'incremental-dom';
import select from 'select-dom';
/** Class BaseIncreComponent
 * Base Class of increment dom component.
 * */
class BaseIncreComponent {
	/**
	 * Create increment dom component.
	 * @param {object} props - The props value of instance.
	 */
	constructor (props) {
		this.props = props;
		this.state = {};
		this.rootElm = null;
	}
	/**
	 * The life hook before the UI component be rendered into document.
	 */
	beforeMounted () {}
	/**
	 * The life hook after the UI component be rendered into document.
	 */
	didMounted () {}
	/**
	 * The life hook before the UI component be destroyed.
	 */
	beforeDestroy () {}
	/**
	 * The life hook after the UI component be destroyed.
	 */
	destroy () {}
	/**
	 * The life hook when the UI component's state properties have changed.
	 * @param {object} nextProps - The value of props which has be changed.
	 * @param {object} nextState - The value of state which has be changed.
	 * @return {boolean} - Returning boolean value which notices UI component should be updated or not.
	 */
	updateComponent (nextProps, nextState) {
		return true;
	}
	/**
	 * Insert UI instance to other components.
	 * @param {string} elm - The position of doucument's element for Inserting UI instance.
	 */
	insert (elm) {
		let root = null;
		if (!elm) {
			throw new Error('The arguments \'elm\' of insert function must be defined!');
		} else {
			root = select(elm);
		}
		this.rootElm = root;
		this.beforeMounted();
		this._patch(this.rootElm);
		this.didMounted();
	}
	/**
	 * Render UI componment.
	 * @abstract
	 * @return {JSX}
	 */
	render () {
		throw new Error('Render function must be implemented by subclass!');
	}
	/**
	 * Change the state value
	 * @param {object} data - The new value of state property
	 */
	setState (data) {
		const updateComponent = this.updateComponent(this.props, Object.assign({}, this.state, data));
		// 判断updateComponent函数的结果，如果用户想触发update的时候，函数返回为true，执行patch函数更新
		if (typeof updateComponent === 'boolean' && updateComponent) {
			Object.assign(this.state, data);
			this._patch(this.rootElm);
		}
	}
	/**
	 * Differece the node change between new UI element and olds.
	 * @param {object} elm - The position of doucument's element for Inserting UI instance.
	 */
	_patch (elm) {
		patch(elm, () => {
			this.render();
		});
	}
}
module.exports = exports = BaseIncreComponent;
module.default = BaseIncreComponent;