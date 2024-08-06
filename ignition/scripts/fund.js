const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
  const { deployer } = await getNamedAccounts()
  const FundMe = await ethers.getContractFactory("FundMe", deployer)
  const fundMeAddress = "0xA391920D87DF0F0A18A18B503C3F9fc989BD89a5";
  const fundMe = await FundMe.attach(fundMeAddress);
  console.log(`Got contract FundMe at ${fundMe.address}`)
  console.log("Funding contract...")
  const transactionResponse = await fundMe.fund({
    value: ethers.utils.parseEther("0.1"),
  })
  await transactionResponse.wait()
  console.log("Funded!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })