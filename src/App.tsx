import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme/tema";
import { Router } from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Router />
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
