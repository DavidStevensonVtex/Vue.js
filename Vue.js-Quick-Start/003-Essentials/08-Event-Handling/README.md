# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [Event Handling](https://vuejs.org/guide/essentials/event-handling.html)

### Listening to Events

We can use the `v-on` directive, which we typically shorten to the `@` symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be `v-on:click="handler"` or with the shortcut, `@click="handler"`.

The handler value can be one of the following:

1. **Inline handlers**: Inline JavaScript to be executed when the event is triggered (similar to the native onclick attribute).
1. **Method handlers**: A property name or path that points to a method defined on the component.

### Inline Handlers​

Inline handlers are typically used in simple cases, for example:

`const count = ref(0)`

```
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>
```

[**▶ Try it in the Playground**](https://play.vuejs.org/#eNp9kbFOwzAQhl/l5AVQqwQEU5VWFNQBBkDQ0UuaXFu3jm3Z51IpyrtjO21gQN3s+7+zv9O1bG5MdvDIJqxwlRWGwCF5M+NKNEZbghYsrqGDtdUNXAX0iiuuKq0cQaW9IrQwjcz17Q1XRd6/EvrDhbAxsiSMNypWnkgreKykqPZTzk7doxFns3ldw12R90iPm9lyi3BqKlf6gLAtHawQFaQnsIa2HRy6Dkg06LIij/ZFPnzOxoxcEF6LTbZzWoVZW64AokFjhET7bkiEgTibQEpiVkqpv19TjazH8blebbHa/1PfuWOscfZh0aE9IGdDRqXdIPXx4usNj+E8hI2uvQz0hfATnZY+OvbYk1d10P7DJduXtDGhNku3OBIqdx4qikaySzxnYYvPF0b/1b3PHlIfVx3rfgCVPbtM)

```
<script setup>
import { ref } from 'vue'

const counter = ref(0)
</script>

<template>
	<button @click="counter++">Add 1</button>
	<p>The button above has been clicked {{ counter }} times.</p>
</template>
```

### Method Handlers​

The logic for many event handlers will be more complex though, and likely isn't feasible with inline handlers. That's why `v-on` can also accept the name or path of a component method you'd like to call.

For example:

```
const name = ref('Vue.js')

function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` is the native DOM event
  if (event) {
    alert(event.target.tagName)
  }
}
```

```
<!-- `greet` is the name of the method defined above -->
<button @click="greet">Greet</button>
```

[**▶ Try it in the Playground**](https://play.vuejs.org/#eNp9Ul1LwzAU/SvXIGyCtA/6JFX8xA9wExWf8rDa3XbZ2qQkN3Uw9t+9SelUkEEhzT3nnpxzk424atuk8yjOROYKq1oCh+TbC6lV0xpLsAGLJWyhtKaBEVNHUktdGO0IdN4gnAfCePThMVm60VFAS68LUkZDZRFpjB1qOoKN1AB5jZbGswesawOHm6CQdHntcXsw416ANIVZbJiBckAL5FNIdQi302eIQGCpEv7IDsKxllBuKwxLNWH9KLuVmr8s7UNyPN4QNm2dE4YdZZ+eiC1fFrUqVudSRO9SXNyHNUt7mKlZuusTx4Icj6JUFWc3mqcY3UhRmKZV7Gjahjk4Kc4Gn1LkHP3rKdbIejwe6sUCi9U/9aVbh5oULxYd2g6l2GF90h6+e5vgmv93YGPmvmb2HvAVnal98NjTrr2es+1fvOj2Mb4Fpat3d7cm1G4IFYzG8Ua+FPw+bvZE/7F7kpwO1yK238di2eE=)

A method handler automatically receives the native DOM Event object that triggers it - in the example above, we are able to access the element dispatching the event via `event.target`.

See also: [**Typing Event Handlers**](https://vuejs.org/guide/typescript/composition-api.html#typing-event-handlers)
