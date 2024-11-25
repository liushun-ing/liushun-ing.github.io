import { BlockChainNavBar, BlockChainSideBar } from './master/blockchain'
import { DeepLearningNavBar, DeepLearningSideBar } from './master/deepLearning'
import { JavaNavBar, JavaSideBar } from './master/java'

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