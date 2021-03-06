
const Hsn = '0x03f4a95d964d364614E514e8638d61CDEed4f8D4'
const HsnResolver = '0x925da8387c81e1b1d8aaBE4CfDb1BD0b873ba278'
const Web3 = require('web3')
const rpc = 'https://ethercluster.com/etc'
const axios = require('axios')
const { isConfusing, confusables, rectifyConfusion } = require('unicode-confusables')

function hex_to_ascii(str1) {
  let hex = str1.toString()
  let str = ''
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return str
}
module.exports = {
  async getNameOfOwner(addr) {
    return new Promise(async (resolve, reject) => {
      let web3 = new Web3()
      let getNameOfOwnerabi = web3.eth.abi.encodeFunctionCall({
        name: 'getNameOfOwner',
        type: 'function',
        inputs: [{
          type: 'address',
          name: 'addr_'
        }]
      }, [addr])
      if (typeof (ethereum) !== 'undefined') {

        ethereum.request({
          'method': 'eth_call',
          'params': [{
            'to': Hsn,
            'data': getNameOfOwnerabi
          }, 'latest']
        }).then(async (res) => {
          let tt = web3.eth.abi.decodeLog(['bytes'],res)
          let name = web3.utils.hexToString(tt[0])
          if (isConfusing(name)) {
            name = hex_to_ascii(tt[0])
            name = JSON.stringify(name)
            name = name.split('u0000')[1]
            name = name.split('"')[0]
          }
          resolve(name)
        })
          .catch((err) => {
            resolve('')
          })
      } else {
        let res = await axios.post(rpc, {
          'jsonrpc': '2.0',
          'method': 'eth_call',
          'params': [
            {
              'to': Hsn,
              'data': getNameOfOwnerabi
            },
            'latest'
          ],
          'id': 1
        })
        try {
          let tt = web3.eth.abi.decodeLog(['bytes'],res.data.result)
          let name = web3.utils.hexToString(tt[0])
          if (isConfusing(name)) {
            name = hex_to_ascii(tt[0])
            name = JSON.stringify(name)
            name = name.split('u0000')[1]
            name = name.split('"')[0]
          }
          resolve(name)
        }catch (e) {
          resolve('')
        }
      }
    })
  },
  async getOwner(name) {
    return new Promise(async (resolve, reject) => {
      let web3 = new Web3()
      let getOwnerabi = web3.eth.abi.encodeFunctionCall({
        name: 'getOwner',
        type: 'function',
        inputs: [{
          type: 'string',
          name: 'name_'
        }]
      }, [name])
      if (typeof (ethereum) !== 'undefined') {
        ethereum.request({
          'method': 'eth_call',
          'params': [{
            'to': HsnResolver,
            'data': getOwnerabi
          }, 'latest']
        }).then(async (res) => {
          if (res == '0x0000000000000000000000000000000000000000000000000000000000000000') {
            resolve('')
          } else {
            let addr = '0x' + res.split('0x000000000000000000000000')[1]
            resolve(addr)
          }
        })
          .catch((err) => {
            resolve('')
          })
      } else {
        let res = await axios.post(rpc, {
          'jsonrpc': '2.0',
          'method': 'eth_call',
          'params': [
            {
              'to': HsnResolver,
              'data': getOwnerabi
            },
            'latest'
          ],
          'id': 1
        })
        if (res.data.result == '0x0000000000000000000000000000000000000000000000000000000000000000') {
          resolve('')
        } else {
          let addr = '0x' + res.data.result.toString().split('0x000000000000000000000000')[1]
          resolve(addr)
        }
      }
    })

  },
  async getTokenIdOfName(name) {
    return new Promise(async (resolve, reject) => {
        let web3 = new Web3()
        let getTokenIdOfNameabi = web3.eth.abi.encodeFunctionCall({
          name: 'getTokenIdOfName',
          type: 'function',
          inputs: [{
            type: 'string',
            name: 'name_'
          }]
        }, [name])
        if (typeof (ethereum) !== 'undefined') {
          ethereum.request({
            'method': 'eth_call',
            'params': [{
              'to': Hsn,
              'data': getTokenIdOfNameabi
            }, 'latest']
          }).then(async (res) => {
            if (typeof res !== 'undefined') {
              let tt = web3.utils.hexToNumber(res)
              resolve(tt)
            }else{
              resolve('')
            }
          })
            .catch((err) => {
              resolve('')
            })
        } else {
          let res = await axios.post(rpc, {
            'jsonrpc': '2.0',
            'method': 'eth_call',
            'params': [
              {
                'to': Hsn,
                'data': getTokenIdOfNameabi
              },
              'latest'
            ],
            'id': 1
          })
          if (typeof res.data.result !== 'undefined') {
            let tt = web3.utils.hexToNumber(res.data.result)
            resolve(tt)
          }else{
            resolve('')
          }
        }
      }
    )

  }

}
