import { CSSReset } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { SaasProvider } from '@saas-ui/react'
import Router from './router/Router'

function App() {
  return (
    <BrowserRouter>
        <SaasProvider>
          <CSSReset />
          <Router />
        </SaasProvider>
    </BrowserRouter>
  )
}

export default App
