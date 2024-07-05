import { Box, Image } from '@chakra-ui/react';
import logo from '../../assets/logo/logo_capital.svg';

export const Footer = () => (
  <Box as="footer" width="full" padding="2" marginTop="8" backgroundColor={'#1F7CBF'}>
    <Image src={logo} boxSize={"100px"} marginLeft={"5rem"}/>
  </Box>
);