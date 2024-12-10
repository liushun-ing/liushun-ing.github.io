import { JavaSectionNavBar, JavaSectionSideBar } from './javaSection'
import { NetSectionNavBar, NetSectionSideBar } from './netSection'
import { OtherSectionNavBar, OtherSectionSideBar } from './other'

export const TriviaNavBar = {
  text: 'Five杂学',
  link: '/trivia/',
  children: [
    JavaSectionNavBar,
    NetSectionNavBar,
    OtherSectionNavBar
  ],
}

export const TriviaSideBar = {
  ...JavaSectionSideBar,
  ...NetSectionSideBar,
  ...OtherSectionSideBar
}