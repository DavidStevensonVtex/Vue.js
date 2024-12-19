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

### Basic Usage​

#### Text

```
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

[**Try it in the Playground**](https://play.vuejs.org/#eNp9kU9PwzAMxb9KlEtBGusBTlM3CdAOIPFHwDGXqvW6jDSJYmdMqvrdcdqtcJh2S957tn+WO3nv/XwfQS5kgVXQngQCRb9SVrfeBRKdCLARvdgE14qMo5myylbOIokWEMsGxDJlrrLsWtkiH9twA/4QtN6UBPwTovCrl2OBxoXouqm+74s8jVRUaOsjif1N62owSyWPESUFN6pg60wNgXWodZrPes6FRT5NkjNJyHgb3cx36Cxv1qXpSlau9dpAePOkGV9JZkhO8kpj3M/zoFGIMDvp1Raq7zP6Dg9JU/I9AELYM8jkURkaoNFef77Cgd+TyXtFw+kL5gegMzExjrGHaGvG/pcbaJ+G+2jbfOH6QGDxtFQCTcl+yCvJN3u8sPof7u38bqhTtpf9LzA7s9U=)

```
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <p>Message is: {{ message }}</p>
	<input v-model="message" placeholder="edit me" />
</template>
```

#### Multiline text

```
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

[**Try it in the Playground**](https://play.vuejs.org/#eNp9kslOwzAQhl9l5EtB6nKAU0krAeoBJBYBR1+iZJq6OLblmbRFUd6dcbrQA+px5l/0jZNW3Ycw3jSopiqjIprAQMhNmGtn6uAjQwsRl9DBMvoaBmIdaKdd4R0x1EiUVwiz5LkaDK61yyb7GimQgbEONmdME2cUcjd/aSwbaxye0oamkkpa7wpA/GNxptV2ZRhHohQ4hRBxlGJ3Ws3b9hTuumySaCXIuOM8Yg6bUe1LtNJwcGkFglHgytsSo+zzsoQ6gQSLkFpJWrPJsUH60nBgV0PFJAcvTTVek3fyVq12AFoVvg7GYnwLbORBtJpCryQtt9Zvn/sdxwaHx32xwuL7n/2admmn1XtEwrgR6JMmUBXyXl58vgrlmSi3NlbcF8QPJG+bxLi3PTSuFOwzX0/71H9x46ovWuwYHR2PSqDJ2fV+reQveLxw+h/uzfi2z2nXqe4X3O/TLA==)

```
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
	<span>Multiline message is:</span>
	<p style="white-space: pre-line;">{{ message }}</p>
	<textarea v-model="message" placeholder="add multiple lines"></textarea>
</template>
```
