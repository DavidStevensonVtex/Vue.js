# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [Class and Style Bindings](https://vuejs.org/guide/essentials/class-and-style.html)

A common need for data binding is manipulating an element's class list and inline styles. Since `class` and `style` are both attributes, we can use `v-bind` to assign them a string value dynamically, much like with other attributes. However, trying to generate those values using string concatenation can be annoying and error-prone. For this reason, Vue provides special enhancements when `v-bind` is used with `class` and `style`. In addition to strings, the expressions can also evaluate to objects or arrays.

### Binding HTML Classes

### Binding to Objects

We can pass an object to `:class` (short for `v-bind:class`) to dynamically toggle classes:

`<div :class="{ active: isActive }"></div>`

The above syntax means the presence of the `active` class will be determined by the [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) of the data property `isActive`.

You can have multiple classes toggled by having more fields in the object. In addition, the `:class` directive can also co-exist with the plain `class` attribute. So given the following state:

```
const isActive = ref(true)
const hasError = ref(false)
```

And the following template:

```
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

It will render:

`<div class="static active"></div>`

When `isActive` or `hasError` changes, the class list will be updated accordingly. For example, if `hasError` becomes `true`, the class list will become `"static active text-danger"`.

The bound object doesn't have to be inline:

```
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

`<div :class="classObject"></div>`

This will render:

`<div class="active"></div>`

We can also bind to a [computed property](https://vuejs.org/guide/essentials/computed.html) that returns an object. This is a common and powerful pattern:

```
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

`<div :class="classObject"></div>`
