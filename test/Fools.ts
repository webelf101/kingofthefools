import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Fools", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const accounts = await ethers.getSigners();

    const KingOfTheFools = await ethers.getContractFactory("KingOfTheFools");
    const kingOfTheFools = await KingOfTheFools.deploy();

    return { kingOfTheFools, accounts };
  }

  describe("Deployment", function () {
    it("Should be same kingOfTheFools initial next amount and 1 ether", async function () {
      const { kingOfTheFools } = await loadFixture(deployOneYearLockFixture);
      const ONE_ETHER = ethers.BigNumber.from("1000000000000000000");
      expect(await kingOfTheFools.nextAmount()).to.equal(ONE_ETHER.toString());
    });
  });
  describe("BecomeKings", function () {
    it("Should be same kingOfTheFools next amount after the first tx and 1.5 ether", async function () {
      const { kingOfTheFools, accounts } = await loadFixture(deployOneYearLockFixture);
      const ONE_ETHER = ethers.BigNumber.from("1000000000000000000");
      const ONE_FIVE_ETHER = ethers.BigNumber.from("1500000000000000000");
      await kingOfTheFools.becomeKing({value:ONE_ETHER.toString()});

      expect((await kingOfTheFools.nextAmount()).toString()).to.equal(ONE_FIVE_ETHER.toString());
    });
  });
});
