# [Vue.js Guide](https://vuejs.org/guide/introduction.html)

## [Introduction](https://vuejs.org/guide/introduction.html)

### What is Vue?

Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.

Here is a minimal example:

```
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

```
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

The above example demonstrates the two core features of Vue:

-   Declarative Rendering: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.

-   Reactivity: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.

### The Progressive Framework

Vue is designed to be flexible and incrementally adoptable. Depending on your use case, Vue can be used in different ways:

-   Enhancing static HTML without a build step
-   Embedding as Web Components on any page
-   Single-Page Application (SPA)
-   Fullstack / Server-Side Rendering (SSR)
-   Jamstack / Static Site Generation (SSG)
-   Targeting desktop, mobile, WebGL, and even the terminal

If you are an experienced developer interested in how to best integrate Vue into your stack, or you are curious about what these terms mean, we discuss them in more detail in [Ways of Using Vue](https://vuejs.org/guide/extras/ways-of-using-vue.html).

### [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html)

In most build-tool-enabled Vue projects, we author Vue components using an HTML-like file format called Single-File Component (also known as \*.vue files, abbreviated as SFC). A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file. Here's the previous example, written in SFC format:

```
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

SFC is a defining feature of Vue and is the recommended way to author Vue components if your use case warrants a build setup.

### API Styles

Vue components can be authored in two different API styles: Options API and Composition API.

#### Options API

With Options API, we define a component's logic using an object of options such as data, methods, and mounted. Properties defined by options are exposed on this inside functions, which points to the component instance:

```
<script>
export default {
  // Properties returned from data() become reactive state
  // and will be exposed on `this`.
  data() {
    return {
      count: 0
    }
  },

  // Methods are functions that mutate state and trigger updates.
  // They can be bound as event handlers in templates.
  methods: {
    increment() {
      this.count++
    }
  },

  // Lifecycle hooks are called at different stages
  // of a component's lifecycle.
  // This function will be called when the component is mounted.
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9Us1O3DAQfpWR1QMIlFRqT6sUtUUc4AAIOPqAcWYTs44d2eNl0SrvzjjZZDkgpEjx/Pj7mfFe/Ov7YptQrEQVdTA9XUiHu94HghrXKlmCvXQAZQkBlSazRYikCHOyVqROTqcG4Dql4OYIQPvkaAU/p3jIv+FcugPaOjlG8y4CtYqgSxl0ggblaqBgmgYDpJ5ZMOZbHVLr67iaKYzTATt0dNQAjGZiMVKfnX3NbM0a9bu2CK33mwk592N9xNEszFssrG9Onp9aZC5DRtnJFJgIP/ZHpqF4Ph1JpOOvKpdJckDY9ZYdcARQvSQi7+CvtkZv/kixWJDi4vIAzf72B55hqMrpCl+vygVLnAuKrHFtmuI1esfrG4VLoX3XG4vhrh+HK8UyLSmUtf7tZsxRSMgTmfK6Rb35Iv8adzknxX3AiGGLUiw1UqFBVp3LV4+3uOPzUux8nSx3f1N8QJ5vyhqntv/J1Sz7U9+o9rrLT9G45ile7QhdnE1lofNecze/4ctvrB/l/ip+z6sSwwfUxv9s)

### Composition API

With Composition API, we define a component's logic using imported API functions. In SFCs, Composition API is typically used with `<script setup>`. The setup attribute is a hint that makes Vue perform compile-time transforms that allow us to use Composition API with less boilerplate. For example, imports and top-level variables / functions declared in `<script setup>` are directly usable in the template.

Here is the same component, with the exact same template, but using Composition API and `<script setup>` instead:

```
<script setup>
import { ref, onMounted } from 'vue'

// reactive state
const count = ref(0)

// functions that mutate state and trigger updates
function increment() {
  count.value++
}

// lifecycle hooks
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9kk9r3DAQxb/KIArZkMUutKfgXdqGHFroH9ocdYgrj73KypKQRtstxt+9I9vr5hByMFjz3hv9NNIgPnpfnBKKW1FFFbQniEjJ76XVvXeBYICA7Rac/eqSJWxghDa4Hq44dSWttGXJjlqRPiFEqgmlVc5GApUDsMv5zdvrxdomy1bWgQ41QZ9yYs5BbRugoLsOAyTfcClKewmAtipgj5Y21zBIC3P/4lSbhDc30o7LDka3qP4qg3Bw7sgdVvQNJ3f7S9hGZ7Awrts8PhyQ22vStVmodYQ3w7MNxuKRTzDyV5XznHhCvCDsvWFQXgFUvxMRk35QRqvjTooVWYr93dL3FoZh2WQcq3KOcLwq115iKygyYKu74ik6y5czMUuhXO+1wfDdTzOUgrtlJWu1Me7Pl6lGIeH2UlcHVMcX6k/xnGtS/AgYMZxQilWjOnTI1Fm+//UNz/y/ir1rkmH3K+JP5OGmzDjbPiXbMPYz30T7eXpi2nYP8f5MaOPlUBk0O8fJLwW/tbtXjv4f913xfsrxXYnxH60a++E=)

### Which to Choose?

Both API styles are fully capable of covering common use cases. They are different interfaces powered by the exact same underlying system. In fact, the Options API is implemented on top of the Composition API! The fundamental concepts and knowledge about Vue are shared across the two styles.

The Options API is centered around the concept of a "component instance" (this as seen in the example), which typically aligns better with a class-based mental model for users coming from OOP language backgrounds. It is also more beginner-friendly by abstracting away the reactivity details and enforcing code organization via option groups.

The Composition API is centered around declaring reactive state variables directly in a function scope and composing state from multiple functions together to handle complexity. It is more free-form and requires an understanding of how reactivity works in Vue to be used effectively. In return, its flexibility enables more powerful patterns for organizing and reusing logic.

You can learn more about the comparison between the two styles and the potential benefits of Composition API in the [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html).

If you are new to Vue, here's our general recommendation:

For learning purposes, go with the style that looks easier to understand to you. Again, most of the core concepts are shared between the two styles. You can always pick up the other style later.

For production use:

Go with Options API if you are not using build tools, or plan to use Vue primarily in low-complexity scenarios, e.g. progressive enhancement.

Go with Composition API + Single-File Components if you plan to build full applications with Vue.

#### Still Got Questions?​

Check out our [FAQ](https://vuejs.org/about/faq.html).

## [Quick Start](https://vuejs.org/guide/quick-start.html)

-   [Playground](https://play.vuejs.org/)

*   [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)

### Creating a Vue Application

-   Install Node.js version 18.3 or higher

```
npm create vue@latest
```

-   The recommended IDE setup is Visual Studio Code + [Vue - Official extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

-   More tooling details, including integration with backend frameworks, are discussed in the [Tooling Guide](https://vuejs.org/guide/scaling-up/tooling.html).
-   To learn more about the underlying build tool Vite, check out the [Vite docs](https://vite.dev/).
-   If you choose to use TypeScript, check out the [TypeScript Usage Guide](https://vuejs.org/guide/typescript/overview.html).

### Using Vue from CDN​

You can use Vue directly from a CDN via a script tag:

```
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

When using Vue from a CDN, there is no "build step" involved. This makes the setup a lot simpler, and is suitable for enhancing static HTML or integrating with a backend framework. However, you won't be able to use the Single-File Component (SFC) syntax.

#### Using the Global Build

The above link loads the global build of Vue, where all top-level APIs are exposed as properties on the global Vue object. Here is a full example using the global build:

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/eYQpQEG)

