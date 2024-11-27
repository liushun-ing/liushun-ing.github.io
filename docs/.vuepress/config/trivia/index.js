import { JavaSectionNavBar, JavaSectionSideBar } from './javaSection'

export const TriviaNavBar = {
  text: 'Five杂学',
  link: '/trivia/',
  children: [
    JavaSectionNavBar,
  ],
}

export const TriviaSideBar = {
  ...JavaSectionSideBar,
}