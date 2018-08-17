import 'incremental-dom';
import COMMON_COM from 'baseCom';
import './index.less';
const incraCom = () => {
	const myIncraCom = {};
	Object.setPrototypeOf(myIncraCom, COMMON_COM);
    myIncraCom.initCom = function (props, reduceCb, addCb) {
        this.initProps(props);
        this.initState({
            val: 1000
        });
        const template =() => {
            return (
                <div class="content">
                    <div class={this.state.val < 1001 ? this.props.className : `${this.props.className} red`}>{this.props.title}↓</div>
                    <p>Props Name: {this.props.num}</p>
                    <div>
                        <button onclick={reduce}>-</button>
                        <input type="text" value={this.state.val}/>
                        <button onclick={add}>+</button>
                    </div>
                </div>
            );
        };
        this.initTemplate(template);
        const reduce = () => {
            const result = this.state.val - 1;
            /* ---------------------------------- */
            this.setState({
                val: result
            });
            /* ---------------------------------- */
            if (typeof reduceCb === 'function') {
                reduceCb(result);
            }
        };
        const add = () => {
            const result = this.state.val + 1;
            /* ---------------------------------- */
            this.setState({
                val: result
            });
            /* ---------------------------------- */
            if (typeof addCb === 'function') {
                addCb(result);
            }
        };
    };
	return myIncraCom;
};
module.exports = exports = incraCom;
module.default = incraCom;