import {elementOpen, elementClose, elementVoid, text} from 'incremental-dom';
export default (data, inputCb) => {
    function inputHandler (e) {
        console.log('In Incramental Component:', e.target.value);
        if (typeof inputCb === 'function') {
            inputCb(e.target.value);
        }
    }
    return (
        <div class="container">
            <input type="text" oninput={inputHandler}/>
            <div>{data.someCondition ? data.text: ''}{data.val}</div>
        </div>
    );
};