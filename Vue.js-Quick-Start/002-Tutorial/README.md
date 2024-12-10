## [Vue.js 3 Tutorial](https://vuejs.org/tutorial/)

Welcome to the Vue tutorial!

The goal of this tutorial is to quickly give you an experience of what it feels like to work with Vue, right in the browser. It does not aim to be comprehensive, and you don't need to understand everything before moving on. However, after you complete it, make sure to also read the [Guide](https://vuejs.org/guide/introduction.html) which covers each topic in more detail.

### Tutorial Setting Details

Vue offers two API styles: Options API and Composition API.

-   You can also switch between SFC-mode or HTML-mode. The former will show code examples in Single-File Component (SFC) format, which is what most developers use when they use Vue with a build step. HTML-mode shows usage without a build step.

#### [Hello World Example](https://vuejs.org/tutorial/#step-1)

```
<template>
  <h1>Hello World!</h1>
</template>
```

### [Declarative Rendering](https://vuejs.org/tutorial/#step-2)

The core feature of Vue is declarative rendering: using a template syntax that extends HTML, we can describe how the HTML should look based on JavaScript state. When the state changes, the HTML updates automatically.

State that can trigger updates when changed is considered reactive. We can declare reactive state using Vue's reactive() API. Objects created from reactive() are JavaScript Proxies that work just like normal objects:

```
import { reactive } from 'vue'

const counter = reactive({
  count: 0
})

console.log(counter.count) // 0
counter.count++
```

reactive() only works on objects (including arrays and built-in types like Map and Set). ref(), on the other hand, can take any value type and create an object that exposes the inner value under a .value property:

```
import { ref } from 'vue'

const message = ref('Hello World!')

console.log(message.value) // "Hello World!"
message.value = 'Changed'
```

Details on reactive() and ref() are discussed in [Guide - Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html).

Reactive state declared in the component's `<script setup>` block can be used directly in the template. This is how we can render dynamic text based on the value of the counter object and message ref, using mustaches syntax:

```
<h1>{{ message }}</h1>
<p>Count is: {{ counter.count }}</p>
```

DeclarativeRendering.vue

```
<!-- Listing 1.5 Declarative Rendering using reactive and ref functions -->

<script setup>
import { reactive } from "vue";
import { ref } from "vue";

const counter = reactive({
  count: 0,
});

console.log(counter.count); // 0
counter.count++;

const message = ref("Hello World!");

console.log(message.value); // "Hello World!"
message.value = "Changed";
</script>

<template>
  <h1>{{ message }}</h1>
  <h1>{{ message.split("").reverse().join("") }}</h1>
  <p>Count is: {{ counter.count }}</p>
</template>
```

App.vue

```
<!-- Listing 1.6 The App.vue file in the vue-tutorial/src folder for Declarative Rendering example -->

<script setup>
import DeclarativeRendering from "./components/DeclarativeRendering.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <DeclarativeRendering />
    </div>
  </header>
</template>
```

### [Attribute Bindings](https://vuejs.org/tutorial/#step-3)

In Vue, mustaches are only used for text interpolation. To bind an attribute to a dynamic value, we use the v-bind directive:

```
<div v-bind:id="dynamicId"></div>
```

