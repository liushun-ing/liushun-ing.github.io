import { AppMpNavbar, AppMpSideBar } from './tech/app'
import { ForegroundNavBar, ForegroundSideBar } from './tech/foreground'
import { BackgroundNavBar, BackgroundSideBar } from './tech/background'
import { ServerNavBar, ServerSideBar } from './tech/server'

export const techNavBar = {
  text: 'Five本科技术',
  link: '/tech/',
  children: [
    ForegroundNavBar,
    BackgroundNavBar,
    AppMpNavbar,
    ServerNavBar
  ],
}

export const techSideBar = {
  ...ForegroundSideBar,
  ...BackgroundSideBar,
  ...AppMpSideBar,
  ...ServerSideBar
}
