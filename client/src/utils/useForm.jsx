import { useState } from 'react';

const UseForm = (submitCallback) => {
	const [state, setState] = useState({});

	const handleChange = (e) => {
		//e.presist();
		// setState((state) => ({ ...state, [e.target.name]: e.target.value }));
		console.log('This is USEFORM ++>', e.target.valu);
	};

	return [state, handleChange];
};

export default UseForm;
