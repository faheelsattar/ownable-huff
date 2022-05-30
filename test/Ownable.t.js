const { expect } = require("chai");
const { assert } = require("console");
const { ethers, waffle } = require("hardhat");

let number;
let ownable;
const [wallet, alice, bob] = waffle.provider.getWallets();
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("Greeter", function () {
  beforeEach(async function () {
    const Number = await ethers.getContractFactory("Number");
    number = await Number.deploy();
    await number.deployed();
  });
  it("Number is deployed", async function () {
    expect(number.address).to.not.equal(ZERO_ADDRESS);
  });
  it("Number can be set", async function () {
    await number.setNumber(100);
    expect(await number.getNumber()).to.equal(100);
    expect(await number.getNumber()).to.not.equal(10);
  });
});

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
