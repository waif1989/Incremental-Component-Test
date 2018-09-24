import {elementOpen, elementClose, elementVoid, text, patch as _patch} from 'incremental-dom';
import select from 'select-dom';
import observe from 'smart-observe/dist/smart-observe.min';
import deepAssign from 'deep-assign';
import cloneDeep from 'clone-deep';
/** Class BaseIncreComponent
 * Base Class of increment dom component.
 * */
class BaseIncreComponent {
	/**
	 * Create increment dom component.
	 * @param {object} props - The props value of instance.
	 */
	constructor (props) {
		this.__props__ = props;
		this.props = cloneDeep(props);
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
		for (const i in this.__props__) {
			observe(this.__props__, i, (newValue, oldValue) => {
				this.constructor.handlePropsChange.call(this, newValue, oldValue, i)
			});
		}
		this.rootElm = root;
		this.beforeMounted();
		this.constructor.patch(this.rootElm, this);
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
		const temp = {};
		const updateComponent = this.updateComponent(this.props, deepAssign(temp, this.state, data));
		// Judge updateComponent function result, If you want to execute UI update, UpdateComponent function will return true，execute patch function.
		if (typeof updateComponent === 'boolean' && updateComponent) {
			this.state = temp;
			this.constructor.patch(this.rootElm, this);
		}
	}
	/**
	 * Differece the node change between new UI element and olds.
	 * @static
	 * @param {object} elm - The position of doucument's element for Inserting UI instance.
	 */
	static patch (elm, ctx) {
		_patch(elm, () => {
			ctx.render();
		});
	}
	/**
	 * Handle props property change
	 * @static
	 * @param {any} newValue - The value of property after the props property change
	 * @param {any} oldValue - The value of property before the props property change
	 * @param {string} - The name of props property
	 */
	static handlePropsChange (newValue, oldValue, property) {
		const updateComponent = this.updateComponent(this.__props__, this.state);
		// Judge updateComponent function result, If you want to execute UI update, UpdateComponent function will return true，execute patch function.
		if (typeof updateComponent === 'boolean' && updateComponent) {
			this.props[property] = newValue;
			this.constructor.patch(this.rootElm, this);
		}
	}
}
module.exports = exports = BaseIncreComponent;
module.default = BaseIncreComponent;