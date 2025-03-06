import { Flex } from "@chakra-ui/react"
import Identificação from "./Identificação"

const LayoutComAdminPanel: React.FC = () => {
    
    return (
        <Flex direction={{base: "column", md: "row"}} gap="6">
            <Identificação />
        </Flex>
    )
}

export default LayoutComAdminPanel;