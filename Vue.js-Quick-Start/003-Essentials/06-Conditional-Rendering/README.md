# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html)

### `v-if​`

The directive `v-if` is used to conditionally render a block. The block will only be rendered if the directive's expression returns a truthy value.

`<h1 v-if="awesome">Vue is awesome!</h1>`

### `v-else`

You can use the `v-else` directive to indicate an "else block" for `v-if`:

```
<button @click="awesome = !awesome">Toggle</button>

<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```
