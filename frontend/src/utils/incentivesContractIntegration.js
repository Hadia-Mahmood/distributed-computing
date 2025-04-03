import { ethers } from "ethers";
import { smartContract } from "../constants/incentivesConstants";
import { convertDateToTimestamp } from "./helper";

let provider;
let signer;
let IncentivesContract;

if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  IncentivesContract = new ethers.Contract(
    smartContract.address,
    smartContract.abi,
    signer
  );
}

class IncentivesContractInteraction {
  // Checking Confirm and Reject Transactions
  static async processTransaction(txPromise) {
    const tx = await txPromise;
    const receipt = await tx.wait();

    if (receipt.status === 0) {
      throw new Error("Transaction was cancelled.");
    }

    return tx;
  }

  static async CalculateIncentives(subDivision, amount, month) {
    return this.processTransaction(
      IncentivesContract.allocateTokensToSubdivision(subDivision, amount, month)
    );
  }

  static async ClaimTokens(subdivision, month, amount) {
    return this.processTransaction(
      IncentivesContract.claimTokens(subdivision, month, amount)
    );
  }
}


export default IncentivesContractInteraction;
