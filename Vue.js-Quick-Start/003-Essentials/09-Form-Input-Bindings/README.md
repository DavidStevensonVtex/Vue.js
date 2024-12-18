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

Note that interpolation inside `<textarea>` won't work. Use v-model instead.

#### Checkbox

Single checkbox, boolean value:

```
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

[**Try it in the Playground**](https://play.vuejs.org/#eNp9UUFOwzAQ/MrKl4JUmgOcqrQSoB7gAAg4+pImm+Li2Ja9KUVR/s7aUQKVUG/emdnxjLYTt84tDi2KpchD6ZUjCEitW0ujGmc9QQcea+ih9raBGUtn0khTWhMIyg8sP7GCVdRckG/xUpo8G4zYggfCxumCME6UK+NaAvp2uJIibW/tUQpQ1el8uGpshXoEsWIsGyx0sUUNtfUnG+uum9L0fZ4lFS/k2RRAzAUFzl2r3WIfrOHKnTQAbGMbpzT6Z0eKe0mxhMRErtDafj0mLPabj3j67B98HzjNkh8vHgP6A0oxcVT4HdJAb96e8MjvieTCrWb1GfIVg9VtzDjI7lpTcew/upT2IR1Omd172BwJTRhLxaBR2Se9FHzM+zPVf+NeL27SnjS96H8AJxW9xA==)

```
<script setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
	<input type="checkbox" id="checkbox" v-model="checked" />
	<label for="checkbox">{{ checked }}</label>
</template>
```

We can also bind multiple checkboxes to the same array or [**Set**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) value:

In this case, the checkedNames array will always contain the values from the currently checked boxes.

[**Try it in the Playground**](https://play.vuejs.org/#eNqVUk9PwjAU/ypNL2iC7KAnMpYo4SCJaNSb9TC2BxS6tmm7iVn23X3txsDEELn19ffn/V7eq+m91qOqBDqmsc0M145YcKVOmOSFVsaRmhhYkYasjCrIAKkDJpnMlLSOZBvIdpAv0gIsmXji1cfnNZNx1HqhCxYOCi1SB1gREue8SqatjkgvHJO6/u3UNHHkaV6NCi516Yj71jBhNBCXas8o4TnW2zTb4btKRenheVfeFCoHceB3xghEbQiRLkGQlTK9Q+KVcRQAz/lHZ7WRp5278pLOQZJ45UWdC76Dk85PXXlB59Yh8cpj5zjqN0WH1Fnc8YqvR1urJJ5H7U3QWxWaCzDP2nG8AUZxfR7xWCqE+pqHP2dKGB7+Q54//rcWRxrj48WABVNhpB5zqVmDa+HZ2wL2+O5BHLQUyD4DvoJVovQZW9pDKXOMfcILaR/DkXO5frezvQNpD0P5oJ7ZBD6jePjTM6Mf496O7oKOyYY2P+kZIRk=)

```
<script setup>
import { ref } from 'vue'

const checkedNames = ref([])
</script>

<template>
  <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
</template>
```

#### Radio

```
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```

[**Try it in the Playground**](https://play.vuejs.org/#eNqFUr1uwjAQfhXLC61EydBOKERqK4Z2KKhl9JImF2pwbMu+BKoo796zowADopvv+7nv7uSOP1s7axvgc576wkmLzAM2NhNa1tY4ZB1zULGeVc7UbELSidBCF0Z7ZFYWeyjZIkjuJisNk3uh02RoRC2oQKityhGoYiwtZZuto2nOum70932aBCYYBKZS2wYZ/lpYCO7yUhrBmSypMBro2eaqCRTlheqhNiUoqoduBCWhE6Yq/wbFKuNGZ0aONInw/1l4CM8xazNU17Noscus6MzIcc5Kk9Md+JSjp/NVcjvbeaPp8l1oIXhhaisVuJVFSecVnG4UmMDlSpnDe8TQNTAd8eIHiv0VfOePARN87cCDa2n7E4e52wIO9PLrA470PpG0YKNIfYP8BG9UE2YcZC+NLmnsC12c9i3+H6m3G788Img/LhUGDco+6gWnP/V6Y/XzuI+zp+gTuuf9HzLx6aM=)

```
<script setup>
import { ref } from 'vue'

const picked = ref('One')
</script>

<template>
  <div>Picked: {{ picked }}</div>

	<input type="radio" id="one" value="One" v-model="picked" />
	<label for="one">One</label>

	<input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
</template>
```

#### Select

##### Single select

```
<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

