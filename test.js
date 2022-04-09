let hensjs = require('./index')

async function test() {

  // getNameOfOwner
  console.log(await hensjs.getNameOfOwner('0x5c9deb56b7269cc0e89c944ea3179aaab0e57fc0'))
  console.log(await hensjs.getNameOfOwner('0x8D54eb7CeCcdF901D452E81EB4B8686c61da5e67'))

  // getOwner
  console.log(await hensjs.getOwner('test.etc'))
  console.log(await hensjs.getOwner('t123456789.etc'))

  // getTokenIdOfName
  console.log(await hensjs.getTokenIdOfName('test'))
  console.log(await hensjs.getTokenIdOfName('t123456789'))

}

test()


