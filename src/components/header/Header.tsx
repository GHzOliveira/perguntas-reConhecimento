import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../../assets/logo/logo_capital.svg";
import { useForm } from "react-hook-form";
import Botao from "../button/Button";
import useAdminStore from "../../store/useAdminStore";
import { loginAdmin } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const isLoggedIn = useAdminStore((state) => state.isLoggedIn);
  const isAdmin = useAdminStore((state) => state.isAdmin);
  const logout = useAdminStore((state) => state.logout);

  const onSubmit = async (data: any) => {
    const { login: username, password } = data;
    try {
      const response = await loginAdmin(username, password);
      if (response.success) {
        useAdminStore.getState().login(true);
        onClose();
      } else {
        alert("Credenciais inválidas.");
      }
    } catch (error: any) {
      console.error("Erro ao tentar logar", error);
      alert("Erro ao tentar logar. Por favor, tente novamente mais tarde.");
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Flex
        as="header"
        width="full"
        align="center"
        justifyContent="space-around"
        backgroundColor={"#1F7CBF"}
        flexDirection="row"
        boxShadow="10px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)"
      >
        <Image
          src={logo}
          boxSize={["150px", "120px"]}
          mr={["2rem", "12rem"]}
          onClick={handleNavigateHome}
          cursor="pointer"
          alignSelf={["center", "auto"]}
        />
        {isLoggedIn && isAdmin ? (
          <>
            <Menu>
              <MenuButton as={Button}>
                Bem vindo!
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate("/admin")}>
                  Painel Administrador
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Botao
            onClick={onOpen}
            bg={"white"}
            color={"#1F7CBF"}
            size={["md", "lg"]}
            mr={["2rem", "5rem"]}
            alignSelf={["center", "auto"]}
          >
            Login
          </Botao>
        )}
      </Flex>
      {!isLoggedIn && (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Entrar na página de Administrador</DrawerHeader>

            <DrawerBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input placeholder="Login" {...register("login")} mb={4} />
                <Input
                  placeholder="Senha"
                  type="password"
                  {...register("password")}
                  mb={4}
                />
                <Botao type="submit" colorScheme="green">
                  Entrar
                </Botao>
              </form>
            </DrawerBody>

            <DrawerFooter>
              <Botao variant="outline" mr={3} onClick={onClose}>
                Cancelar
              </Botao>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
