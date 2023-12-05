export const courseNavBar = {
  text: 'Five课程',
  link: '/course/',
  children: [
    { text: '操作系统', link: '/course/operating_system/' },
    { text: '计算机网络技术', link: '/course/computer_network/' },
    {
      text: '数据结构和算法',
      link: '/course/datastructure_and_algorithm/',
    },
  ],
}

export const courseSideBar = {
  // 课程部分
  '/course/operating_system/': [
    {
      text: '操作系统',
      children: [
        '/course/operating_system/README.md',
        '/course/operating_system/1.md',
        '/course/operating_system/2.md',
        '/course/operating_system/3.md',
        '/course/operating_system/4.md',
        '/course/operating_system/5.md',
        '/course/operating_system/6.md',
        '/course/operating_system/7.md',
        '/course/operating_system/8.md',
        '/course/operating_system/9.md',
        '/course/operating_system/10.md',
        '/course/operating_system/11.md',
        '/course/operating_system/12.md',
        '/course/operating_system/13.md',
        '/course/operating_system/14.md',
      ],
    },
  ],
  '/course/computer_network/': [
    {
      text: '计算机网络',
      children: [
        '/course/computer_network/README.md',
        '/course/computer_network/1.md',
        '/course/computer_network/2.md',
        '/course/computer_network/3.md',
        '/course/computer_network/4.md',
        '/course/computer_network/5.md',
        '/course/computer_network/6.md',
      ],
    },
  ],
  '/course/datastructure_and_algorithm/': [
    {
      text: '数据结构与算法',
      children: [
        '/course/datastructure_and_algorithm/README.md',
        '/course/datastructure_and_algorithm/sort_and_search.md',
        '/course/datastructure_and_algorithm/tree.md',
        '/course/datastructure_and_algorithm/other_tree.md',
        '/course/datastructure_and_algorithm/graph.md',
        '/course/datastructure_and_algorithm/string.md',
        '/course/datastructure_and_algorithm/algorithms.md',
        '/course/datastructure_and_algorithm/c++.md',
        '/course/datastructure_and_algorithm/leetcode.md',
      ],
    },
  ],
}
