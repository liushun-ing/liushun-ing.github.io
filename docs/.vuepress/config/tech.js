import { AppMpNavbar, AppMpSideBar } from './tech/app'
import { FrontendNavBar, FrontendSideBar } from './tech/frontend'
import { BackendNavBar, BackendSideBar } from './tech/backend'
import { ServerNavBar, ServerSideBar } from './tech/server'

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
