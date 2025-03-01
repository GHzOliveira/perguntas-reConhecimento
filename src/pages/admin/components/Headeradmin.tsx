import {
    Button,
    Flex,
    Hide,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Show,
  } from '@chakra-ui/react'
  import logo from '../../../assets/logo/logo_capital.svg'
  import { useNavigate } from 'react-router-dom'
import useAdminStore from '../../../store/useAdminStore'
import { HamburgerIcon } from '@chakra-ui/icons'

interface AdminHeaderProps {
    onOpenSidebar?: () => void
  }
  
  export const AdminHeader = ({ onOpenSidebar }: AdminHeaderProps) => {
    const navigate = useNavigate()
    const logout = useAdminStore(state => state.logout)
    
    const handleNavigateHome = () => {
      navigate('/')
    }

    const handleSelectCompany = () => {
      navigate('/admin/company-select')
    }

    const handleIdentification = () => {
      navigate('/identificacao/2')
    }

    const handleNavigateUsers = () => {
      navigate('/admin/users')
    }

    const handleNavigateDynamicForm = () => {
      navigate('/admin/dynamic-form')
    }
  
    const handleLogout = async () => {
      await logout();
      navigate('/')
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
        <Flex as="header" {...headerStyles}>
     <Show below="md">
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          onClick={onOpenSidebar}
          variant="ghost"
          color="white"
          size="lg"
        />
      </Show>
            <Image 
                src={logo} 
                onClick={handleNavigateDynamicForm} 
                {...logoStyles} 
            />
            <Hide below="md">
            <Menu>
                    <MenuButton as={Button}>Painel Admin</MenuButton>
                    <MenuList>
                        <MenuItem onClick={handleNavigateHome}>Página Inicial</MenuItem>
                        <MenuItem onClick={handleSelectCompany}>Selecionar Empresa</MenuItem>
                        <MenuItem onClick={handleIdentification}>Formulário Usuário</MenuItem>
                        <MenuItem onClick={handleNavigateUsers}>Usuários</MenuItem>
                        <MenuItem onClick={handleNavigateDynamicForm}>Formulário Dinâmico</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={handleLogout}>Sair</MenuItem>
                    </MenuList>
                </Menu>
            </Hide>
        </Flex>
    )
  }