import {elementOpen, elementClose, elementVoid, text, patch} from 'incremental-dom';
import select from 'select-dom';
import IncraCom from "@/incramental-component";
const baseComponent = {
	rootElm: document.createElement('div'),
	props: {},
	state: {},
	template () {
		return (<div></div>);
	},
	created () {},
	render (elm) {
		let root = null;
		if (!elm) {
            root = document.createElement('div');
		} else {
            root = select(elm);
		}
		this.rootElm = root;
		patch(root, () => {
            const temp = this.template();
            if (typeof temp.func === 'function') {
                temp.func()
            }
		});
	},
	update () {
        patch(this.rootElm, () => {
            const temp = this.template();
            if (typeof temp.func === 'function') {
                temp.func()
            }
        });
	},
	setState (data) {
        Object.assign(this.state, data);
        this.update();
	},
	updateProps (data) {
        Object.assign(this.props, data);
        this.update();
	}
};
module.exports = exports = baseComponent;
module.default = baseComponent;