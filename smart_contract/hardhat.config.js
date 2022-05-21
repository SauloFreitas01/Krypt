//https://eth-goerli.alchemyapi.io/v2/cvfTGCXMbwoB2A28flk3u625lhIre8Nn

require('@nomiclabs/hardhat-waffle')

module.exports = {
    solidity:'0.8.0',
    networks:{
        goerli:{
            url:'https://eth-goerli.alchemyapi.io/v2/cvfTGCXMbwoB2A28flk3u625lhIre8Nn',
            accounts:['6b629224e015e79a9fa8c7c0d51cf982313f1a45066713ef1a80a265a80f1302']
        }
    }
}