import 'incremental-dom';
import BaseIncrClass from '../base-class';
class MyIncraCom3 extends BaseIncrClass {
	constructor (props) {
		super(props);
		this.state = {
			val: 1000
		};
		this.add = this.add.bind(this);
		this.reduce = this.reduce.bind(this);
	}
	add () {
        this.props.addCb(this.state.val + 1);
		this.setState({
			val: this.state.val + 1
		});
        // this.state.val++;
	}
	reduce () {
        this.props.redCb(this.state.val - 1);
		this.setState({
			val: this.state.val - 1
		});
	}
	willMounted () {
		// this.setState({
		// 	val: 998
		// });
	}
	didMounted () {
		// this.setState({
		// 	val: 1003
		// });
	}
	updateComponent (nextProps, nextState, next) {
		if (nextProps.title === 'hello world') {
            next();
		}
		if (nextState.val < 996) {
			return false;
		}
        next();
	}
    beforeDestroy (next) {
		console.log('I am ready to destroy');
        // next(); // snyc destroy
		setTimeout(() => {
            next(); // asnyc destroy
		}, 1000);
    }
	render () {
		let tmp = null;
        if (this.props.arrayTmp) {
            tmp = <div>{this.props.arrayTmp[0]}</div>
        } else {
            tmp = <div>noTmp</div>
        }
        const deep = <div>{this.props.deepObj.dd.ddd[0]},{this.props.deepObj.dd2}</div>
		return (
			<div class="content">
				<div
					class={this.state.val < 1001 ? this.props.className : `${this.props.className} red`}>{this.props.title}↓
				</div>
				<p>Props Name: {this.props.num}</p>
				{tmp}
				{deep}
				<div>
					<button onclick={this.reduce}>-</button>
					<input type="text" value={this.state.val}/>
					<button onclick={this.add}>+</button>
				</div>
			</div>
		);
	}
}
module.exports = exports = MyIncraCom3;
module.default = MyIncraCom3;