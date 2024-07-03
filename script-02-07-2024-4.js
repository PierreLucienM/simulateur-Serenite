const getEmbedCodeValues = (className) => {
  let values = [];

  document.querySelectorAll(className).forEach(function(element) {
      values.push(element.getAttribute("data-value"));
  });

  return values;
}

const getRiskyAssetsRatesPerMonth = (duration) => {
  const values = getEmbedCodeValues(".world-standard").map(x => parseFloat(x));
  return values.slice(-duration);
}


const getNonRiskyAssetsRatesPerMonth = (duration) => {
  const values = getEmbedCodeValues(".yearly-rate").map(x => parseFloat(x));
  const nonRiskyAssetsRatesPerMonth = values.reduce(
    (acc, rate, index) => {
      const monthlyRate = (rate - values[index + 1]) / 12;
      return [...acc, ...Array(12).fill(rate).map((item, i) => item - (i * monthlyRate))];
    },
    []
  ).slice(0, duration).reverse();


  return nonRiskyAssetsRatesPerMonth;
}

let taxGainChart;

const generateTaxGainChart = (age, retirementAge, paymentsDuration, payment, frequency, tmi, tis) => {
  const effectivePayments = calculateEffectivePayments(age, retirementAge, paymentsDuration, payment, frequency, tmi, tis);
  const labels = effectivePayments.map((payment, index) => `Année ${index + 1}`);
  const effectivePaymentData = effectivePayments.map(payment => payment.effectivePayment);
  const taxGainData = effectivePayments.map(payment => payment.taxGain);

  const ctx = document.getElementById("tax-gain-chart").getContext("2d");

  if (taxGainChart) {
    taxGainChart.destroy();
  }

  taxGainChart = new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Versement Effectif",
          data: effectivePaymentData,
          backgroundColor: "rgb(56, 69, 144)",
          barThickness: 15,
        },
        {
          label: "Gain Fiscal",
          data: taxGainData,
          backgroundColor: "rgb(20, 20, 74)",
          barThickness: 15,  
        }
      ],
    },
    options: {
      layout: {
        padding: {
          right: 20
        }
      },
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
            stepSize: 50000,
            callback: function (value, index, values) {
              return `${value} €`;
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        datalabels: {
          font: {
            size: 8,
            weight: "bold"
          },
          backgroundColor: "white",
          borderRadius: 4,
          borderColor: "rgb(20, 20, 74)",
          borderWidth: 1,
          color: "rgb(20, 20, 74)",
          padding: 2,
          formatter: function(value, context) {
              return `${Math.ceil(value)} €`;
          },
          display: (context) => {
            return context.dataIndex === context.dataset.data.length - 1;
          },
        },
      },
    }
  });
}


let performanceChart;

