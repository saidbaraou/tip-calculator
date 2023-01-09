const bill = document.getElementById('bill');
let billValue = '';
const btns = document.querySelectorAll('.btn');
const customBtn = document.getElementById('btn-custom');
customBtn.innerHTML = 1;
let percentage = 0.15;
const peopleNum = document.getElementById('people-num');
let people = 1;
const errorMessage = document.querySelector('.error');
const tip = document.getElementById('tip-amount');
const total = document.getElementById('total-amount')
const resetBtn = document.getElementById('reset-btn');


bill.addEventListener('click', changePlaceholders);
peopleNum.addEventListener('click', changePlaceholders);
bill.addEventListener('input', setBillValue);
btns.forEach(btn => {
  btn.addEventListener('click', handleClick);
});
customBtn.addEventListener('input', setCustomPercentage);
peopleNum.addEventListener('input', setPeopleNum);
resetBtn.addEventListener('click', reset);

function changePlaceholders(e) {
  e.target.setAttribute("placeholder", "");
}

function setBillValue() {
  billValue = bill.value.replace(",",".");
  parseFloat(billValue);
  billValue > 0 ? bill.style.color = 'hsl(183, 100%, 15%)' : bill.style.color = 'hsl(184, 14%, 56%)';
  calcTip();
}

function handleClick(e) {
  percentage = parseFloat(e.target.innerHTML) / 100;
  btns.forEach(btn => {
    btn.classList.remove('btn-active');
    customBtn.value = '';
  });
  e.target.classList.add('btn-active');
  calcTip();
}

function setCustomPercentage() {
  percentage = customBtn.value.replace(",",".") /100;
  parseFloat(percentage);
  calcTip();
}

function setPeopleNum() {
  people = peopleNum.value.replace(/\D/g,"");
  parseFloat(people);
  if(people <= 0) {
    errorMessage.style.display = 'block';
  }else{
    errorMessage.style.display = 'none';
  }
  console.log(people);
  calcTip();
}

function calcTip() {
  if(people >=1) {
    //Avoid having "NaN" in tip amount field when clicking custom btn
    //With the if statement
    if(percentage){
      let tipAmount = ((billValue / people) * percentage).toFixed(2);
      tip.innerHTML = `$${tipAmount}`;
    }
  let totalAmount = (billValue / people).toFixed(2);
  total.innerHTML = `$${totalAmount}`;
  }else{
    tip.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
  }
resetBtn.classList.add('reset-btn-active');
}


function reset() {
  bill.value = "";
  customBtn.value = "";
  peopleNum.value = "";
  percentage.value = 0.15;
  bill.setAttribute("placeholder", "0");
  peopleNum.setAttribute("placeholder", "1");
  tip.innerHTML = "$0.00";
  total.innerHTML = "0.00";
  fifteenPercent = document.querySelector('.fifteen');
  btns.forEach(btn => {
    btn.classList.remove('btn-active');
    customBtn.value = '';
    fifteenPercent.classList.add('btn-active');
  });
 
}


window.onload = function() {
  reset();
  };