#### Using the ES Module Build

Throughout the rest of the documentation, we will be primarily using ES modules syntax. Most modern browsers now support ES modules natively, so we can use Vue from a CDN via native ES modules like this:

```
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

Notice that we are using `<script type="module">`, and the imported CDN URL is pointing to the ES modules build of Vue instead.

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/MWzazEv)

#### Enabling Import maps​

In the above example, we are importing from the full CDN URL, but in the rest of the documentation you will see code like this:

```
import { createApp } from 'vue'
```

We can teach the browser where to locate the vue import by using [Import Maps](https://caniuse.com/import-maps):

```
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Hello Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demo >](https://codepen.io/vuejs-examples/pen/YzRyRYM)

##### Import Maps Browser Support

Import Maps is a relatively new browser feature. Make sure to use a browser within its [support range](https://caniuse.com/import-maps). In particular, it is only supported in Safari 16.4+.

#### Notes on Production Use

The examples so far are using the development build of Vue - if you intend to use Vue from a CDN in production, make sure to check out the [Production Deployment Guide](https://vuejs.org/guide/best-practices/production-deployment.html#without-build-tools).

#### Splitting up the Modules

As we dive deeper into the guide, we may need to split our code into separate JavaScript files so that they are easier to manage.

If you directly open the above index.html in your browser, you will find that it throws an error because ES modules cannot work over the file:// protocol, which is the protocol the browser uses when you open a local file.

Due to security reasons, ES modules can only work over the http:// protocol, which is what the browsers use when opening pages on the web. In order for ES modules to work on our local machine, we need to serve the index.html over the http:// protocol, with a local HTTP server.

To start a local HTTP server, first make sure you have Node.js installed, then run npx serve from the command line in the same directory where your HTML file is. You can also use any other HTTP server that can serve static files with the correct MIME types.

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
