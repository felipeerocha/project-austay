import * as Icons from '@mui/icons-material'
import type { SvgIconProps } from '@mui/material'
import type { IconName } from '../../types/iconName'

interface AppIconProps extends SvgIconProps {
  name: IconName
}

export function Icon({ name, ...props }: AppIconProps) {
  const IconComponent = Icons[name]

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado em @mui/icons-material`)
    return
  }

  return <IconComponent {...props} />
}