[**Try it in the Playground**](https://play.vuejs.org/#eNp9kj9vwjAQxb+K5SWtRGFoJxSQADG0Q4tKRy9pclBTx7Z8dooU5bv37PCnSIUt9+53L+9ObvnM2mETgI95jqWT1jMEH+xUaFlb4zxrmYMN69jGmZplhGZCC10ajRFVUHqo2CRCd1l2L3Q+6n3IgQoPtVWFB6oYy9EWesrWh6kxa9uzRdfRZOzHucimBmsealOBmgh+JAVPZoQY66XRrJJYfCqyaAoVgEgiVgoKhIM7MxryUU9fzk5nV/T5FX1xoVPi9AMq8tFpVT7gHulAG7kd7tBoum0bacFLU1upwL0lCxScTtD7C14oZX5ekuZdgMFRL7+g/P5H3+E+aoKvHCC4BgQ/9XzhtuD79nL9Cnv6PjXpnkERfaP5DmhUiBl7bB50RbH/cCntc3ohUm8/cLn3oPG4VAwayS7xgtOrWdxY/Rz3cfiU5oTuePcLuxffcw==)

```
<script setup>
import { ref } from 'vue'

const selected = ref('')
</script>

<template>
  <span> Selected: {{ selected }}</span>

  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>
```

Note

If the initial value of your `v-model` expression does not match any of the options, the `<select>` element will render in an "unselected" state. On iOS this will cause the user not being able to select the first item because iOS does not fire a change event in this case. It is therefore recommended to provide a disabled option with an empty value, as demonstrated in the example above.

##### Multiple select (bound to array)

```
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```

[**Try it in the Playground**](https://play.vuejs.org/#eNp9UstuwjAQ/BXLF1qJEqr2RAMSIA7toa1Kb5gDShYwdWzLdkKqKP/etUN4SIWbd3Zmdzzaio617hU50AGNbWK4dsSCy/WISZ5pZRypiIE1qcnaqIx0kNphkslESeupAhIHKRl60t1iec9kHDVzcAIWDjItVg6wIiROeTGaHzQDUlWnAXUdR77rRUhscFI8ZCoFMWS0JTJKslw4rkUzErlKO67kaBxHh9clPrmCTy9wdB02YBFHZ6axtO43LGsIi3b9klReuOep2w7IY7+vyxcm6xBAUNAudRZzWvNNb2eVxIiDgtFEZZoLMB9hv2UUs2jMMboSQu3fAuZMDt0WT7aQ/PyD72zpMUY/DVgwBTB67LmV2YBr2rP5O5T4PjYx2Vwg+0bzC6wSuffY0Ca5TNH2GS+4fQ2HwuXm285KB9K2n/JGPbMOfEbxeKY3vn6y+9R7DjrMk9Z/slzkDQ==)

```
<script setup>
import { ref } from 'vue'

const selected = ref([])
</script>

<template>
  <div>Selected: {{ selected }}</div>

  <select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>

<style>
select[multiple] {
  width: 100px;
}
</style>
```

Select options can be dynamically rendered with `v-for`:

```
const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
```

```
<select v-model="selected">
  <option v-for="option in options" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected }}</div>
```

[**Try it in the Playground**]()

```
<script setup>
import { ref } from 'vue'

const selected = ref('A')

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
</script>

<template>
  <select v-model="selected">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>

	<div>Selected: {{ selected }}</div>
</template>
```

### Value Bindings

For radio, checkbox and select options, the `v-model` binding values are usually static strings (or booleans for checkbox):

```
<!-- `picked` is a string "a" when checked -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` is either true or false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` is a string "abc" when the first option is selected -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

But sometimes we may want to bind the value to a dynamic property on the current active instance. We can use `v-bind` to achieve that. In addition, using `v-bind` allows us to bind the input value to non-string values.

#### Checkbox

```
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```

`true-value` and `false-value` are Vue-specific attributes that only work with `v-model`. Here the `toggle` property's value will be set to 'yes' when the box is checked, and set to 'no' when unchecked. You can also bind them to dynamic values using `v-bind`:

```
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```

Tip

The `true-value` and `false-value` attributes don't affect the input's value attribute, because browsers don't include unchecked boxes in form submissions. To guarantee that one of two values is submitted in a form (e.g. "yes" or "no"), use radio inputs instead.

#### Radio

```
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```

`pick` will be set to the value of `first` when the first radio input is checked, and set to the value of `second` when the second one is checked.

#### Select Options

```
<select v-model="selected">
  <!-- inline object literal -->
  <option :value="{ number: 123 }">123</option>
</select>
```

`v-model` supports value bindings of non-string values as well! In the above example, when the option is selected, `selected` will be set to the object literal value of `{ number: 123 }`.

### Modifiers

#### `.lazy`

By default, `v-model` syncs the input with the data after each `input` event (with the exception of IME composition as [stated above](https://vuejs.org/guide/essentials/forms.html#vmodel-ime-tip)). You can add the `lazy` modifier to instead sync after `change` events:

```
<!-- synced after "change" instead of "input" -->
<input v-model.lazy="msg" />
```

#### `.number`

If you want user input to be automatically typecast as a number, you can add the `number` modifier to your `v-model` managed inputs:

`<input v-model.number="age" />`

If the value cannot be parsed with parseFloat(), then the original (string) value is used instead. In particular, if the input is empty (for instance after the user clearing the input field), an empty string is returned. This behavior differs from the [DOM property valueAsNumber](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#valueasnumber).

The `number` modifier is applied automatically if the input has `type="number"`.

#### `.trim`

If you want whitespace from user input to be trimmed automatically, you can add the `trim` modifier to your `v-model`-managed inputs:

`<input v-model.trim="msg" />`

### `v-model` with Components​

If you're not yet familiar with Vue's components, you can skip this for now.

HTML's built-in input types won't always meet your needs. Fortunately, Vue components allow you to build reusable inputs with completely customized behavior. These inputs even work with v-model! To learn more, read about [Usage with v-model](https://vuejs.org/guide/components/v-model) in the Components guide.
