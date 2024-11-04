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
  UseDisclosureProps
} from '@chakra-ui/react'
import logo from '../../assets/logo/logo_capital.svg'
import { useForm } from 'react-hook-form'
import Botao from '../button/Button'
import useAdminStore from '../../store/useAdminStore'
import { loginAdmin } from '../../api/api'
import { useNavigate } from 'react-router-dom'

interface LoginForm {
  login: string
  password: string
}

export const Header = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<LoginForm>()
  const isLoggedIn = useAdminStore(state => state.isLoggedIn)
  const isAdmin = useAdminStore(state => state.isAdmin)
  const logout = useAdminStore(state => state.logout)

  const menuDisclosure = useDisclosure()

  const onSubmit = async (data: LoginForm) => {
    const { login: username, password } = data
    try {
      const response = await loginAdmin(username, password)
      if (response.success) {
        useAdminStore.getState().login(true)
        onClose()
      } else {
        alert('Credenciais inválidas.')
      }
    } catch (error: any) {
      console.error('Erro ao tentar logar', error)
      alert('Erro ao tentar logar. Por favor, tente novamente mais tarde.')
    }
  }

  const handleNavigateHome = () => {
    navigate('/')
    menuDisclosure.onClose()
  }

  const handleNavigateAdmin = () => {
    navigate('/admin')
    menuDisclosure.onClose()
  }

  const handleLogout = () => {
    logout()
    menuDisclosure.onClose()
  }

  const headerStyles = {
    w: 'full',
    alignItems: 'center',
    justifyContent: 'space-around',
    bg: '#1F7CBF',
    flexDir: 'row',
    boxShadow:
      '10px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)'
  } as const

  const logoStyles = {
    boxSize: ['150px', '120px'],
    mr: ['2rem', '12rem'],
    cursor: 'pointer',
    alignSelf: ['center', 'auto']
  }

  return (
    <>
      <Flex as="header" {...headerStyles}>
        <Image src={logo} onClick={handleNavigateHome} {...logoStyles} />
        {isLoggedIn && isAdmin ? (
          <div>
            <Menu>
              <MenuButton as={Button}>Bem vindo!</MenuButton>
              <MenuList>
                <MenuItem onClick={handleNavigateAdmin}>
                  Painel Administrador
                </MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </MenuList>
            </Menu>
          </div>
        ) : (
          <Botao
            onClick={onOpen}
            bg={'white'}
            color={'#1F7CBF'}
            size={['md', 'lg']}
            mr={['2rem', '5rem']}
            alignSelf={['center', 'auto']}
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
                <Input
                  placeholder="Login"
                  {...register('login')}
                  mb={4}
                  isDisabled={isSubmitting}
                />
                <Input
                  placeholder="Senha"
                  type="password"
                  {...register('password')}
                  mb={4}
                  isDisabled={isSubmitting}
                />
                <Botao
                  type="submit"
                  colorScheme="green"
                  isLoading={isSubmitting}
                >
                  Entrar
                </Botao>
              </form>
            </DrawerBody>

            <DrawerFooter>
              <Botao
                variant="outline"
                mr={3}
                onClick={onClose}
                isDisabled={isSubmitting}
              >
                Cancelar
              </Botao>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
