import { AppMpNavbar, AppMpSideBar } from './app'
import { FrontendNavBar, FrontendSideBar } from './frontend'
import { BackendNavBar, BackendSideBar } from './backend'
import { ServerNavBar, ServerSideBar } from './server'

export const TechNavBar = {
  text: 'Five本科',
  link: '/tech/',
  children: [
    FrontendNavBar,
    BackendNavBar,
    AppMpNavbar,
    ServerNavBar
  ],
}

export const TechSideBar = {
  ...FrontendSideBar,
  ...BackendSideBar,
  ...AppMpSideBar,
  ...ServerSideBar
}
