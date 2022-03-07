const Hsn = '0x8474D3346441F85668C1dDAB46ff2D1Af1531698'
const HsnResolver = '0x30BEF52d5ca70B445994C5Ee238E760342edA66D'

const Web3 = require('web3')
const rpc = 'https://ethercluster.com/etc'
const axios = require('axios')


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
          let tt = web3.utils.hexToString(res)
          resolve(tt.substring(33))
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
        let tt = web3.utils.hexToString(res.data.result)
        resolve(tt.substring(33))
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
