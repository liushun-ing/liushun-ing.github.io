# VUE问题合集

## 1 vue2跨域问题-配置代理

axios配置baseURL，注意这里是向自己请求，找不到就代理出去

```js
const service = axios.create({
    // baseURL: 'http://localhost:8080/api',
    baseURL: process.env.NODE_ENV === 'production' ? 'http://110.40.230.26:8081/' : 'http://localhost:8080/api',
    // 超时时间
    // timeout: 10000
});
```



`vue.config.js`配置代理，这个配置只会在开发环境中生效

```js
devServer: {
    proxy: {
        '/api':{
            // 代理出去
            target:'http://110.40.230.26:8081/',
            ws: true,
            changeOrigin:true,
            pathRewrite:{
                '^/api':''
            }
        }
    }
}
```



