import { BlockChainNavBar, BlockChainSideBar } from './master/blockchain'
import { DeepLearningNavBar, DeepLearningSideBar } from './master/deepLearning'
import { JavaNavBar, JavaSideBar } from './master/java'

export const masterNavBar = {
  text: 'Five研究生',
  link: '/master/',
  children: [
    // { text: 'Daily', link: '/master/daily/' },
    BlockChainNavBar,
    DeepLearningNavBar,
    JavaNavBar,
  ],
}

export const masterSideBar = {
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
  ...DeepLearningSideBar,
  ...JavaSideBar,
}