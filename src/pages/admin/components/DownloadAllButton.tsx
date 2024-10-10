import { IconButton } from '@chakra-ui/react'
import { PiDownload } from 'react-icons/pi'

const DownloadAllButton = ({ onClick }: { onClick: () => void }) => (
  <IconButton
    aria-label="Download all scores"
    icon={<PiDownload />}
    onClick={onClick}
  />
)

export default DownloadAllButton
