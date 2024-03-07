const worldStandard = [
  100,
  105.648,
  106.373,
  112.649,
  119.469,
  116.754,
  123.558,
  118.682,
  120.025,
  117.874,
  125.624,
  134.805,
  146.361,
  141.347,
  144.007,
  154.884,
  155.748,
  149.143,
  149.137,
  149.918,
  161.313,
  153.859,
  157.481,
  144.01,
  135.668,
  139.603,
  129.228,
  125.58,
  134.449,
  138.795,
  134.593,
  128.484,
  117.801,
  107.128,
  110.386,
  117.598,
  118.983,
  119.32,
  117.71,
  121.852,
  113.961,
  110.101,
  97.816,
  90.22,
  90.347,
  79.785,
  85.487,
  89.68,
  80.879,
  76.654,
  75.012,
  73.846,
  78.604,
  78.831,
  82.126,
  85.481,
  89.517,
  84.902,
  90.09,
  88.69,
  89.566,
  92.399,
  93.931,
  94.34,
  94.732,
  93.841,
  96.122,
  93.965,
  93.496,
  93.217,
  93.242,
  93.931,
  95.35,
  97.186,
  98.467,
  98.613,
  97.115,
  103.339,
  106.308,
  109.659,
  109.12,
  114.201,
  112.166,
  117.751,
  120.299,
  122.074,
  124.147,
  125,
  123.734,
  117.2,
  117.697,
  118.663,
  121.373,
  124.109,
  127.697,
  125.968,
  129.202,
  132.659,
  129.82,
  131.184,
  133.598,
  139.29,
  137.714,
  132.864,
  133.308,
  133.864,
  135.624,
  128.21,
  127.058,
  115.878,
  112.362,
  106.618,
  114.215,
  116.169,
  105.445,
  103.877,
  108.539,
  100.232,
  89.979,
  84.098,
  79.231,
  78.414,
  71.022,
  73.061,
  81.417,
  83.126,
  83.506,
  89.614,
  92.186,
  94.112,
  91.577,
  93.674,
  99.783,
  98.742,
  101.987,
  109.231,
  111.173,
  108.929,
  105.379,
  107.111,
  105.696,
  107.574,
  109.601,
  114.496,
  119.268,
  119.343,
  122.609,
  118.158,
  117.822,
  119.07,
  116.196,
  115.109,
  106.791,
  104.701,
  111.133,
  112.338,
  116.427,
  121.251,
  124.451,
  126.618,
  125.951,
  123.185,
  126.137,
  131.648,
  131.886,
  132.77,
  130.927,
  132.114,
  132.781,
  135.536,
  140.957,
  146.87,
  147.554,
  150.161,
  146.027,
  150.474,
  148.304,
  151.689,
  156.948,
  159.497,
  160.933,
  158.351,
  162.354,
  162.931,
  163.615,
  169.524,
  171.977,
  173.172,
  179.783,
  182.373,
  185.069,
  189.724,
  192.311,
  202.481,
  215.643,
  221.686,
  217.459,
  223.025,
  214.349,
  220.043,
  202.612,
  195.882,
  213.624,
  222.323,
  212.353,
  200.433,
  198.117,
  201.722,
  203.876,
  210.933,
  209.001,
  216.409,
  217.464,
  216.664,
  217.82,
  228.326,
  235.13,
  235.023,
  245.658,
  246.661,
  245.854,
  243.118,
  240.619,
  238.343,
  236.691,
  243.375,
  251.646,
  251.191,
  252.796,
  256.541,
  251.175,
  243.663,
  250.879,
  261.297,
  261.116,
  268.696,
  273.552,
  275.549,
  261.727,
  264.887,
  242.412,
  260.294,
  270.181,
  277.594,
  287.988,
  272.918,
  284.656,
  292.592,
  289.769,
  298.935,
  299.55,
  311.536,
  315.181,
  317.305,
  293.063,
  254.556,
  282.868,
  291.987,
  296.829,
  295.419,
  311.613,
  306.84,
  299.42,
  328.853,
  335.133,
  334.165,
  343.038,
  366.063,
  374.029,
  373.568,
  390.885,
  397.92,
  409.672,
  399.947,
  423.221,
  425.586,
  439.249,
  422.02,
  410.541,
  425.807,
  411.788,
  405.83,
  379.824,
  420.354,
  408.428,
  380.254,
  403.974,
  414.732,
  383.129,
  403.136,
  402.924,
  405.453,
  406.002,
  416.238,
  431.337,
  441.157,
  437.444,
  429.089,
  417.329,
  442.189,
  458.207,
]

