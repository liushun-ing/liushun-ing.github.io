import { ComputerNetworkNavBar, ComputerNetworkSideBar } from './computer_network'
import { DataStructureNavBar, DataStructureSideBar } from './datastructure'
import { OperatingSystemNavBar, OperatingSystemSideBar } from './operating_system'

export const CourseNavBar = {
  text: 'Five本科课程',
  link: '/course/',
  children: [
    OperatingSystemNavBar,
    ComputerNetworkNavBar,
    DataStructureNavBar
  ],
}

export const CourseSideBar = {
  ...OperatingSystemSideBar,
  ...ComputerNetworkSideBar,
  ...DataStructureSideBar,
}
