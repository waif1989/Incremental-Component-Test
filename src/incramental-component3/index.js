import 'incremental-dom';
import BaseIncreComponent from '../base-class';
class MyIncraCom3 extends BaseIncreComponent {
	constructor (props) {
		super(props);
		this.state = {
			val: 1000
		};
		this.add = this.add.bind(this);
		this.reduce = this.reduce.bind(this);
	}
	add () {
		this.setState({
			val: this.state.val + 1
		});
	}
	reduce () {
		this.setState({
			val: this.state.val - 1
		});
	}
	beforeMounted () {
		// console.log('---', this.__props__, this.props);
		
		// this.setState({
		// 	val: 998
		// });
	}
	didMounted () {
		// this.setState({
		// 	val: 1003
		// });
	}
	updateComponent (nextProps, nextState) {
         console.log('***', nextProps, this.props)
		// console.log(nextState, this.state, this.props, nextProps);
		// console.log('===', nextProps);
		if (nextProps.title === 'hello world') {
			return true;
		}
		if (nextState.val < 996) {
			return false;
		}
		return true;
	}
	render () {
		let tmp = null;
        if (this.props.arrayTmp) {
            tmp = <div>{this.props.arrayTmp[0]}</div>
        } else {
            tmp = <div>noTmp</div>
        }
		return (
			<div class="content">
				<div
					class={this.state.val < 1001 ? this.props.className : `${this.props.className} red`}>{this.props.title}↓
				</div>
				<p>Props Name: {this.props.num}</p>
				{tmp}
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