const rates = [
  1,
  0.9786,
  0.9586,
  0.9386,
  0.9171,
  0.8967,
  0.8757,
  0.8548,
  0.8340,
  0.8126,
  0.7917,
  0.7708,
  0.7496,
  0.7303,
  0.7104,
  0.6931,
  0.6758,
  0.6606,
  0.6463,
  0.6334,
  0.6211,
  0.6093,
  0.5986,
  0.5887,
  0.5794,
  0.5711,
  0.5628,
  0.5550,
  0.5477,
  0.5408,
  0.5346,
]


const getInvesterProfile = (profile) => profiles[profile];

const getRiskyAssetsRates = (investmentDurationMonths) => {
  const monthlyRiskyAssetsRates = worldStandard.slice(-investmentDurationMonths);
  return monthlyRiskyAssetsRates;
}

const getNonRiskyAssetsRates = (investmentDurationMonths) => {
  const monthlyNonRiskyAssetsRates = rates.reduce(
    (acc, rate, index) => {
      const monthlyRate = (rate - rates[index + 1]) / 12;
      return [...acc, ...Array(12).fill(rate).map((item, i) => item - (i * monthlyRate))];
    },
    []
  ).slice(0, investmentDurationMonths).reverse();
  return monthlyNonRiskyAssetsRates;
}

let taxGainChart;
let performanceChart;

const generateTaxGainChart = (age, retirementAge, paymentsDuration, monthlyAmount, tmi, tis) => {
  const effectivePayments = calculateEffectivePayments(age, retirementAge, paymentsDuration, monthlyAmount, tmi, tis);
  const labels = effectivePayments.map((payment, index) => `Année ${index + 1}`);
  const effectivePaymentData = effectivePayments.map(payment => payment.effectivePayment);
  const taxGainData = effectivePayments.map(payment => payment.taxGain);

  const ctx = document.getElementById("tax-gain-chart").getContext("2d");

  if (taxGainChart) {
    taxGainChart.destroy();
  }

  taxGainChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Versement Effectif",
          data: effectivePaymentData,
          backgroundColor: "rgb(56, 69, 144)"
        },
        {
          label: "Gain Fiscal",
          data: taxGainData,
          backgroundColor: "rgb(20, 20, 74)"
        }
      ]
    },
    options: {
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            callback: function (value, index, values) {
              return `${value} €`;
            }
          }
        }
      }
    },
  });
}

const generatePerformanceChart = (age, retirementAge, paymentsDuration, monthlyPayment, tmi, tis, profile) => {
  const effectivePayments = calculateEffectivePayments(age, retirementAge, paymentsDuration, monthlyPayment, tmi, tis);
  const effectivePaymentsTotal = effectivePayments.reverse()[0];
  const investerProfile = getInvesterProfile(profile);
  const investedAmount = effectivePaymentsTotal.effectivePayment + effectivePaymentsTotal.taxGain;
  const investmentDurationMonths = getInvestmentDuration(age, retirementAge) * 12;
  const paymentsDurationMonths = paymentsDuration * 12;

  // Calculate risky assets performance
  const monthlyRiskyAssetsRates = getRiskyAssetsRates(investmentDurationMonths)
  const riskyAssetsMonthlyPayment = monthlyPayment * investerProfile.risky
  const riskyAssets = calculateStocksValue(riskyAssetsMonthlyPayment, investmentDurationMonths, paymentsDurationMonths, monthlyRiskyAssetsRates)
  const riskyAssetsPerformance = calculateStocksPerformance(riskyAssets, investerProfile.risky, investedAmount);

  // Calculate non risky assets performance
  const monthlyNonRiskyAssetsRates = getNonRiskyAssetsRates(investmentDurationMonths)
  const nonRiskyAssetsMonthlyPayment = monthlyPayment * investerProfile.nonRisky
  const nonRiskyAssets = calculateStocksValue(nonRiskyAssetsMonthlyPayment, investmentDurationMonths, paymentsDurationMonths, monthlyNonRiskyAssetsRates)
  const nonRiskyAssetsPerformance = calculateStocksPerformance(nonRiskyAssets, investerProfile.nonRisky, investedAmount);

  const fees = calculateFees();
  const total = investedAmount + nonRiskyAssetsPerformance + riskyAssetsPerformance - fees
  const gainRatio = calculateGainRatio(total, effectivePaymentsTotal.effectivePayment)

  const labels = ["Versements", "Performance", "Total"]
  const ctx = document.getElementById("performance-chart").getContext("2d");

  if (performanceChart) {
    performanceChart.destroy();
  }

  performanceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Versement Effectif",
          data: [effectivePaymentsTotal.effectivePayment, 0, 0],
          backgroundColor: "rgb(56, 69, 144)",
          barThickness: 100
        },
        {
          label: "Gain Fiscal",
          data: [effectivePaymentsTotal.taxGain, 0, 0],
          backgroundColor: "rgb(20, 20, 74)",
          barThickness: 100
        },
        {
          label: "Intérêts Garantis",
          data: [0, nonRiskyAssetsPerformance, 0],
          backgroundColor: "rgb(20, 20, 70)",
          barThickness: 100
        },
        {
          label: "Performance Actions",
          data: [0, riskyAssetsPerformance, 0],
          backgroundColor: "rgb(130, 139, 188)",
          barThickness: 100
        },
        {
          label: "Total Frais Inclus",
          data: [0, 0, total],
          backgroundColor: "rgb(28, 175, 102)",
          barThickness: 100
        }
      ]
    },
    options: {
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            callback: function (value, index, values) {
              return `${value} €`;
            }
          }
        }
      }
    },
  });
}
const profiles = { safe: { nonRisky: 1, risky: 0 }, careful: { nonRisky: .7, risky: .3 }, balanced: { nonRisky: .5, risky: .5 } };

