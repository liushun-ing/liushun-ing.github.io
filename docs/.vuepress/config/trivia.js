import { JavaSectionNavBar, JavaSectionSideBar } from './trivia/javaSection'

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