const { expect } = require("chai");
const { assert } = require("console");
const { ethers, waffle } = require("hardhat");

let ownable;
const [wallet, alice, bob] = waffle.provider.getWallets();
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("Ownable", function () {
  beforeEach(async function () {
    const Ownable = await ethers.getContractFactory("Ownable");

    ownable = await Ownable.deploy();
    await ownable.deployed();
  });

  it("Ownable is deployed", async function () {
    expect(ownable.address).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("verify the owner", async function () {
    const owner = await ownable.owner();
    expect(owner).to.equal(wallet.address);
  });

  it("owner updated Alice", async function () {
    await ownable.connect(wallet).setOwner(alice.address);
    const owner = await ownable.owner();
    expect(owner).to.equal(alice.address);
  });

  it("Revert on zero address", async function () {
    await expect(ownable.connect(wallet).setOwner(ZERO_ADDRESS)).to.be.reverted;
  });
});