const generatePerformanceChart = (age, retirementAge, paymentsDuration, payment, frequency, tmi, tis, profile) => {
  const effectivePayments = calculateEffectivePayments(age, retirementAge, paymentsDuration, payment, frequency, tmi, tis);
  const effectivePaymentsTotal = effectivePayments.reverse()[0];
  const investerProfile = profiles[profile];
  const investedAmount = effectivePaymentsTotal.effectivePayment + effectivePaymentsTotal.taxGain;
  const investmentDuration = getInvestmentDuration(age, retirementAge) * 12;
  const paymentsDurationMonths = paymentsDuration * 12;

  // Calculate risky assets performance
  const riskyAssetsRatesPerMonth = getRiskyAssetsRatesPerMonth(investmentDuration)
  const riskyAssetsPayment = payment * investerProfile.risky
  const riskyAssets = calculateStocksValue(riskyAssetsPayment, investmentDuration, paymentsDurationMonths, riskyAssetsRatesPerMonth, frequency)
  const riskyAssetsPerformance = calculateStocksPerformance(riskyAssets.total, investerProfile.risky, investedAmount);

  // Calculate non risky assets performance
  const nonRiskyAssetsRatesPerMonth = getNonRiskyAssetsRatesPerMonth(investmentDuration) 
  const nonRiskyAssetsPayment = payment * investerProfile.nonRisky
  const nonRiskyAssets = calculateStocksValue(nonRiskyAssetsPayment, investmentDuration, paymentsDurationMonths, nonRiskyAssetsRatesPerMonth, frequency)
  const nonRiskyAssetsPerformance = calculateStocksPerformance(nonRiskyAssets.total, investerProfile.nonRisky, investedAmount);

  const fee = riskyAssets.fee + nonRiskyAssets.fee
  const total = investedAmount + nonRiskyAssetsPerformance + riskyAssetsPerformance - fee; 
  
  // const gainRatio = calculateGainRatio(total, effectivePaymentsTotal.effectivePayment)
  // const performance = ((gainRatio - 1) * 100);

  // document.getElementById("guaranteed_perf").innerText = `+ ${parseInt(performance)} %`;
  // document.getElementById("guaranteed_multiple").innerText = `${gainRatio}`;

  const labels = ["Versements", "Performance", "Total"]
  const ctx = document.getElementById("performance-chart").getContext("2d");

  if (performanceChart) {
    performanceChart.destroy();
  }

  const triangleBackgroundPlugin = {
    id: 'triangleBackground',
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
  
      // Clear the previous rectangle
      ctx.clearRect(65, -30, chart.width, chart.height);
  
      ctx.beginPath();
      const xAxis = chart.scales.x;
      const yAxis = chart.scales.y;
      ctx.moveTo(xAxis.left, yAxis.bottom);
      ctx.lineTo(xAxis.right, yAxis.bottom);
      ctx.lineTo(xAxis.right, yAxis.top);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
  }}

  performanceChart = new Chart(ctx, {
    plugins: [ChartDataLabels, triangleBackgroundPlugin],
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Versement Effectif",
          data: [effectivePaymentsTotal.effectivePayment, 0, 0],
          backgroundColor: "rgb(56, 69, 144)",
          barThickness: 50,
        },
        {
          label: "Gain Fiscal",
          data: [effectivePaymentsTotal.taxGain, 0, 0],
          backgroundColor: "rgb(20, 20, 74)",
          barThickness: 50,
        },
        {
          label: "Intérêts Garantis",
          data: [0, nonRiskyAssetsPerformance, 0],
          backgroundColor: "rgb(20, 20, 70)",
          barThickness: 50
        },
        {
          label: "Performance Actions",
          data: [0, riskyAssetsPerformance, 0],
          backgroundColor: "rgb(130, 139, 188)",
          barThickness: 50
        },
        {
          label: "Total Frais Inclus",
          data: [0, 0, total],
          backgroundColor: "rgb(28, 175, 102)",
          barThickness: 50
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
            stepSize: 100000,
            callback: function (value, index, values) {
              return `${value} €`;
            }
          }
        }
      },
      plugins: {
        triangleBackground: {
          color: "rgb(241, 242, 255)"
        },
        legend: {
          display: false,
        },
        datalabels: {
            font: {
              size: 8,
              weight: "bold"
            },
            color: "white",
            formatter: function(value, context) {
                return `${Math.ceil(value)} €`;
            },
            display: function(context) {
              return context.dataset.data[context.dataIndex] > 0;
            },
        },
        tooltip: {
          filter: function (tooltipItem, data) {
            return !!tooltipItem.raw
          },
        },
      }
    },
  });
}

const profiles = { safe: { nonRisky: 1, risky: 0 }, careful: { nonRisky: .7, risky: .3 }, balanced: { nonRisky: .5, risky: .5 } };

const getInvestmentDuration = (age, retirementAge) => Math.min(retirementAge - age, 30);

const calculateTaxGainRate = (tmi, tis) => (100 - tmi + tis) / 100;

const calculateEffectivePayments = (age, retirementAge, paymentsDuration, paymentAmount, frequency, tmi, tis) => {
  const getYearlyPayment = (payment, frequency) => {
    switch (frequency) {
      case "monthly":
        return payment * 12
      case "quarterly":
        return payment * 4
      case "yearly":
        return payment
      default:
        return payment
    }
  }

  const investmentDuration = getInvestmentDuration(age, retirementAge);
  const taxGainRate = calculateTaxGainRate(tmi, tis);
  const effectivePayments = [];

  const yearlyPaymentAmount = getYearlyPayment(paymentAmount, frequency)

  for (let i = 0; i < investmentDuration; i++) {
    const year = i + 1;
    if (year > paymentsDuration) break;
    const payment = yearlyPaymentAmount * year;
    const effectivePayment = payment * taxGainRate;
    const taxGain = payment - effectivePayment;
    const yearlyPayment = { effectivePayment, taxGain };
    effectivePayments.push(yearlyPayment);
  }
  return effectivePayments;
};

