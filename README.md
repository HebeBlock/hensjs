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
// getNameOfOwner
await hensjs.getNameOfOwner('0xA5a52D92ff302fCca9e5b060EC797F01311c66fF')
> test.etc
await hensjs.getNameOfOwner('0x8D54eb7CeCcdF901D452E81EB4B8686c61da5e67')
> ''
// getOwner
await hensjs.getOwner('test.etc')
> 0xa5a52d92ff302fcca9e5b060ec797f01311c66ff
await hensjs.getOwner('t123456789.etc')
> ''
// getTokenIdOfName
await hensjs.getTokenIdOfName('test')
> 230
await hensjs.getTokenIdOfName('t123456789')
> ''
```


```js
// In Browser
<script src="./build/hens.js"></script>
<script>
      async function test() {
        console.log(await hens.js.getNameOfOwner('0xA5a52D92ff302fCca9e5b060EC797F01311c66fF'))
        console.log(await hens.js.getNameOfOwner('0x8D54eb7CeCcdF901D452E81EB4B8686c61da5e67'))
        
        console.log(await hens.js.getOwner('test.etc'))
        console.log(await hens.js.getOwner('t123456789.etc'))
        
        console.log(await hens.js.getTokenIdOfName('test'))
        console.log(await hens.js.getTokenIdOfName('t123456789'))
      }
      test()
</script>
```
