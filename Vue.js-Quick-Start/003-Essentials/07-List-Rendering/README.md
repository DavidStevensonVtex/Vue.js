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
