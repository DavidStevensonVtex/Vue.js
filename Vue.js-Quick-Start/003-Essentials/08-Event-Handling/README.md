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

### Method vs. Inline Detection​

The template compiler detects method handlers by checking whether the `v-on` value string is a valid JavaScript identifier or property access path. For example, `foo`, `foo.bar` and `foo['bar']` are treated as method handlers, while `foo()` and `count++` are treated as inline handlers.

### Calling Methods in Inline Handlers

Instead of binding directly to a method name, we can also call methods in an inline handler. This allows us to pass the method custom arguments instead of the native event:

```
function say(message) {
  alert(message)
}
```

```
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>
```

[**Try it in the Playground**](https://play.vuejs.org/#eNp9UT1vwjAQ/SvRLRQJwdBOKEX9EEM7tFXp6MWYIwQc2/KdKRHKf6+diJQBZfO9j/N7ujM8Ozc9BoQ55KR86Tgj5OAWwmyDUVxak5Gs7yokkgWOs7MwWSY1eu4xYRph8llnj8Y4MFZOS8Y0cb4OzHHPk9KlOjwKSAtHO9TajsYCFitZZ+2UzzrlgGtdY++J7ytHPus/hQkwKWu2ZTHdkzWxXBtbgLKVK2P4T5eakYB5VyhxMib4fW8x9gEnF1ztUB1u4Hs6JUzAl0dCf0QBPcfSF8gdvVx94Cm+e7Kym6CjeoD8RrI6pIyd7CWYTYx9pWvTvlXOei5N8UPLE6OhS6kUNCmbVi8gXvh1oPp/3PvpQ+uLN4XmD/9btkk=)

```
<script setup>
function say(message) {
  alert(message)
}
</script>

<template>
	<button @click="say('hello')">Say hello</button>
	<button @click="say('bye')">Say bye</button>
</template>
```

### Accessing Event Argument in Inline Handlers​

Sometimes we also need to access the original DOM event in an inline handler. You can pass it into a method using the special `$event` variable, or use an inline arrow function:

```
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```

```
function warn(message, event) {
  // now we have access to the native event
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

### Event Modifiers

It is a very common need to call `event.preventDefault() `or `event.stopPropagation()` inside event handlers. Although we can do this easily inside methods, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.

To address this problem, Vue provides event modifiers for `v-on`. Recall that modifiers are directive postfixes denoted by a dot.

-   .stop
-   .prevent
-   .self
-   .capture
-   .once
-   .passive

The `.capture`, `.once`, and `.passive` modifiers mirror the
[options of the native addEventListener method](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options):

```
<!-- use capture mode when adding the event listener     -->
<!-- i.e. an event targeting an inner element is handled -->
<!-- here before being handled by that element           -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

The `.passive` modifier is typically used with touch event listeners for [improving performance on mobile devices](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scroll_performance_using_passive_listeners).

TIP: Do not use `.passive` and `.prevent` together, because `.passive` already indicates to the browser that you do _not_ intend to prevent the event's default behavior, and you will likely see a warning from the browser if you do so.