A directive is a special attribute that starts with the v- prefix. They are part of Vue's template syntax. Similar to text interpolations, directive values are JavaScript expressions that have access to the component's state. The full details of v-bind and directive syntax are discussed in [Guide - Template Syntax](https://vuejs.org/guide/essentials/template-syntax.html).

The part after the colon (:id) is the "argument" of the directive. Here, the element's id attribute will be synced with the dynamicId property from the component's state.

Because v-bind is used so frequently, it has a dedicated shorthand syntax:

```
<div :id="dynamicId"></div>
```

### [Event Listeners](https://vuejs.org/tutorial/#step-4)

We can listen to DOM events using the v-on directive:

```
<button v-on:click="increment">{{ count }}</button>
```

Due to its frequent use, v-on also has a shorthand syntax:

```
<button @click="increment">{{ count }}</button>
```

EventListeners.vue

```
<!-- Listing 1.9 The EventListeners.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  // update component state
  count.value++;
}
</script>

<template>
  <!-- make this button work -->
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

App.vue:

```
<!-- Listing 1.10 The App.vue file in the vue-tutorial/src folder for Event Listeners example -->

<script setup>
import EventListeners from "./components/EventListeners.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <EventListeners />
    </div>
  </header>
</template>

```

### [Form Bindings](https://vuejs.org/tutorial/#step-5)

Using v-bind and v-on together, we can create two-way bindings on form input elements:

`<input :value="text" @input="onInput">`

```
function onInput(e) {
  // a v-on handler receives the native DOM event
  // as the argument.
  text.value = e.target.value
}
```

Try typing in the input box - you should see the text in `<p>` updating as you type.

To simplify two-way bindings, Vue provides a directive, v-model, which is essentially syntactic sugar for the above:

v-model automatically syncs the `<input>`'s value with the bound state, so we no longer need to use an event handler for that.

v-model works not only on text inputs, but also on other input types such as checkboxes, radio buttons, and select dropdowns. We cover more details in [Guide - Form Bindings](https://vuejs.org/guide/essentials/forms.html).

Now, try to refactor the code to use v-model instead.

FormBindings.vue:

```
<!-- Listing 1.11 The FormBindings.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

const text = ref("");

function onInput(e) {
  text.value = e.target.value;
}
</script>

<template>
  <input :value="text" @input="onInput" placeholder="Type here" />
  <p>{{ text }}</p>
</template>
```

App.vue:

```
<!-- Listing 1.12 The App.vue file in the vue-tutorial/src folder for Event Listeners example -->

<script setup>
import FormBindings from "./components/FormBindings.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <FormBindings />
    </div>
  </header>
</template>
```

FormBindings.vue using v-model:

```
<!-- Listing 1.13 The FormBindings.vue file using v-model in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

const text = ref("");

// function onInput(e) {
//   text.value = e.target.value;
// }
</script>

<template>
  <input v-model="text" placeholder="Type here" />
  <p>{{ text }}</p>
</template>
```

### [Conditional Rendering](https://vuejs.org/tutorial/#step-6)

We can use the v-if directive to conditionally render an element:

`<h1 v-if="awesome">Vue is awesome!</h1>`

This `<h1>` will be rendered only if the value of awesome is truthy. If awesome changes to a falsy value, it will be removed from the DOM.

We can also use v-else and v-else-if to denote other branches of the condition:

```
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

Currently, the demo is showing both `<h1>`s at the same time, and the button does nothing. Try to add v-if and v-else directives to them, and implement the toggle() method so that we can use the button to toggle between them.

More details on v-if: [Guide - Conditional Rendering](https://vuejs.org/guide/essentials/conditional.html)

ConditionalRendering.vue:

```
<!-- Listing 1.14 The ConditionalRendering.vue file i the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

const awesome = ref(true);

function toggle() {
  awesome.value = !awesome.value;
}
</script>

<template>
  <button @click="toggle">Toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```

App.vue:

```
<!-- Listing 1.15  The App.vue file in the vue-tutorial/src folder for Conditinal Rendering example -->

<script setup>
import ConditionalRendering from "./components/ConditionalRendering.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <ConditionalRendering />
    </div>
  </header>
</template>
```

### [List Rendering](https://vuejs.org/tutorial/#step-7)

We can use the v-for directive to render a list of elements based on a source array:

```
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

There are two ways to update the list:

1. Call mutating methods on the source array:

    `todos.value.push(newTodo)`

2. Replace the array with a new one:

    `todos.value = todos.value.filter(/* ... */)`

More details on v-for: [Guide - List Rendering](https://vuejs.org/guide/essentials/list.html)

ListingRendering.vue:

```
<!-- Listing 1.16 The ListRendering.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref } from "vue";

// give each todo a unique id
let id = 0;

const newTodo = ref("");
const todos = ref([
  { id: id++, text: "Learn HTML" },
  { id: id++, text: "Learn JavaScript" },
  { id: id++, text: "Learn Vue" },
]);

function addTodo() {
  console.log("newTodo", newTodo.value);
  const todo = { id: id++, text: newTodo.value };
  todos.value.push(todo);
  newTodo.value = "";
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t.id !== todo.id);
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```

App.vue:

```
<!-- Listing 1.17 The App.vue file in the vue-tutorial/src folder for Conditinal Rendering example -->

<script setup>
import ListRendering from "./components/ListRendering.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <ListRendering />
    </div>
  </header>
</template>
```

### [Computed Property](https://vuejs.org/tutorial/#step-8)

Let's keep building on top of the todo list from the last step. Here, we've already added a toggle functionality to each todo. This is done by adding a done property to each todo object, and using v-model to bind it to a checkbox:

```
<li v-for="todo in todos">
  <input type="checkbox" v-model="todo.done">
  ...
</li>
```

The next improvement we can add is to be able to hide already completed todos. We already have a button that toggles the hideCompleted state. But how do we render different list items based on that state?

Introducing [computed()](https://vuejs.org/guide/essentials/computed.html). We can create a computed ref that computes its .value based on other reactive data sources:

```
import { ref, computed } from 'vue'

const hideCompleted = ref(false)
const todos = ref([
  /* ... */
])

const filteredTodos = computed(() => {
  // return filtered todos based on
  // `todos.value` & `hideCompleted.value`
})
```

```
- <li v-for="todo in todos">
+ <li v-for="todo in filteredTodos">
```

A computed property tracks other reactive state used in its computation as dependencies. It caches the result and automatically updates it when its dependencies change.

Now, try to add the filteredTodos computed property and implement its computation logic! If implemented correctly, checking off a todo when hiding completed items should instantly hide it as well.

### [Lifecycle and Template Refs](https://vuejs.org/tutorial/#step-9)

So far, Vue has been handling all the DOM updates for us, thanks to reactivity and declarative rendering. However, inevitably there will be cases where we need to manually work with the DOM.

We can request a template ref - i.e. a reference to an element in the template - using the
[special ref attribute](https://vuejs.org/api/built-in-special-attributes.html#ref):

`<p ref="pElementRef">hello</p>`

To access the ref, we need to declare a ref with matching name:

`const pElementRef = ref(null)`

Notice the ref is initialized with null value. This is because the element doesn't exist yet when `<script setup>` is executed. The template ref is only accessible after the component is mounted.

To run code after mount, we can use the onMounted() function:

```
import { onMounted } from 'vue'

onMounted(() => {
  // component is now mounted.
})
```

This is called a lifecycle hook - it allows us to register a callback to be called at certain times of the component's lifecycle. There are other hooks such as onUpdated and onUnmounted. Check out the
[Lifecycle Diagram](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)
for more details.

LifecycleAndTemplateRefs.vue:

```
<!-- Listing 1.20 The LifecycleAndTemplateRefs.vue file in the vue-tutorial/src/components folder -->

<script setup>
import { ref, onMounted } from "vue";

const pElementRef = ref(null);

onMounted(() => {
  pElementRef.value.textContent = "Goodbye";
});
</script>

<template>
  <p ref="pElementRef">Hello</p>
</template>

```

App.vue:

```
<!-- Listing 1.21 The App.vue file in the vue-tutorial/src folder for Lifecycle and Template Refs example -->

<script setup>
import LifecycleAndTemplateRefs from "./components/LifecycleAndTemplateRefs.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <LifecycleAndTemplateRefs />
    </div>
  </header>
</template>
```

### [Watchers](https://vuejs.org/tutorial/#step-10)

Sometimes we may need to perform "side effects" reactively - for example, logging a number to the console when it changes. We can achieve this with watchers:

```
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newCount) => {
  // yes, console.log() is a side effect
  console.log(`new count is: ${newCount}`)
})
```

watch() can directly watch a ref, and the callback gets fired whenever count's value changes. watch() can also watch other types of data sources - more details are covered in [Guide - Watchers](https://vuejs.org/guide/essentials/watchers.html).

A more practical example than logging to the console would be fetching new data when an ID changes. The code we have is fetching todos data from a mock API on component mount. There is also a button that increments the todo ID that should be fetched. Try to implement a watcher that fetches a new todo when the button is clicked.

### [Components](https://vuejs.org/tutorial/#step-11)

So far, we've only been working with a single component. Real Vue applications are typically created with nested components.

A parent component can render another component in its template as a child component. To use a child component, we need to first import it:

```
import ChildComp from './ChildComp.vue'
```

Then, we can use the component in the template as:

```
<ChildComp />
```

ChildComponent.vue:

```
<!-- Listing 1.24 The ChildComponent.vue file in the vue-tutorial/src/components folder -->

