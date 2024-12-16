# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

### Declaring Reactive State​

`ref()​`

In Composition API, the recommended way to declare reactive state is using the ref() function:

```
import { ref } from 'vue'

const count = ref(0)
```

`ref()` takes the argument and returns it wrapped within a ref object with a .value property:

```
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

See also: [Typing Refs](https://vuejs.org/guide/typescript/composition-api.html#typing-ref)

To access refs in a component's template, declare and return them from a component's `setup()` function:

```
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}
```

Notice that we did not need to append `.value` when using the ref in the template. For convenience, refs are automatically unwrapped when used inside templates (with a few [caveats](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#caveat-when-unwrapping-in-templates)).

You can also mutate a ref directly in event handlers:

```
<button @click="count++">
  {{ count }}
</button>
```

For more complex logic, we can declare functions that mutate refs in the same scope and expose them as methods alongside the state:

```
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // .value is needed in JavaScript
      count.value++
    }

    // don't forget to expose the function as well.
    return {
      count,
      increment
    }
  }
}
```

Exposed methods can then be used as event handlers:

```
<button @click="increment">
  {{ count }}
</button>
```

Here's the example live on [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo), without using any build tools.

HTML:

```
<div id="app">
  <button @click="count++">
    {{ count }}
  </button>
</div>
```

JavaScript:

```
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const MyComponent = {
  setup() {
    const count = ref(0)

    // expose the ref to the template
    return {
      count
    }
  }
}

createApp(MyComponent).mount('#app')
```

#### `<script setup>`

Manually exposing state and methods via `setup()` can be verbose. Luckily, it can be avoided when using
[Single-File Components (SFCs)](https://vuejs.org/guide/scaling-up/sfc.html).
We can simplify the usage with `<script setup>`:

```
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9kU9PwzAMxb9KlMs2bdqQ4DR1iD/aAQ6AgGMuJXNHttSJEmdMqvrdcVpWOKDdkvee7Z/lRt56Pz8kkEtZRB2MJxGBkr9WaGrvAolGBKhEK6rgajHi6EihQu0wktAuIYlVTowvJlmvEmoyDoVBHaAGpPFENApFn50fSptgOlXYKiwW/USexR+C2tuSgH9CFB+JiLvcaGv0fqXk0E7JLiBE0/yMb7kVVyz6EnaLxdBLziRFZq3Mdr6LDnnNDkZJ7WpvLIRnn3GjksseM3ulte7rsdMoJJiddP0Jev+PvovHrCn5EiBCOICSg0dl2AJTZ3v99gRHfg9m7TbJcvqM+QrR2ZQZ+9hdwg1j/8l1tA/dsQxu3+P6SIDxtFQGzcm2yyvJB7w/s/ov7uX8qqvjU8n2Gze5uSE=)

```
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

Top-level imports, variables and functions declared in `<script setup>` are automatically usable in the template of the same component. Think of the template as a JavaScript function declared in the same scope - it naturally has access to everything declared alongside it.

### Why Refs?

You might be wondering why we need refs with the .value instead of plain variables. To explain that, we will need to briefly discuss how Vue's reactivity system works.

When you use a ref in a template, and change the ref's value later, Vue automatically detects the change and updates the DOM accordingly. This is made possible with a dependency-tracking based reactivity system. When a component is rendered for the first time, Vue tracks every ref that was used during the render. Later on, when a ref is mutated, it will trigger a re-render for components that are tracking it.

In standard JavaScript, there is no way to detect the access or mutation of plain variables. However, we can intercept the get and set operations of an object's properties using getter and setter methods.

The `.value` property gives Vue the opportunity to detect when a ref has been accessed or mutated. Under the hood, Vue performs the tracking in its getter, and performs triggering in its setter. Conceptually, you can think of a ref as an object that looks like this:

```
// pseudo code, not actual implementation
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

Another nice trait of refs is that unlike plain variables, you can pass refs into functions while retaining access to the latest value and the reactivity connection. This is particularly useful when refactoring complex logic into reusable code.

The reactivity system is discussed in more details in the [Reactivity in Depth](https://vuejs.org/guide/extras/reactivity-in-depth.html) section.

### Deep Reactivity

Refs can hold any value type, including deeply nested objects, arrays, or JavaScript built-in data structures like `Map`.

A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays:

```
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // these will work as expected.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

Non-primitive values are turned into reactive proxies via [reactive()](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactive), which is discussed below.

It is also possible to opt-out of deep reactivity with [shallow refs](https://vuejs.org/api/reactivity-advanced.html#shallowref). For shallow refs, only .value access is tracked for reactivity. Shallow refs can be used for optimizing performance by avoiding the observation cost of large objects, or in cases where the inner state is managed by an external library.

Further reading:

-   [Reduce Reactivity Overhead for Large Immutable Structures](https://vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)
-   [Integration with External State Systems](https://vuejs.org/guide/extras/reactivity-in-depth.html#integration-with-external-state-systems)
