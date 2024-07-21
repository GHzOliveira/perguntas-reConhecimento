import {
  Box,
  VStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'
import { ReactElement, useState } from 'react'
import {
  PiHouse,
  PiIdentificationBadgeLight,
  PiTextAlignJustifyLight
} from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/button/Button'

type SidebarRoute = {
  path: string
  label: string
  icon: ReactElement
}

const sidebarRoutes: SidebarRoute[] = [
  {
    path: '/admin',
    label: 'Tabela de usuários  ',
    icon: <PiHouse style={{ marginRight: '1rem' }} />
  },
  {
    path: '/admin/identificacao',
    label: 'Identificação',
    icon: (
      <PiIdentificationBadgeLight
        size={'19px'}
        style={{ marginRight: '1rem' }}
      />
    )
  }
]

export const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string>('')
  const sidebarWidth = useBreakpointValue({ base: 'full', md: '250px' })
  const isDrawer = useBreakpointValue({ base: true, md: false })
  const sidebarHeight = 'calc(90vh - 60px)'

  const navigateTo = (path: string): void => {
    navigate(path)
    setSelected(path)
  }

  const SidebarContent = (): ReactElement => (
    <VStack align="stretch" spacing={4}>
      {sidebarRoutes.map(({ path, label, icon }) => (
        <Button
          key={path}
          variant={selected === path ? 'solid' : 'ghost'}
          onClick={() => navigateTo(path)}
          border={selected === path ? '#1F7CBF' : undefined}
          bg={selected === path ? '#1F7CBF' : undefined}
          color="black"
          fontWeight="normal"
        >
          {icon}
          {label}
        </Button>
      ))}
    </VStack>
  )

  return (
    <>
      {isDrawer ? (
        <IconButton
          icon={<PiTextAlignJustifyLight />}
          onClick={onOpen}
          aria-label="Open Menu"
          size="lg"
          m={2}
        />
      ) : null}
      {isDrawer ? (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <Box
          w={sidebarWidth}
          p={5}
          bg="#FFFFFF"
          height={sidebarHeight}
          borderRight="1px solid #1F7CBF"
          boxShadow="2xl"
        >
          <SidebarContent />
        </Box>
      )}
    </>
  )
}
