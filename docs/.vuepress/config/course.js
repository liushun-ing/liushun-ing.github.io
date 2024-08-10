import { ComputerNetworkNavBar, ComputerNetworkSideBar } from './course/computer_network'
import { DataStructureNavBar, DataStructureSideBar } from './course/datastructure'
import { OperatingSystemNavBar, OperatingSystemSideBar } from './course/operating_system'

export const courseNavBar = {
  text: 'Five本科课程',
  link: '/course/',
  children: [
    OperatingSystemNavBar,
    ComputerNetworkNavBar,
    DataStructureNavBar
  ],
}

export const courseSideBar = {
  ...OperatingSystemSideBar,
  ...ComputerNetworkSideBar,
  ...DataStructureSideBar,
}