<script setup></script>

<template>
  <h1>Hello, Child Component</h1>
</template>
```

App.vue:

```
<!-- Listing 1.25 The App.vue file in the vue-tutorial/src folder for Child Component example -->

<script setup>
import ChildComponent from "./components/ChildComponent.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <ChildComponent />
    </div>
  </header>
</template>

```

### [Props](https://vuejs.org/tutorial/#step-12)

A child component can accept input from the parent via props. First, it needs to declare the props it accepts:

```
<!-- ChildComp.vue -->
<script setup>
const props = defineProps({
  msg: String
})
</script>
```

Note defineProps() is a compile-time macro and doesn't need to be imported. Once declared, the msg prop can be used in the child component's template. It can also be accessed in JavaScript via the returned object of defineProps().

The parent can pass the prop to the child just like attributes. To pass a dynamic value, we can also use the v-bind syntax:

```
<ChildComp :msg="greeting" />
```

ChildComponent.vue:

```
<!-- Listing 1.26 The ChildComponent.vue file using Props in the vue-tutorial/src/components folder -->

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  msg: String,
});
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

App.vue:

```
<!-- Listing 1.27 The App.vue file in the vue-tutorial/src folder for Child Component example -->

<script setup>
import { ref } from "vue";
import ChildComponent from "./components/ChildComponent.vue";

const greeting = ref("Hello from parent");
</script>

<template>
  <header>
    <div class="wrapper">
      <ChildComponent :msg="greeting" />
    </div>
  </header>
</template>

```

