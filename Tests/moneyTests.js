import { formatCurrency } from "../script/utils/money.js";

console.log("test suite --> group of related tests");

console.log("converts cents into dollars");
// Basic Test Cases
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("working with 0");
// Edge cases
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("round off to its nearest cents case 1");
if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("round off to its nearest cents case 2");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
