const bill = document.getElementById('bill');
const btns = document.querySelectorAll('.btn');
const customBtn = document.getElementById('btn-custom');
const peopleNum = document.getElementById('people-num');
const errorMessage = document.querySelector('.error');
const tip = document.getElementById('tip-amount');
const total = document.getElementById('total-amount')
const resetBtn = document.getElementById('reset-btn');

bill.addEventListener('focus', () => {
  bill.setAttribute('placeholder', '')
});

bill.addEventListener('input', setBillValue);
btns.forEach(btn => {
  btn.addEventListener('click', handleClick);
});
customBtn.addEventListener('input', setCustomPercentage);
peopleNum.addEventListener('focus', () => {
  peopleNum.setAttribute('placeholder', '')
})
peopleNum.addEventListener('input', setPeopleNum);
resetBtn.addEventListener('click', reset);

let billValue = '';

function setBillValue () {
    billValue = bill.value.replace(/\D/g,"").replace(",",".");
  parseFloat(billValue);
  billValue > 0 ? bill.style.color = 'hsl(183, 100%, 15%)' : bill.style.color = 'hsl(184, 14%, 56%)';
  calcTip();
}

let percentage = 0.15;

function handleClick (e) {
  percentage = parseFloat(e.target.innerHTML) / 100;
  btns.forEach(btn => {
    btn.classList.remove('btn-active');
    customBtn.value = '';
  });
  e.target.classList.add('btn-active');
  calcTip();
  
}

customBtn.innerHTML = 1;

function setCustomPercentage () {
  percentage = customBtn.value.replace(/\D/g,"").replace(",",".") /100;
  parseFloat(percentage);
  console.log(percentage);
  calcTip();
}

let people = 1;

function setPeopleNum () {
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

function calcTip () {
  if(people >=1) {
    let tipAmount = ((billValue / people) * percentage).toFixed(2);
  tip.innerHTML = `$${tipAmount}`;

  let totalAmount = (billValue / people).toFixed(2);
  total.innerHTML = `$${totalAmount}`;
  }else{
    tip.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
  }
//Activate reset button
resetBtn.classList.add('reset-btn-active');
}

function reset () {
  bill.value = '';
  percentage.value = 0.15;
  customBtn.value = '';
  peopleNum.value = '';
  tip.innerHTML = `$0.00`;
  total.innerHTML = `$0.00`;
  resetBtn.classList.remove('reset-btn-active')
}

window.onload = function() {
  reset();
  };