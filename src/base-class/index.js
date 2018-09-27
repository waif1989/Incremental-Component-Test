/**
 * Increment-component --- By Ccw
 */
import {patch as _patch} from 'incremental-dom';
import select from 'select-dom';
import observe from 'smart-observe/dist/smart-observe';
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
		this.__isSetState__ = false;
		this.__props__ = props;
		this.props = cloneDeep(props);
		this.state = {};
		this.rootElm = null;
	}
	/**
	 * The life hook before the UI component be rendered into document.
	 */
    willMounted () {}
	/**
	 * The life hook after the UI component be rendered into document.
	 */
	didMounted () {}
	/**
	 * The life hook before the UI component be destroyed.
	 */
	beforeDestroy () {
		return true;
	}
	/**
	 * Destroy the component instance
	 */
	desIns () {
		const next = () => {
            this.rootElm.remove();
		};
		return this.beforeDestroy(next) && this.rootElm.remove();
	}
	/**
	 * The life hook when the UI component's state properties have changed.
	 * @param {object} nextProps - The value of props which has be changed.
	 * @param {object} nextState - The value of state which has be changed.
	 * @return {boolean} - Returning boolean value which notices UI component should be updated or not.
	 */
	updateComponent (nextProps, nextState, next) {
		return true;
	}
	/**
	 * Insert UI instance to other components.
	 * @param {string|object} elm - The element id or class which is for Inserting UI instance. | The element document object.
	 */
	insert (elm) {
		this.constructor.createRootElm.call(this, elm);
		this.constructor.bindProps.call(this);
		this.constructor.bindState.call(this);
		this.willMounted();
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
		const next = () => {
            this.__isSetState__ = true;
            deepAssign(this.state, data);
            this.constructor.patch(this.rootElm, this);
		};
		const temp = {};
		return this.updateComponent(this.props, deepAssign(temp, this.state, data), next) && next();
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
	 * @param {*} newValue - The value of property after the props property change
	 * @param {*} oldValue - The value of property before the props property change
	 * @param {string} - The name of props property
	 */
	static handlePropsChange (newValue, oldValue, property) {
        const next = () => {
            this.props[property] = newValue;
            this.constructor.patch(this.rootElm, this);
        };
        return this.updateComponent(this.__props__, this.state, next) && next();
	}
    /**
     * Set root element
     * @static
     * @param {string|object} elm - The root of parent's component which your component wish to insert
     */
	static createRootElm (elm) {
        let root = null;
        if (!elm) {
            throw new Error('The arguments \'elm\' of \'insert\' function must be defined!');
        }
        if (typeof elm === 'string') {
            root = select(elm);
        } else {
            root = elm;
        }
        if (!root) {
            throw new Error('Can\'t find the element node');
        }
        this.rootElm = root;
	}
	/**
	 * Bind props property use Object.defineProperty
	 * @static
	 * */
	static bindProps () {
        for (const i in this.__props__) {
            if (this.__props__.hasOwnProperty(i)) {
                observe.watch(this.__props__, i, (newValue, oldValue) => {
                    this.constructor.handlePropsChange.call(this, newValue, oldValue, i)
                }, {
                    deep: true
                });
            }
        }
	}
    /**
     * Bind state property use Object.defineProperty
     * @static
     * */
	static bindState () {
        for (const j in this.state) {
            if (this.state.hasOwnProperty(j)) {
                observe.watch(this.state, j, (newValue, oldValue) => {
                    if (!this.__isSetState__) {
                        this.state[j] = oldValue;
                        this.__isSetState__ = true;
                        console.error('Must use setState to update!');
                    } else {
                        this.__isSetState__ = false;
                    }
                }, {
                    deep: true
                });
            }
        }
	}
}
module.exports = exports = BaseIncreComponent;
module.default = BaseIncreComponent;