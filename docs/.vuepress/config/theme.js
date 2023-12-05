import { courseNavBar, courseSideBar } from "./course";
import { masterNavBar, masterSideBar } from "./master";
import { techNavBar, techSideBar } from "./tech";

export default {
  navbar: [
    masterNavBar,
    techNavBar,
    courseNavBar,
    {
      text: 'GitHub',
      link: 'https://github.com/liushun-ing',
    },
  ],
  sidebar: {
    ...masterSideBar,
    ...techSideBar,
    ...courseSideBar,
  },
}