const calculateStocksValue = (payment, investmentDuration, paymentsDuration, rates, frequency) => {
  const isPaymentDate = (month, frequency) => {
    switch (frequency) {
      case "monthly":
        return month % 1 === 0
      case "quarterly":
        return month % 3 === 0
      case "yearly":
        return month % 12 === 0
      default:
        return false
    }
  }

  const calculateFeeRate = (frequency) => {
    const fee = 0.012
    switch (frequency) {
      case "monthly":
        return 1 - (fee / 12);
      case "quarterly":
        return 1 - (fee / 4);
      case "yearly":
        return 1 - fee;
      default:
        return 1 - fee;
    }
  }

  let totalStocksValue = 0;

  const feeRate = calculateFeeRate(frequency);
  let totalStocksValueWithFees = 0;


  for (let i = 0; i < investmentDuration; i++) {
    if (!isPaymentDate(i, frequency)) {
      continue
    }
    if (i < paymentsDuration) {
      const currentRate = rates[i];
      const currentValue = payment / currentRate;
      totalStocksValue += currentValue;
      totalStocksValueWithFees = (totalStocksValueWithFees + currentValue) * feeRate;
    } else {
      totalStocksValueWithFees = totalStocksValueWithFees * feeRate;
    }
  }

  const lastRate = rates[investmentDuration - 1];

  const total = totalStocksValue * lastRate;
  const totalWithFee = totalStocksValueWithFees * lastRate;

  const fee = total - totalWithFee;

  return { total, fee }
};

const calculateStocksPerformance = (value, ratio, investedAmount) => Math.ceil(value - (ratio * investedAmount));

const calculateGainRatio = (total, effectivePayment) => (total / effectivePayment).toFixed(2);

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
  const paymentsDuration = Math.min(parseInt(getValueById("payments-duration")), 30);
  const payment = parseInt(getValueById("payment-amount"));
  const frequency = getCheckedValue("frequency");

  generateTaxGainChart(age, retirementAge, paymentsDuration, payment, frequency, tmi, tis);
};

const handleSimulatePerformance = () => {
  const age = parseInt(getValueById("age"));
  const retirementAge = parseInt(getValueById("retirement-age"));
  const tmi = parseInt(getValueById("tmi"));
  const tis = parseInt(getValueById("tis"));
  const paymentsDuration = Math.min(parseInt(getValueById("payments-duration")), 30);
  const frequency = getCheckedValue("frequency");
  const payment = parseInt(getValueById("payment-amount"));
  const profile = getCheckedValue("profile");

  generatePerformanceChart(age, retirementAge, paymentsDuration, payment, frequency, tmi, tis, profile);
};

const displayCharts = () => {
  handleSimulateTaxGain();
  handleSimulatePerformance();
}

const setDurationInputListener = (name) => {
  const input = document.getElementById(name);
  const defaultValue = input.value;
  document.getElementById(`${name}-display`).innerText = `${defaultValue} ans`;

  input.addEventListener('input', function () {
    const value = this.value;
    document.getElementById(`${name}-display`).innerText = `${value} ans`;
  });
};

