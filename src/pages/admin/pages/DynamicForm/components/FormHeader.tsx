import { Divider, Text } from '@chakra-ui/react';

interface FormHeaderProps {
  title: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title }) => {
  return (
    <>
      <Text fontSize={{ base: 'lg', md: 'xl' }} mb={4}>
        {title}
      </Text>
      <Divider mb={4} />
    </>
  );
};

export default FormHeader;