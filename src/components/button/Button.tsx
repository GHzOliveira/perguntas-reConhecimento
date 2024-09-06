import React from 'react';
import { Button as ChakraButton } from '@chakra-ui/react';

interface BotaoProps {
  children: React.ReactNode;
  onClick?: () => void; 
  corFundo?: string; 
  corTexto?: string;
  tamanho?: string;
  largura?: string;
  [x: string]: any; 
}

const Botao: React.FC<BotaoProps> = ({
  children,
  onClick,
  corFundo = 'blue.500', 
  corTexto = 'white', 
  tamanho = 'md',
  largura = 'auto', 
  ...props
}) => {
  return (
    <ChakraButton
      onClick={onClick}
      bg={corFundo}
      color={corTexto}
      size={tamanho}
      width={largura}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Botao;