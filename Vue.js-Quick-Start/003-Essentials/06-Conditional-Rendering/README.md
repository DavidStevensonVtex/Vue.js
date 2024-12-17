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

[Try it in the Playground](https://play.vuejs.org/#eNp9kU1OwzAQha8yeFOQSqMKVlVa8aMuYEERIFbehHSSuHVsyx63larcgx0SJ+QI2El/WKDuPPO+Gb3n2bJbYwYrj2zEUpdbYQgckjcTrkRttCXYgsUCGiisrqEX0B5XXOVaOYJsjU7XCOPInJP1eMFVmnSLwopQENZGZoShAkg/PJFWcJNLkS/HnB0XnO2enE1Il6XENOngdg2ntBrC6lIUx6FAvnsE4fY2ztKkGkZ8B6N0OJlVoDT8fH1+79Q0OVhifUYuJClEOVg4rcInbKNNznJdGyHRzgyJkJSzEbRK1DIp9fqx7cXE/X0/rzBf/tNfuE3scfZs0aFdBeMHjTJbInXy9PUJN+F9EGs99zLQJ8SXEFz66LHD7ryaB9t/uNbtQ3tKoco3N90QKrcPFY1Gsml5zsJ5709EP9q9Gly3c1w1rPkFEGHD7g==)

```
<script setup>
import { ref } from 'vue'

const awesome = ref(true)
</script>

<template>
  <button @click="awesome = !awesome">toggle</button>

	<h1 v-if="awesome">Vue is awesome!</h1>
	<h1 v-else>Oh no 😢</h1>
</template>
```

A `v-else` element must immediately follow a `v-if` or a `v-else-if` element - otherwise it will not be recognized.
