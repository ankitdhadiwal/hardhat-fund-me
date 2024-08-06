const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config.js")
const { verify } = require("../utils/verify.js")
require("dotenv").config()

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    console.log('Current Chain ID:', chainId);
    console.log('Network Config:', networkConfig);

    let ethUsdPriceFeedAddress
    if (chainId == 1337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else if(networkConfig[chainId]){
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    } else {
        throw new Error(`No price feed address found for chainId ${chainId}`);
    }

    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

module.exports.tags = ["all", "fundme"]