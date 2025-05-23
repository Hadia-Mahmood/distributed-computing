const ethers = require("ethers");

export function convertDateToTimestamp(date) {
  return Math.floor(new Date(date).getTime() / 1000);
}

export default function formatDate(isoDate) {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
