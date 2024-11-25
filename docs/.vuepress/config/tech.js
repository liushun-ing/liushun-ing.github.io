import { AppMpNavbar, AppMpSideBar } from './tech/app'
import { ForegroundNavBar, ForegroundSideBar } from './tech/foreground'
import { BackgroundNavBar, BackgroundSideBar } from './tech/background'
import { ServerNavBar, ServerSideBar } from './tech/server'

export const TechNavBar = {
  text: 'Five本科',
  link: '/tech/',
  children: [
    ForegroundNavBar,
    BackgroundNavBar,
    AppMpNavbar,
    ServerNavBar
  ],
}

export const TechSideBar = {
  ...ForegroundSideBar,
  ...BackgroundSideBar,
  ...AppMpSideBar,
  ...ServerSideBar
}