const setRadioLabelListeners = () => {
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

const setDisplayButtonListeners = () => {
  const ageField = document.getElementById('age');
  const retirementAgeField = document.getElementById('retirement-age');
  const paymentAmountField = document.getElementById('payment-amount');
  const tmiField = document.getElementById('tmi');
  const tisField = document.getElementById('tis');
  const paymentsDurationField = document.getElementById('payments-duration');
  const profileRadioButtons = document.querySelectorAll('input[name="profile"]');
  const frequencyRadioButtons = document.querySelectorAll('input[name="frequency"]');

  const checkFields = () => {
    let allFieldsFilled = true;

    [ageField, retirementAgeField, paymentAmountField, tmiField, tisField, paymentsDurationField].forEach(field => {
      if (!field.value.trim()) {
        allFieldsFilled = false;
      }
    })

    let profileRadioButtonChecked = false;
    profileRadioButtons.forEach(button => {
      if (button.checked) {
        profileRadioButtonChecked = true;
      }
    });
    
    let frequencyRadioButtonsChecked = false;
    frequencyRadioButtons.forEach(button => {
      if (button.checked) {
        frequencyRadioButtonsChecked = true;
      }
    });

    if (allFieldsFilled && profileRadioButtonChecked && frequencyRadioButtonsChecked) {
      document.getElementById("simulate-button").style.display = "block";
    } else {
      document.getElementById("simulate-button").style.display = "none";
    }
  }

  checkFields();

  [ageField, retirementAgeField, paymentAmountField, tmiField, tisField, paymentsDurationField].forEach(field => {
    field.addEventListener('input', checkFields);
  });

  profileRadioButtons.forEach(button => {
    button.addEventListener('change', checkFields);
  });
  
  frequencyRadioButtons.forEach(button => {
    button.addEventListener('change', checkFields);
  });
}

const setMaxDurationListeners = () => {
  const ageInput = document.getElementById('age');
  const retirementAgeInput = document.getElementById('retirement-age');
  const durationInput = document.getElementById('payments-duration');
  const durationDisplay = document.getElementById('payments-duration-display');

  ageInput.addEventListener('input', updateMaxAndValue);
  retirementAgeInput.addEventListener('input', updateMaxAndValue);
  

  function updateMaxAndValue() {
    const age = parseInt(ageInput.value);
    const retirementAge = parseInt(retirementAgeInput.value);
    const maxDuration = Math.min(Math.max(retirementAge - age, 0), 30);    
    durationInput.max = maxDuration;

    if (durationInput.value > maxDuration || parseInt(durationInput.value) === 0) {
      durationInput.value = maxDuration
    }
    
    durationDisplay.innerText = `${durationInput.value} ans`;
  }

  retirementAgeInput.min = ageInput.value;
}

const preventNumberInputFromChangingOnMouseWheel = () => {
  const numberInputs = document.querySelectorAll('input[type="number"]');
  
  numberInputs.forEach(function(input) {
      input.addEventListener('mousewheel', function(event) {
          event.preventDefault();
      }, { passive: false });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  preventNumberInputFromChangingOnMouseWheel()
  document.getElementById("tmi").value = 30;
  document.getElementById("tis").value = 15;

  // Hide simulate button until all inputs are filled
  document.getElementById("simulate-button").style.display = "none";
  
  document.getElementById("simulate-button").addEventListener("click", displayCharts);
  setDurationInputListener("age");
  setDurationInputListener("payments-duration");
  setRadioLabelListeners();
  setDisplayButtonListeners();
  setMaxDurationListeners();
  setCoefListeners();
}); 

const setCoefListeners = () => {
  const ageInput = document.getElementById('age');
  const retirementAgeInput = document.getElementById('retirement-age');
  const tmiField = document.getElementById('tmi');
  const tisField = document.getElementById('tis');

  tmiField.addEventListener('input', updateCoef);
  tisField.addEventListener('input', updateCoef);
  ageInput.addEventListener('input', updateCoef);
  retirementAgeInput.addEventListener('input', updateCoef);

  function updateCoef() {
    const age = parseInt(getValueById("age"));
    const retirementAge = parseInt(getValueById("retirement-age"));
    const tmi = parseInt(getValueById("tmi"));
    const tis = parseInt(getValueById("tis"));

    const coef = calculateCoef(age, retirementAge, tmi, tis);

    if (!coef) {
      return;
    };

    const performance = ((coef - 1) * 100);

    document.getElementById("guaranteed_perf").innerText = `+ ${Math.round(performance)} %`;
    document.getElementById("guaranteed_multiple").innerText = `${coef}`;  
  }
}

const calculateCoef = (age, retirementAge, tmi, tis) => {
  if (!age || !retirementAge || !tmi || !tis) {
    return;
  }
  
  const duration = Math.min(retirementAge - age, 30);
  const values = getEmbedCodeValues(".yearly-rate").map(x => parseFloat(x));
  const rate = values[duration - 1];
  return parseFloat(((1 / rate) * (1 - tis/100) / (1 - tmi/100)).toFixed(2));
}
