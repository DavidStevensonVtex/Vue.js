# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [List Rendering](https://vuejs.org/guide/essentials/list.html)

### `v-for`

We can use the `v-for` directive to render a list of items based on an array. The `v-for` directive requires a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an alias for the array element being iterated on:

`const items = ref([{ message: 'Foo' }, { message: 'Bar' }])`

```
<li v-for="item in items">
  {{ item.message }}
</li>
```

Inside the `v-for` scope, template expressions have access to all parent scope properties. In addition, `v-for` also supports an optional second alias for the `index` of the current item:

```
const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
```

```
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9UstOwzAQ/JWVL6FSmh7gVKVIFBUJJKACbphDlG6Ci2NbtlMiRfl31k4fCKGekp2Z3Zm13bMbY7Jdi2zOcldaYTw49K255ko0RlsPPVisYIDK6gYSkiZccVVq5TyYwqLyj+hcUSMsgvIiWUcwmRxEwmPj9uR7D82onkNyp3UCQ0oOJ2xZWMI+qDmfjXkoCRU0w8jCY6h8LgXsppW2C84uwvgUhNpgN6HPaMcZCQG47/s/IYcBpkBobDhV1JTtUxAYTWZS0JB8drRmKfOOdqpEnW2dVnRmfXRhpW6MkGifjRe0M2dziEzgCin190PEvG0xPeDlJ5Zf/+Bb1wWMs7VFh3aHnB05X9ga/UivXp+wo/8j2ehNK0l9hnxBp2UbMo6yZas2FPuXLqa9jzcvVP3mVp1H5Q5LhaBBOUQ9Z/Qabs+sfop7mV3FPq4GNvwABvfSxg==)

```
<script setup>
import { ref } from 'vue'

const parentMessage = ref('Parent')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
</script>

<template>
	<li v-for="(item, index) in items">
  	{{ parentMessage }} - {{ index }} - {{ item.message }}
	</li>
</template>
```

The variable scoping of `v-for` is similar to the following JavaScript:

```
const parentMessage = 'Parent'
const items = [
  /* ... */
]

items.forEach((item, index) => {
  // has access to outer scope `parentMessage`
  // but `item` and `index` are only available in here
  console.log(parentMessage, item.message, index)
})
```

Notice how the` v-for` value matches the function signature of the `forEach` callback. In fact, you can use destructuring on the `v-for` item alias similar to destructuring function arguments:

```
<li v-for="{ message } in items">
  {{ message }}
</li>

<!-- with index alias -->
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>
```

For nested `v-for,` scoping also works similar to nested functions. Each `v-for` scope has access to parent scopes:

```
<li v-for="item in items">
  <span v-for="childItem in item.children">
    {{ item.message }} {{ childItem }}
  </span>
</li>
```

You can also use `of` as the delimiter instead of `in`, so that it is closer to JavaScript's syntax for iterators:

`<div v-for="item of items"></div>`

### `v-for` with an Object

You can also use `v-for` to iterate through the properties of an object. The iteration order will be based on the result of calling `Object.values()` on the object:

```
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

You can also provide a second alias for the property's name (a.k.a. key):

```
<li v-for="(value, key) in myObject">
  {{ key }}: {{ value }}
</li>
```

And another for the index:

```
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

[**▶ Try it in the Playground**](https://play.vuejs.org/#eNp9kstO7DAMhl/FymZAmhvnoLMYlSNxk4AFIECssimtZyZDmkSJUwZVfXeclBlYILppbP+2PzvpxKlz0zaiWIgiVF45goAU3X9pVOOsJ+jAY1mRahF6WHrbwIj1I2mkqawJBM373csGK4KTvfKgkwaAFGlcwOjKvgFZqC1oFSiAMvDMFcZJU0ZaW8+im9IgXNhPt4svrF1jfUoc+zM/+jeZH0+O5ty2P5SmmA2sTMkGYeN0SZgsKqLmP/BXaAXtZGn9iRQHbakjjuEV38fcv8btYcLYoUuRcyUBdN0Qh76fJoMz+LhIx1yDjUFazLTKnYpZblnM9hxiLCjwcpZqNd0Ea3i5eSFSVLZxSqO/c6R4eVJw4YFWilJr+3aTfeQZduev1li9/uDfhG3ySXHvMaBvUYp9jEq/Qh4rhS8fb3HL532wsXXUrP4l+IDB6pgYB9lZNDVjf9Nl2uv8RJRZPYXLLaEJu6ESaFL2WS8Fv5jzX0b/wv07Pc55fM+i/wC6Cd3v)

```
<script setup>
import { reactive } from 'vue'

const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
</script>

<template>
	<ul>
    <li v-for="(value, key, index) in myObject">
		  {{ index }}. {{ key }}: {{ value }}
		</li>
  </ul>
</template>
```

### `v-for` with a Range

`v-for` can also take an integer. In this case it will repeat the template that many times, based on a range of `1...n`.

`<span v-for="n in 10">{{ n }}</span>`

Note here `n` starts with an initial value of `1` instead of `0`.

### `v-for` on `<template>`

Similar to template `v-if`, you can also use a `<template>` tag with `v-for` to render a block of multiple elements. For example:

```
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### `v-for` with `v-if​`

When they exist on the same node, `v-if` has a higher priority than `v-for`. That means the `v-if` condition will not have access to variables from the scope of the `v-for`:

```
<!--
This will throw an error because property "todo"
is not defined on instance.
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
```

