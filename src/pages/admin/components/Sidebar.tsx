import { ReactElement, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { PiBuildings, PiIdentificationBadgeLight, PiPencilSimple } from 'react-icons/pi'

interface AdminSidebarProps {
  onClose?: () => void
}

const sidebarRoutes = [
  {
    path: '/admin/company-select',
    label: 'Selecionar Empresa',
    icon: <PiBuildings size="20px" />
  },
  {
    path: '/admin/users',
    label: 'Usuários',
    icon: <PiIdentificationBadgeLight size="20px" />
  },
  {
    path: '/admin/dynamic-form',
    label: 'Formulário Dinâmico',
    icon: <PiPencilSimple size="20px" />
  }
]

const AdminSidebar = memo(({ onClose }: AdminSidebarProps): ReactElement => {
  return (
    <Box as="nav" w="100%" p={4}>
      <Box mb={4} p={4} borderBottom="1px solid" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="bold">
          Admin
        </Text>
      </Box>
      <VStack align="stretch" spacing={2}>
        {sidebarRoutes.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            end
            onClick={onClose}
            style={({ isActive }) => ({
              textDecoration: 'none',
              width: '100%',
              color: isActive ? '#3182ce' : '#4A5568'
            })}
          >
            <Flex
              align="center"
              p={2}
              borderRadius="md"
              _hover={{ bg: 'gray.100' }}
              bg="transparent"
              transition="background-color 0.2s"
            >
              <Box mr={2}>{icon}</Box>
              <Text fontSize="md">{label}</Text>
            </Flex>
          </NavLink>
        ))}
      </VStack>
    </Box>
  )
})

export { AdminSidebar }