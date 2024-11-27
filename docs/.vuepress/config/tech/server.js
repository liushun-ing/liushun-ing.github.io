export const ServerNavBar = {
  text: '服务池',
  children: [{ text: 'Centos', link: '/tech/centos/' }],
}

export const ServerSideBar = {
  '/tech/centos/': [
    {
      text: 'Centos',
      children: [
        '/tech/centos/README.md',
        '/tech/centos/docker_tutorial.md',
        '/tech/centos/mysql_tutorial.md',
        '/tech/centos/nginx_tutorial.md',
        '/tech/centos/firewall_tutorial.md',
        '/tech/centos/other_tutorial.md',
      ],
    },
  ],
}