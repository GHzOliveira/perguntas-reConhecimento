import { useState } from 'react';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { PiNotePencilBold } from "react-icons/pi";
import { useStore } from '../../store/store';

const EditableText = () => {
  const { role, text, setText } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: { text } });

  const onSubmit = (data: { text: any; }) => {
    setText(data.text);
    setIsEditing(false);
  };

  return (
    <Flex align="center" gap="2">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('text')} autoFocus />
          <Button type="submit" colorScheme="blue" size="sm">
            Salvar
          </Button>
        </form>
      ) : (
        <>
          <Text mb={10}>{text}</Text>
          {role === 'ADM' && (
            <PiNotePencilBold cursor="pointer" onClick={() => setIsEditing(true)} />
          )}
        </>
      )}
    </Flex>
  );
};

export default EditableText;