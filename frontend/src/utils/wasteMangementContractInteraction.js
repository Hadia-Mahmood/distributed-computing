import { ethers } from "ethers";
import { smartContract } from "../constants/wasteManagementConstants";
import { convertDateToTimestamp } from "./helper";

let provider;
let signer;
let WasteManagementContract;

if (typeof window !== "undefined") {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  WasteManagementContract = new ethers.Contract(
    smartContract.address,
    smartContract.abi,
    signer
  );
}

class WasteManagementContractInteraction {
  // Checking Confirm and Reject Transactions
  static async processTransaction(txPromise) {
    const tx = await txPromise;
    const receipt = await tx.wait();

    if (receipt.status === 0) {
      throw new Error("Transaction was cancelled.");
    }

    return tx;
  }

  static async RecordWasteCollection(date, totalAmount, area, notes) {
    return this.processTransaction(
      WasteManagementContract.recordWasteCollection(
        convertDateToTimestamp(date),
        totalAmount,
        area,
        notes
      )
    );
  }

  static async RecordInputEntry(
    inputDate,
    quantityReceived,
    district,
    sourceSubdivision,
    area
  ) {
    return this.processTransaction(
      WasteManagementContract.recordInputEntry(
        convertDateToTimestamp(inputDate),
        quantityReceived,
        district,
        sourceSubdivision,
        area
      )
    );
  }

  static async RecordOutputEntry(
    outputDate,
    recyclablePercentage,
    plasticPercentage,
    glassPercentage,
    metalloidsPercentage,
    marketValue
  ) {
    return this.processTransaction(
      WasteManagementContract.recordOutputEntry(
        convertDateToTimestamp(outputDate),
        recyclablePercentage,
        plasticPercentage,
        glassPercentage,
        metalloidsPercentage,
        marketValue
      )
    );
  }

  static async RecordLandFillEntry(date, quantityDisposed, area, landfillSite) {
    return this.processTransaction(
      WasteManagementContract.recordLandfillEntry(
        convertDateToTimestamp(date),
        quantityDisposed,
        area,
        landfillSite
      )
    );
  }

  static async AddWeeklyReport(date, ipfsHash, reportType) {
    return this.processTransaction(
      WasteManagementContract.addWeeklyReport(
        convertDateToTimestamp(date),
        ipfsHash,
        reportType
      )
    );
  }

  static async AssignUserRole(userAddress, role) {
    return this.processTransaction(
      WasteManagementContract.assignUserRole(userAddress, role)
    );
  }

  static async UpdateWasteCollectionEntry(id, totalAmount, notes) {
    return this.processTransaction(
      WasteManagementContract.updateWasteCollectionEntry(id, totalAmount, notes)
    );
  }

  static async GetWasteCollectionEntry(id) {
    return WasteManagementContract.getWasteCollectionEntry(id);
  }

  static async GetWeeklyReport(id) {
    return WasteManagementContract.getWeeklyReport(id);
  }

  static async GetAllReportsByType(reportType) {
    return WasteManagementContract.getAllReportsByType(reportType);
  }

  static async GetUserRole(userAddress) {
    return WasteManagementContract.getUserRole(userAddress);
  }
}

export default WasteManagementContractInteraction;
