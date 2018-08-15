import COMMON_COM from 'baseCom';
const incraCom = (props) => {
	const myIncraCom = {};
	Object.setPrototypeOf(myIncraCom, COMMON_COM);
	return myIncraCom;
};
module.exports = exports = incraCom;
module.default = incraCom;