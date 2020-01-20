import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import './search-box.styles.css';

export const SearchBox = ({ placeholder, handleChange, searchClick }) => (
	<InputGroup>
		<Input
			type='search'
			placeholder={placeholder}
			onChange={handleChange}
		/>
		<InputGroupAddon addonType='append'>
			<Button color='success' onClick={searchClick}>
				<i className='fa fa-search'></i>
			</Button>
		</InputGroupAddon>
	</InputGroup>
);