const getInvestmentDuration = (age, retirementAge) => Math.min(retirementAge - age, 30);

const calculateTaxGainRate = (tmi, tis) => (100 - tmi + tis) / 100;

const calculateEffectivePayments = (age, retirementAge, paymentsDuration, monthlyAmount, tmi, tis) => {
  const investmentDuration = getInvestmentDuration(age, retirementAge);
  const taxGainRate = calculateTaxGainRate(tmi, tis);
  const effectivePayments = [];

  for (let i = 0; i < investmentDuration; i++) {
    const year = i + 1;
    if (year > paymentsDuration) break;
    const payment = monthlyAmount * 12 * year;
    const effectivePayment = payment * taxGainRate;
    const taxGain = payment - effectivePayment;
    const yearlyPayment = { effectivePayment, taxGain };
    effectivePayments.push(yearlyPayment);
  }
  return effectivePayments;
};

const calculateStocksValue = (monthlyPayment, investmentDuration, paymentsDuration, rates) => {
  let totalStocksValue = 0;

  for (let i = 0; i < investmentDuration; i++) {
    const currentRate = rates[i];
    const currentValue = monthlyPayment / currentRate;
    if (i < paymentsDuration) totalStocksValue += currentValue;
  }

  const lastRate = rates[investmentDuration - 1];
  return lastRate * totalStocksValue;
};

const calculateStocksPerformance = (value, ratio, investedAmount) => Math.ceil(value - (ratio * investedAmount));

const calculateGainRatio = (total, effectivePayment) => total / effectivePayment;

const calculateFees = () => 63716;

const getCheckedValue = name => {
  const elements = document.getElementsByName(name);
  const checkedElement = Array.from(elements).find(element => element.checked);
  return checkedElement ? checkedElement.value : null;
};

const getValueById = id => {
  const element = document.getElementById(id);
  return element ? element.value : null;
};

const handleSimulateTaxGain = () => {
  const age = parseInt(getValueById("age"));
  const retirementAge = parseInt(getValueById("retirement-age"));
  const tmi = parseInt(getValueById("tmi"));
  const tis = parseInt(getValueById("tis"));
  const paymentsDuration = parseInt(getValueById("payments-duration"));
  const monthlyAmount = parseInt(getValueById("payment-amount"));

  generateTaxGainChart(age, retirementAge, paymentsDuration, monthlyAmount, tmi, tis);
};

const handleSimulatePerformance = () => {
  const age = parseInt(getValueById("age"));
  const retirementAge = parseInt(getValueById("retirement-age"));
  const tmi = parseInt(getValueById("tmi"));
  const tis = parseInt(getValueById("tis"));
  const paymentsDuration = parseInt(getValueById("payments-duration"));
  const monthlyAmount = parseInt(getValueById("payment-amount"));
  const profile = getCheckedValue("profile");

  generatePerformanceChart(age, retirementAge, paymentsDuration, monthlyAmount, tmi, tis, profile);
};

document.getElementById("simulate-tax-gain").addEventListener("click", handleSimulateTaxGain);

document.getElementById("simulate-performance").addEventListener("click", handleSimulatePerformance);

const setDurationDisplay = (name) => {
  const input = document.getElementById(name);
  const defaultValue = input.value;
  document.getElementById(`${name}-display`).innerText = `${defaultValue} ans`;

  input.addEventListener('input', function () {
    const value = this.value;
    document.getElementById(`${name}-display`).innerText = `${value} ans`;
  });
};

const addRadioLabelListeners = () => {
  const labels = document.querySelectorAll('label');

  labels.forEach(label => {
    const parent = label.parentElement;
    label.addEventListener('click', () => {
      const siblingLabels = parent.querySelectorAll('label');
      siblingLabels.forEach(lbl => {
        lbl.classList.remove('selected');
      });
      label.classList.add('selected');
    });
  });
};

document.addEventListener('DOMContentLoaded', function () {
  setDurationDisplay("age");
  setDurationDisplay("payments-duration");
  addRadioLabelListeners();
}); 