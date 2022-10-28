/**
 * Bài tính thuế thu nhập cá nhân
 */
const millions = 1000000;
document.getElementById("btnCalTax").onclick = function () {
  var fullName = document.getElementById("fullName").value;
  var income = document.getElementById("income").value * 1;
  var amountDependPerson =
    document.getElementById("amountDependPerson").value * 1 * 1.6;

  var percent = selectPercent(income);
  var totalTax = calTax(income, percent, amountDependPerson);
  document.getElementById("infoTax").innerHTML = "";
  var infoTax = document.createElement("p");
  infoTax.innerHTML = fullName + " cần đóng " + totalTax + "VNĐ tiền thuế.";
  document.getElementById("infoTax").appendChild(infoTax);
};
function selectPercent(income) {
  var percent;
  if (income > 0 && income <= 60) {
    percent = 5 / 100;
  } else if (income > 60 && income <= 120) {
    percent = 10 / 100;
  } else if (income > 120 && income <= 210) {
    percent = 15 / 100;
  } else if (income > 210 && income <= 384) {
    percent = 20 / 100;
  } else if (income > 384 && income <= 624) {
    percent = 25 / 100;
  } else if (income > 624 && income <= 960) {
    percent = 30 / 100;
  } else if (income > 960) {
    percent = 35 / 100;
  }
  return percent;
}

function calTax(income, percent, amountDependPerson) {
  var totalTax = (income - 4 - amountDependPerson) * percent * millions;
  const formatCurrency = new Intl.NumberFormat("vn-VN");

  return formatCurrency.format(totalTax);
}

/**
 * Bài tính tiền cáp
 */
const personalBillHandleCost = 4.5;
const personalPrimaryServiceCost = 20.5;
const personalHighClassChannelHireCost = 7.5;
const enterpriseBillHandleCost = 15;
const enterprisePrimaryServiceCostForFirstTenConnection = 75;
const enterprisePrimaryServiceCostForMoreConnection = 5;
const enterpriseHighClassChannelHireCost = 50;

document.getElementById("btnCalPrice").onclick = function () {
  var typeOfCustomer = document.getElementById("typeOfCustomer").value;
  var customerCode = document.getElementById("customerCode").value;
  var amountConnection = document.getElementById("amountConnection").value * 1;
  var amountHighClassChannel =
    document.getElementById("amountHighClassChannel").value * 1;
  var total = selectTypeOfCustomerAndCal(
    typeOfCustomer,
    amountConnection,
    amountHighClassChannel
  );
  document.getElementById("infoPrice").innerHTML = "";
  var infoPrice = document.createElement("p");
  infoPrice.innerHTML =
    " Mã số khách hàng: " + customerCode + "; Tiền cáp: " + total + "$";
  document.getElementById("infoPrice").appendChild(infoPrice);
};

function selectTypeOfCustomerAndCal(
  typeOfCustomer,
  amountConnection,
  amountHighClassChannel
) {
  var total;
  if (typeOfCustomer === "enterprise") {
    if (amountConnection > 10) {
      total =
        enterpriseBillHandleCost +
        enterprisePrimaryServiceCostForFirstTenConnection +
        enterprisePrimaryServiceCostForMoreConnection *
          (amountConnection - 10) +
        amountHighClassChannel * enterpriseHighClassChannelHireCost;
    } else {
      total =
        enterpriseBillHandleCost +
        enterprisePrimaryServiceCostForFirstTenConnection +
        amountHighClassChannel * enterpriseHighClassChannelHireCost;
    }
  } else if (typeOfCustomer === "personal") {
    total =
      personalBillHandleCost +
      personalPrimaryServiceCost +
      personalHighClassChannelHireCost * amountHighClassChannel;
  }
  const formatter = Intl.NumberFormat("en-US");
  return formatter.format(total);
}
