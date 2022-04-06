let hensjs = require('./index')

async function test() {

  // getNameOfOwner
  console.log(await hensjs.getNameOfOwner('0xA5a52D92ff302fCca9e5b060EC797F01311c66fF'))
  console.log(await hensjs.getNameOfOwner('0x8D54eb7CeCcdF901D452E81EB4B8686c61da5e67'))

  // getOwner
  console.log(await hensjs.getOwner('test.etc'))
  console.log(await hensjs.getOwner('t123456789.etc'))

  // getTokenIdOfName
  console.log(await hensjs.getTokenIdOfName('test'))
  console.log(await hensjs.getTokenIdOfName('t123456789'))
}

test()


