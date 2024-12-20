export const OtherSectionNavBar = {
  text: '其他',
  children: [
    { text: 'GithubAction', link: '/trivia/githubaction/' },
  ]
}

export const OtherSectionSideBar = {
  '/trivia/githubaction/': [
    {
      text: 'Github Action',
      children: [
        '/trivia/githubaction/README.md',
        '/trivia/githubaction/action.md',
        '/trivia/githubaction/release.md',
      ],
    },
  ],
}