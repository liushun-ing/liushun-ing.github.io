# VUE3新特性

记录一些vue3的特性

## difineProps()

1、用于组件通信中父级组件给子级组件传值，其用来声明props,其接收值为props选项相同的值

2、默认支持常见的类型检查，在ts下，我们需要明确变量的类型，类型经常是我们的自定义类型

3、只能在`<script setup>`中使用

4、不需要被导入即可使用,它会在编译`<script setup>`语法块时一同编译掉

5、必须在`<script setup>`的顶层使用，不可以在`<script setup>`的局部变量中引用

6、不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中

```vue
// 父组件
<template>
	<Aritice :title="AriticeItem.title" :info="AriticeItem.info" :author="AriticeItem.author">
	 <!-- v-bind ( : ) ，父组件将值绑定到子组件上 -->
    </Aritice>
</template>
<script setup>
	import { reactive } from 'vue';
	import Article from '@/components/Article.vue';
	const AriticeItem = reactive({
		title: '文章标题',
	    info: '文章内容',
	    author: 'X',
	  });
</script>
```

```vue
// 子组件
<template>
	<section>
  		<p>{{ title }}</p>
    	<p>{{ info }}</p>
    	<p>{{ author }}</p>
	</section>
</template>
<script setup>
	const props = defineProps({
		title: {
            type:String ,// 如果可能存在多个类型，则可以写成 [String,Number]
            default:'默认值',
            required: true// 是否必传 ，在不声明为true 的情况下，所有prop 默认为非必填。
        },
		info: String,
		author: String,
	});// 对象形式声明 props
	// 等价于以 字符串数组声明 props
	//const props = defineProps(['title', 'info', 'author']);
	// 如果在setup中使用则直接 props.title
</script>

```



需要注意的是，props传递数据一般是单向的，不建议在子组件中修改props中的值，如果需要在子组件中对props的值进行处理，使用ref将他变为响应式状态数据

```vue
const formatTitle = ref(props.title)
//这样，子组件中后续对 formatTitle 的修改，就与原props.title 无关联了
```



## defineEmits()

1、用于组件通信中子级组件向父级组件传值，其用来声明emit，其接收内容于emit选项一致

2、只能在`<script setup>`中使用

3、不需要被导入即可使用,它会在编译`<script setup>`语法块时一同编译掉，

4、必须在`<script setup>`的顶层使用，不可以在`<script setup>`的局部变量中引用

```vue
// 子组件
<div class="hello">
  <button @click="btn">点击</button>
</div>
<script setup>
/**
 * 在子组件中使用defineEmits来声明emits
 * 其接收值与emit选项一致
 * 传入的选项在全局变量
 * emits函数是defineEmits返回值
 * defineEmits函数参数是个数组，数组内容是自定义函数名称
 * emits函数第一个参数是自定义事件名称，第二个参数是需要传递的内容
 * defineEmits如果放在局部。不在全局。则报错
 * defineEmits is not defined
 * @type {EmitFn<string[]>}
 */
const emits = defineEmits(['handle']);
const btn = () => {
  emits('handle', '张三')
}
</script>
// 父级组件中
<div class="home">
  <HelloWorld @handle="handleClick"/>
</div
<script setup>
import HelloWorld from '@/components/HelloWorld'
/**
 * 在父级组件中，使用子级的自定义事件，
 * 在html中去写@自定义事件名称=事件名称
 * 函数中data是个形参，为子级传递过来的数据
 * @param data
 */
const handleClick = function (data) {
  console.log(data)
}
</script>
```



如果参数有多个，建议用对象形式传递

```vue
//子组件发送
emits('increase', {params1: '1',params2: '2'});
//父组件监听
const handleIncrease = (params) => {
	console.log(params); //{params1: '1',params2: '2'}
};

```



## provide&inject依赖注入

通常用于跨级组件之间传递数据

`provide() `接受两个参数：

- 第一个参数是要注入的 key，可以是一个字符串或者一个 symbol；
- 第二个参数是要注入的值。

`inject()`可以接受三个参数：

- 第一个参数是注入的 key。
- 第二个参数是可选的，即在没有匹配到 key 时使用的默认值。它也可以是一个工厂函数，用来返回某些创建起来比较复杂的值。
- 第三个参数是可选的，类型为布尔值。当第二个参数的值就是一个函数，而不是工厂函数时，需要使用将值设置为 false。

当使用响应式 `provide/inject` 值时，**建议尽可能将任何对响应式状态的变更都保持在 provider 内部**。这样可以确保 provide 的状态和变更操作都在同一个组件内，使其更容易维护。

```vue
// 父组件
<template>
  <section class="item" @click="onClick">PARENT {{ num }}</section>
  <childVue /> <!-- 引入子组件 -->
</template>
<script setup>
  import childVue from './child.vue';
  import { ref, provide } from 'vue';
  const num = ref(0);
  const onClick = () => {
    num.value++;
  }; 
  // 新增函数
  const increaseNum = (params) => {
    num.value += params;
  };
  // 将 increaseNum 函数作为值提供
  provide('count', { num, increaseNum });
</script>

```

```vue
// 孙组件,通过父组件传递过来的函数修改num值，不要自身直接修改
<template>
  <!-- 新增点击事件 -->
  <section class="item"  @click="onClick">GRANDCHILDREN {{ num }}</section>
</template>
<script setup>
  import { inject } from 'vue';
  // 在注入出添加 increaseNum 变量
  const { num, increaseNum } = inject('count');
  // 新增的点击事件，触发 increaseNum 并且传参为 2 
  const onClick = () => {
    increaseNum(2);
  };
</script>

```

