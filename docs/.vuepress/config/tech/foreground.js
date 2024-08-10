export const ForegroundNavBar = {
  text: 'foreground',
  children: [
    { text: 'JavaScript', link: '/tech/js/' },
    { text: 'TypeScript', link: '/tech/typescript/' },
    { text: 'HTML_CSS', link: '/tech/html_css/' },
    { text: 'Less_Sass', link: '/tech/less_sass/' },
    { text: 'React', link: '/tech/react/' },
    { text: 'Vue', link: '/tech/vue/' },
    { text: 'Vite', link: '/tech/vite/' },
    { text: 'Webpack', link: '/tech/webpack/' },
  ],
}

export const ForegroundSideBar = {
  '/tech/js/': [
    {
      text: 'JavaScript',
      children: [
        '/tech/js/README.md',
        '/tech/js/1.md',
        '/tech/js/2.md',
        '/tech/js/3.md',
        '/tech/js/4.md',
        '/tech/js/5.md',
      ],
    },
  ],
  '/tech/typescript/': [
    {
      text: 'TypeScript',
      children: ['/tech/typescript/README.md', '/tech/typescript/1.md'],
    },
  ],
  '/tech/html_css/': [
    {
      text: 'HTML_CSS',
      children: [
        '/tech/html_css/README.md',
        '/tech/html_css/1.md',
        '/tech/html_css/2.md',
      ],
    },
  ],
  '/tech/less_sass/': [
    {
      text: 'Less_Sass',
      children: [
        '/tech/less_sass/README.md',
        '/tech/less_sass/less.md',
        '/tech/less_sass/sass.md',
      ],
    },
  ],
  '/tech/react/': [
    {
      text: 'React',
      children: [
        '/tech/react/README.md',
        '/tech/react/new.md',
        '/tech/react/1.md',
        '/tech/react/2.md',
        '/tech/react/3.md',
        '/tech/react/4.md',
        '/tech/react/5.md',
        '/tech/react/6.md',
        '/tech/react/7.md',
        '/tech/react/8.md',
        '/tech/react/9.md',
      ],
    },
  ],
  '/tech/vue/': [
    {
      text: 'Vue',
      children: [
        '/tech/vue/README.md',
        '/tech/vue/vue2.md',
        '/tech/vue/base_tutorial.md',
        '/tech/vue/api_tutorial.md',
        '/tech/vue/vue3_1.md',
        '/tech/vue/vue3_2.md',
        '/tech/vue/pinia.md',
      ],
    },
  ],
  '/tech/vite/': [
    {
      text: 'Vite',
      children: ['/tech/vite/README.md', '/tech/vite/1.md'],
    },
  ],
  '/tech/webpack/': [
    {
      text: 'Webpack',
      children: ['/tech/webpack/README.md', '/tech/webpack/1.md'],
    },
  ],
}