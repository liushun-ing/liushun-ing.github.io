export const NetSectionNavBar = {
  text: 'Net池',
  children: [
    { text: 'HTTP', link: '/trivia/http/' },
    { text: 'SSE', link: '/trivia/sse/' },
    { text: 'WebSocket', link: '/trivia/websocket/' },
  ]
}

export const NetSectionSideBar = {
  '/trivia/http/': [
    {
      text: 'HTTP',
      children: [
        '/trivia/http/README.md',
        '/trivia/http/http1.md',
        '/trivia/http/http2&3.md',
        '/trivia/http/quicgo.md',
      ],
    },
  ],
  '/trivia/sse/': [
    {
      text: 'SSE',
      children: [
        '/trivia/sse/README.md',
        '/trivia/sse/sse.md',
      ],
    },
  ],
  '/trivia/websocket/': [
    {
      text: 'WebSocket',
      children: [
        '/trivia/websocket/README.md',
        '/trivia/websocket/websocket.md',
      ],
    },
  ],
}