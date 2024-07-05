import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: string | JSX.Element;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, title, body }) => {
  return (
	<Modal isOpen={isOpen} onClose={onClose}>
	  <ModalOverlay />
	  <ModalContent>
		<ModalHeader>{title}</ModalHeader>
		<ModalCloseButton />
		<ModalBody>
		  {body}
		</ModalBody>
		<ModalFooter>
		  <Button colorScheme="blue" mr={3} onClick={onClose}>
			Fechar
		  </Button>
		</ModalFooter>
	  </ModalContent>
	</Modal>
  );
};

export default CustomModal;