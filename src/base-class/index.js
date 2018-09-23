import {elementOpen, elementClose, elementVoid, text, patch} from 'incremental-dom';
import select from 'select-dom';
import observe from 'smart-observe/dist/smart-observe.min';
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
	 * @param {string|object} elm - The element id or class which is for Inserting UI instance. | The element document object.
	 */
	insert (elm) {
		let root = null;
		if (!elm) {
			throw new Error('The arguments \'elm\' of insert function must be defined!');
		}
		if (typeof elm === 'string') {
			root = select(elm);
		} else {
			root = elm;
		}
		if (!root) {
			throw new Error('Can\'t find the element node');
		}
		for (const i in this.props) {
			observe(this.props, i, this.constructor._handlePropsChange.bind(this));
		}
		this.rootElm = root;
		this.beforeMounted();
		this.constructor._patch(this.rootElm, this);
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
			this.constructor._patch(this.rootElm, this);
		}
	}
	/**
	 * Differece the node change between new UI element and olds.
	 * @param {object} elm - The position of doucument's element for Inserting UI instance.
	 */
	static _patch (elm, ctx) {
		patch(elm, () => {
			ctx.render();
		});
	}
	static _handlePropsChange (newValue, oldValue) {
		// console.log('new---', newValue, 'old---', oldValue);
		// console.log('===', this.props);
		this.constructor._patch(this.rootElm, this);
	}
}
module.exports = exports = BaseIncreComponent;
module.default = BaseIncreComponent;