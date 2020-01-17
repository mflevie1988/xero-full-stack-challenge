import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const DeleteConfirmation = ({
	modal,
	toggle,
	deleteProduct,
	prodName,
	type
}) => {
	return (
		<Modal isOpen={modal}>
			<ModalHeader toggle={toggle}>Modal title</ModalHeader>
			<ModalBody>
				<h4>
					Do you want to delete {`${prodName} `}{' '}
					{type === 'option' ? 'colour option' : 'product'}?
				</h4>
			</ModalBody>
			<ModalFooter>
				<Button color='danger' onClick={deleteProduct}>
					Yes
				</Button>{' '}
				<Button color='primary' onClick={toggle}>
					No
				</Button>
			</ModalFooter>
		</Modal>
	);
};
