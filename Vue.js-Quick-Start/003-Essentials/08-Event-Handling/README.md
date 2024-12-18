# [Vue.js 3 Guide](https://vuejs.org/guide/introduction.html)

## [Event Handling](https://vuejs.org/guide/essentials/event-handling.html)

### Listening to Events

We can use the `v-on` directive, which we typically shorten to the `@` symbol, to listen to DOM events and run some JavaScript when they're triggered. The usage would be `v-on:click="handler"` or with the shortcut, `@click="handler"`.

The handler value can be one of the following:

1. **Inline handlers**: Inline JavaScript to be executed when the event is triggered (similar to the native onclick attribute).
1. **Method handlers**: A property name or path that points to a method defined on the component.
