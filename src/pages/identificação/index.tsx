import { Flex } from "@chakra-ui/react"
import AdminPanel from "./components/painelADM/PainelADM"
import Identificação from "./Identificação"
import useAdminStore from "../../store/useAdminStore";

const LayoutComAdminPanel: React.FC = () => {
    const { isLoggedIn, isAdmin } = useAdminStore();
    
    return (
        <Flex direction={{base: "column", md: "row"}} gap="6">
            {isLoggedIn && isAdmin && <AdminPanel />}
            <Identificação />
        </Flex>
    )
}

export default LayoutComAdminPanel;