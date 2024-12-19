# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [Form Input Bindings](https://vuejs.org/guide/essentials/forms.html)

When dealing with forms on the frontend, we often need to sync the state of form input elements with corresponding state in JavaScript. It can be cumbersome to manually wire up value bindings and change event listeners:

```
<input
  :value="text"
  @input="event => text = event.target.value">
```

The `v-model` directive helps us simplify the above to:

`<input v-model="text">`
In addition, v-model can be used on inputs of different types, `<textarea>`, and `<select>` elements. It automatically expands to different DOM property and event pairs based on the element it is used on:

-   `<input>` with text types and `<textarea>` elements use value property and input event;
-   `<input type="checkbox">` and `<input type="radio">` use checked property and change event;
-   `<select>` uses value as a prop and change as an event.

Note

v-model will ignore the initial `value`, `checked` or `selected` attributes found on any form elements. It will always treat the current bound JavaScript state as the source of truth. You should declare the initial value on the JavaScript side, using [reactivity APIs](https://vuejs.org/api/reactivity-core#reactivity-api-core).
