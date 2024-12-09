# [Vue.js Guide](https://vuejs.org/guide/introduction.html)

## [Introduction](https://vuejs.org/guide/introduction.html)

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
