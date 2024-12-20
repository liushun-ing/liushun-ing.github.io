import { CourseNavBar, CourseSideBar } from "./course";
import { MasterNavBar, MasterSideBar } from "./master";
import { TechNavBar, TechSideBar } from "./tech";
import { TriviaNavBar, TriviaSideBar } from "./trivia";

export default {
  navbar: [
    MasterNavBar,
    TechNavBar,
    CourseNavBar,
    TriviaNavBar,
    {
      text: 'GitHub',
      link: 'https://github.com/liushunkkk',
    },
  ],
  sidebar: {
    ...MasterSideBar,
    ...TechSideBar,
    ...CourseSideBar,
    ...TriviaSideBar,
  },
}