import {
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
        justifyContent="space-between"
        padding="4"
        backgroundColor={"#0AAE4B"}
        height={"8rem"}
      >
        <Image
          src={logo}
          boxSize={"200px"}
          marginLeft={"5rem"}
          onClick={handleNavigateHome}
        />
        {isLoggedIn && isAdmin && (
          <Botao
            onClick={() => navigate("/admin")}
            colorScheme="blue"
            bg={"hidden"}
            size={"lg"}
            mr="5rem"
          >
            Painel do ADM
          </Botao>
        )}
        {isLoggedIn && isAdmin ? (
          <Botao
            onClick={handleLogout}
            colorScheme="red"
            bg={"hidden"}
            size={"lg"}
            mr="5rem"
          >
            Sair
          </Botao>
        ) : (
          <Botao
            onClick={onOpen}
            colorScheme="teal"
            bg={"hidden"}
            size={"lg"}
            mr="5rem"
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
