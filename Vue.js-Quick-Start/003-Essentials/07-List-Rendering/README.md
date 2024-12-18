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
