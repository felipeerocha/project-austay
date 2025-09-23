import { MenuItem } from './MenuItem'

export function Menu() {
  return (
    <div>
      <MenuItem label="Home" icon="Home" navigateTo="home" />
      <MenuItem label="Agendamentos" icon="Today" navigateTo="bookings" />
      <MenuItem label="Tutores" icon="PermIdentity" navigateTo="tutors" />
      <MenuItem label="Pets" icon="Pets" navigateTo="pets" />
      <MenuItem label="Pagamentos" icon="AttachMoney" navigateTo="payments" />
    </div>
  )
}
