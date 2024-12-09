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