This can be fixed by moving `v-for` to a wrapping `<template>` tag (which is also more explicit):

```
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>
```

Note: It's not recommended to use `v-if` and `v-for` on the same element due to implicit precedence.

### Maintaining State with `key`

When Vue is updating a list of elements rendered with `v-for`, by default it uses an "in-place patch" strategy. If the order of the data items has changed, instead of moving the DOM elements to match the order of the items, Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index.

This default mode is efficient, but only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values).

To give Vue a hint so that it can track each node's identity, and thus reuse and reorder existing elements, you need to provide a unique `key` attribute for each item:

```
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

When using `<template v-for>`, the `key` should be placed on the `<template>` container:

```
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

It is recommended to provide a key attribute with `v-for` whenever possible, unless the iterated DOM content is simple (i.e. contains no components or stateful DOM elements), or you are intentionally relying on the default behavior for performance gains.

The key binding expects primitive values - i.e. strings and numbers. Do not use objects as `v-for` keys. For detailed usage of the key attribute, please see the [`key` API documentation](https://vuejs.org/api/built-in-special-attributes#key).

### `v-for` with a Component

Note: This section assumes knowledge of [Components](https://vuejs.org/guide/essentials/component-basics). Feel free to skip it and come back later.

You can directly use `v-for` on a component, like any normal element (don't forget to provide a `key`):

`<MyComponent v-for="item in items" :key="item.id" />`

However, this won't automatically pass any data to the component, because components have isolated scopes of their own. In order to pass the iterated data into the component, we should also use props:

```
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```

The reason for not automatically injecting `item` into the component is because that makes the component tightly coupled to how `v-for` works. Being explicit about where its data comes from makes the component reusable in other situations.

Check out [**▶ this example of a simple todo list**](https://play.vuejs.org/#eNp9VF1v2jAU/StWNClBpYm67gmlVbuNSZ20rup4a/aQxhdwcezIH8CE+O+7tjFJO9YXcO65H+f43utdctt1+dpCMklK3SjWGaLB2O66EqztpDJkRxTMyZ7MlWxJiq7pEZpJKu8MtAcsL6LBZUQ3QirRSKENEbBx2Ay2hly5hFmajiJoENEH85OL2rkfQhidkItxOBtmOExI+lUSswRCmV6C9iX23mMQ8vFNyKxeAZEW62CgUbVeno67fBP3Q258CK83IkRU4jeSrgQHp2hrvFyKzD8569yKxjApSE3pfdCbjUIBrzBf19xC3lm9zAZl+0RnZ68ZDC4txHoSyID8CyGJFEkixbIIfcQO4gc2o+O1AfdlyrlULVmfSzHR9rllJu8UrEGYqyrpSVcJOjsaJa+fgRMMQhwrnjsZiN5SSmqvqSy8S/RnorMmnAmWaSUFHkIj2SqJMKOvkkYzkm1gKTkFV3SaL3LyDYD6RjT1Mb6IJZ+tMVI4SmVxODukLJzUcLRHfq7UOcMr6TkGcZlDxoQJCtsR/oWG9awmK/iDbs6aMzqw+05FxH/04I2CVq4jqnPdcdZA5ouMycUoel6XxZHYgbynjObYvGScDFfrxLJSmDMBD0p2OntKPZPUDWuwT7HXzh4YeeC/Y+L6zg43ttuFWSR7HKzBfZObBrWsUNoHwNRZTIyarh/98U03fMbXgozG7Z+zRf6ipUBFfiWqpJFtxzion53bJezBJO4ozijncvPd24yycNgWjFlCszphf9FbZ6uSBwUa1Bqbc8RMrRaA8+Tg6a97P5tHECfXula+Az6Cltw6jsHtsxUUaQ/8PNs7/1IysZjp6daA0FGUI9o/Q1WCbf3yjvSe7mWOr41/jPbJ/i+QKuHA)
to see how to render a list of components using v-for, passing different data to each instance.

```
<script setup>
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'

const newTodoText = ref('')
const todos = ref([
  {
    id: 1,
    title: 'Do the dishes'
  },
  {
    id: 2,
    title: 'Take out the trash'
  },
  {
    id: 3,
    title: 'Mow the lawn'
  }
])

let nextTodoId = 4

function addNewTodo() {
  todos.value.push({
    id: nextTodoId++,
    title: newTodoText.value
  })
  newTodoText.value = ''
}
</script>

<template>
	<form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    />
    <button>Add</button>
  </form>
  <ul>
    <todo-item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :title="todo.title"
      @remove="todos.splice(index, 1)"
    ></todo-item>
  </ul>
</template>
```

### Array Change Detection​

#### Mutation Methods​

Vue is able to detect when a reactive array's mutation methods are called and trigger necessary updates. These mutation methods are:

-   push()
-   pop()
-   shift()
-   unshift()
-   splice()
-   sort()
-   reverse()

#### Replacing an Array​

Mutation methods, as the name suggests, mutate the original array they are called on. In comparison, there are also non-mutating methods, e.g. `filter()`, `concat()` and `slice()`, which do not mutate the original array but **always return a new array**. When working with non-mutating methods, we should replace the old array with the new one:

```
// `items` is a ref with array value
items.value = items.value.filter((item) => item.message.match(/Foo/))
```

You might think this will cause Vue to throw away the existing DOM and re-render the entire list - luckily, that is not the case. Vue implements some smart heuristics to maximize DOM element reuse, so replacing an array with another array containing overlapping objects is a very efficient operation.
