import { Box } from "@chakra-ui/react";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
    <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box flex="1" bg={'#f8f9fb'}>
            {children}
        </Box>
        <Footer />
    </Box>
)