### [Emits](https://vuejs.org/tutorial/#step-13)

In addition to receiving props, a child component can also emit events to the parent:

```
<script setup>
// declare emitted events
const emit = defineEmits(['response'])

// emit with argument
emit('response', 'hello from child')
</script>
```

The first argument to emit() is the event name. Any additional arguments are passed on to the event listener.

The parent can listen to child-emitted events using v-on - here the handler receives the extra argument from the child emit call and assigns it to local state:

```
<ChildComp @response="(msg) => childMsg = msg" />
```

ChildComponent.vue:

```
<!-- Listing 1.28 The ChildComponent.vue file using Props in the vue-tutorial/src/components folder -->

<script setup>
const emit = defineEmits(["response"]);

emit("response", "hello from child");
</script>

<template>
  <h1>Child Component</h1>
</template>
```

App.vue:

```
<!-- Listing 1.29 The App.vue file in the vue-tutorial/src folder for Child Component example -->

<script setup>
import { ref } from "vue";
import ChildComponent from "./components/ChildComponent.vue";

const childMsg = ref("No child msg yet");
</script>

<template>
  <ChildComponent @response="(msg) => (childMsg = msg)" />
  <p>{{ childMsg }}</p>
</template>

```

### [Slots](https://vuejs.org/tutorial/#step-14)

In addition to passing data via props, the parent component can also pass down template fragments to the child via slots:

```
<ChildComp>
  This is some slot content!
</ChildComp>
```

In the child component, it can render the slot content from the parent using the `<slot>` element as outlet:

```
<!-- in child template -->
<slot/>
```

Content inside the <slot> outlet will be treated as "fallback" content:
t will be displayed if the parent did not pass down any slot content:

```
<slot>Fallback content</slot>
```

ChildComponent.vue

```
<!-- Listing 1.30 The ChildComponent.vue file using Slots in the vue-tutorial/src/components folder -->

<template>
  <slot
    ><div>
      <p>Fallback content</p>
    </div>
  </slot>
</template>

```

App.vue:

```
<!-- Listing 1.31 The App.vue file using Slots in the vue-tutorial/src folder for Child Component example -->

<script setup>
import { ref } from "vue";
import ChildComponent from "./components/ChildComponent.vue";

const msg = ref("from parent");
</script>

<template>
  <ChildComponent></ChildComponent>
  <ChildComponent>
    <div>
      <p>This is some slot content!</p>
    </div>
  </ChildComponent>
  <ChildComponent>Message: {{ msg }}</ChildComponent>
</template>
```
