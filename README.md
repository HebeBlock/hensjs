# hensjs

### Node

```bash
npm install hensjs
```

### Yarn

```bash
yarn add hensjs
```

### In the Browser

Use the prebuilt `build/hens.js`, or
build using the [hens.js][repo] repository:

```bash
browserify index.js -s hens.js > build/hens.js
```

## Usage

```js
// In Node.js
const hensjs = require('hensjs');
let web3 = new Web3('ws://localhost:8546');
await hensjs.getNameOfOwner('0xA5a52D92ff302fCca9e5b060EC797F01311c66fF')
> test.etc
await hensjs.getNameOfOwner('0x8D54eb7CeCcdF901D452E81EB4B8686c61da5e67')
> ''
```


```js
// In Browser
<script src="./build/hens.js"></script>
<script>
      async function test() {
        console.log(await hens.js.getNameOfOwner('0xA5a52D92ff302fCca9e5b060EC797F01311c66fF'))
        console.log(await hens.js.getNameOfOwner('0x8D54eb7CeCcdF901D452E81EB4B8686c61da5e67'))
      }
      test()
</script>
```
