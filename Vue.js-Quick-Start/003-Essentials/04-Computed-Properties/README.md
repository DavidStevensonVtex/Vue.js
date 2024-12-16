# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [Computed Properties](https://vuejs.org/guide/essentials/computed.html)

### Basic Example​

In-template expressions are very convenient, but they are meant for simple operations. Putting too much logic in your templates can make them bloated and hard to maintain. For example, if we have an object with a nested array:

```
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

And we want to display different messages depending on if author already has some books or not:

```
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

At this point, the template is getting a bit cluttered. We have to look at it for a second before realizing that it performs a calculation depending on author.books. More importantly, we probably don't want to repeat ourselves if we need to include this calculation in the template more than once.

That's why for complex logic that includes reactive data, it is recommended to use a computed property. Here's the same example, refactored:

```
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9ktFP2zAQxv+Vk19SpK6dBk9VyUQ3tA0JNm1o0jTvwSTXxJDYls/uiqL875zTtOUBeLP9fef7fWd34sK52SaiWIglFV67AIQhulwa3TrrA3TgURVBb3AKhW1dDFhCD2tvW8i4MpNGmsIaCqBiqK2H80PFpJMGwKgWF5Bd2drAZ4vZNB3eWftAC/ib1gDZ74jwAd7BRblRpuAOX6IuR+son7K8UqSLF7Qz1m5rhOtHCugfmQngnzT9SYKbz0Ed0T2u97wu3jWaaixXCeYaiVSFjL/3TiYncJ7DEMLzVLwZI84G+lmDpgo15PAePkL2BykDznljuX3qvJzvJsqz5E3A1jUqIO8Ali7/qugIMI5jOU+DZ5mcMnnXvULY93x1cqQeh3vFVATiYGtdze7JGn7SgVyKlEc36L+7oDm4FItdpqSpprH/r4az4COOQ+WaGouHF87vaZvOpPjhkdBvUIqDFpSvMOzky183uOX1QWxtGRt2vyH+RLJNTIw72yqakrGf+Qbab8PH1Ka6pcttQEP7UAk0OfvBLwX/zk9vRD/ins7Ohjp+N9E/AfLCBKY=)

Here we have declared a computed property `publishedBooksMessage`. The `computed()` function expects to be passed a [getter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description), and the returned value is a **computed ref**. Similar to normal refs, you can access the computed result as `publishedBooksMessage.value`. Computed refs are also auto-unwrapped in templates so you can reference them without `.value` in template expressions.

A computed property automatically tracks its reactive dependencies. Vue is aware that the computation of `publishedBooksMessage` depends on `author.books`, so it will update any bindings that depend on `publishedBooksMessage` when `author.books` changes.

See also: [Typing Computed](https://vuejs.org/guide/essentials/computed.html)

### Computed Caching vs. Methods​

You may have noticed we can achieve the same result by invoking a method in the expression:

```
<p>{{ calculateBooksMessage() }}</p>
```

```
// in component
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

Instead of a computed property, we can define the same function as a method. For the end result, the two approaches are indeed exactly the same. However, the difference is that **computed properties are cached based on their reactive dependencies**. A computed property will only re-evaluate when some of its reactive dependencies have changed. This means as long as `author.books` has not changed, multiple access to `publishedBooksMessage` will immediately return the previously computed result without having to run the getter function again.

This also means the following computed property will never update, because `Date.now()` is not a reactive dependency:

```
const now = computed(() => Date.now())
```

In comparison, a method invocation will always run the function whenever a re-render happens.

Why do we need caching? Imagine we have an expensive computed property `list`, which requires looping through a huge array and doing a lot of computations. Then we may have other computed properties that in turn depend on `list`. Without caching, we would be executing `list`’s getter many more times than necessary! In cases where you do not want caching, use a method call instead.
