import { AppShell, Sidebar as SaasSidebar } from '@saas-ui/react'
import { 
    Box, 
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerBody,
    useDisclosure,
    useBreakpointValue
} from '@chakra-ui/react'
import { AdminSidebar } from '../components/Sidebar'
import { AdminHeader } from '../components/Headeradmin'

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
      <AppShell
          height="100vh"
          navbar={<AdminHeader onOpenSidebar={onOpen} />}
          sidebar={
              !isMobile ? (
                  <SaasSidebar>
                      <AdminSidebar />
                  </SaasSidebar>
              ) : undefined
          }
      >
          <Drawer 
              isOpen={isOpen} 
              placement="left" 
              onClose={onClose}
          >
              <DrawerOverlay />
              <DrawerContent>
                  <DrawerBody p={0}>
                      <AdminSidebar onClose={onClose} />
                  </DrawerBody>
              </DrawerContent>
          </Drawer>
          <Box flex="1" bg="gray.50" p={4}>
              {children}
          </Box>
      </AppShell>
  )
}

export default AdminLayout