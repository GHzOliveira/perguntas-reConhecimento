import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'

type DashboardProps = {
  children: ReactNode
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <Flex>
      <Sidebar />
      {children}
    </Flex>
  )
}
