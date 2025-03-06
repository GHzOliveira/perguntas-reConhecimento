import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
  } from '@chakra-ui/react';
  
  interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    formName: string;
    isLoading: boolean;
  }
  
  const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    formName,
    isLoading
  }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar Exclusão</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Você tem certeza que deseja excluir o formulário "{formName}"?
              Esta ação não pode ser desfeita.
            </Text>
          </ModalBody>
  
          <ModalFooter>
            <Button mr={3} onClick={onClose} isDisabled={isLoading}>
              Cancelar
            </Button>
            <Button 
              colorScheme="red" 
              onClick={onConfirm}
              isLoading={isLoading}
            >
              Excluir
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default DeleteConfirmModal;