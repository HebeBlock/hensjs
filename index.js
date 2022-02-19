const Hsn = '0x8474D3346441F85668C1dDAB46ff2D1Af1531698'
const Web3 = require('web3')
const rpc = 'https://ethercluster.com/etc'
const axios = require('axios')


module.exports ={
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
      }else{
        let res=await axios.post(rpc,{
          "jsonrpc": "2.0",
          "method": "eth_call",
          "params": [
            {
              "to": Hsn,
              "data": getNameOfOwnerabi
            },
            "latest"
          ],
          "id": 1
        })
        let tt = web3.utils.hexToString(res.data.result)
        resolve(tt.substring(33))
      }
    })
  }
}
