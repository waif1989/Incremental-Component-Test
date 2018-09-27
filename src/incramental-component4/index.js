import 'incremental-dom';
import BaseIncrClass from '../base-class';
class MyIncraCom4 extends BaseIncrClass {
    constructor (props) {
        super(props);
        this.state = {
            val: 40
        };
        this.add = this.add.bind(this);
    }
    add () {
        this.setState({
            val: this.state.val + 1
        });
    }
    willMounted () {
        setTimeout(() => {
            this.setState({
                val: 50
            }, 1000);
        })
    }
    render () {
        return (
            <div class="child-component">
                <div>Child props:{this.props.val}</div>
                <div>Child val:{this.state.val}</div>
                <button onclick={this.add}>+</button>
            </div>
        )
    }
}
module.exports = exports = MyIncraCom4;
module.default = MyIncraCom4;