import {elementOpen, elementClose, elementVoid, text, patch} from 'incremental-dom';
import select from 'select-dom';
const baseComponent = {
	initTemplate (temp) {
		this.temp = temp;
	},
	initProps (props) {
		this.props = props;
	},
	initState (state) {
		this.state = state;
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
            if (this.temp) {
                this.temp();
            } else {
                return (<div></div>);
            }
		});
	},
	update () {
        patch(this.rootElm, () => {
            this.temp();
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