import { BlockChainNavBar, BlockChainSideBar } from './blockchain'
import { DeepLearningNavBar, DeepLearningSideBar } from './deepLearning'
import { JavaNavBar, JavaSideBar } from './java'

export const MasterNavBar = {
  text: 'Five研究生',
  link: '/master/',
  children: [
    // { text: 'Daily', link: '/master/daily/' },
    BlockChainNavBar,
    JavaNavBar,
    DeepLearningNavBar,
  ],
}

export const MasterSideBar = {
  // '/master/daily/': [
  //   {
  //     text: 'Daily',
  //     children: [
  //       '/master/daily/README.md',
  //       '/master/daily/23_Nov.md',
  //       '/master/daily/23_Dec.md',
  //       '/master/daily/24_Jan.md'
  //     ],
  //   },
  // ],
  ...BlockChainSideBar,
  ...JavaSideBar,
  ...DeepLearningSideBar,
}