import React from 'react';
//import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from './App.js';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('shows all the components', () => {
	const div = document.createElement('div');

	ReactDOM.render(<App />, div);

	console.log(div);

	ReactDOM.unmountComponentAtNode(div);
});
