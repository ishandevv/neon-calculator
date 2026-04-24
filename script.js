let display = document.getElementById("display");

// Basic
function append(v){ display.value += v; }
function clearDisplay(){ display.value=""; }
function deleteLast(){ display.value = display.value.slice(0,-1); }

// Scientific
function scientific(fn){
  display.value += fn;
}

// Calculate
function calculate(){
  try{
    let res = eval(display.value);
    display.value = res;
    saveHistory(res);
  }catch{
    display.value="Error";
  }
}

// Percent
function percent(){
  display.value = eval(display.value)/100;
}

// History
function saveHistory(val){
  let h = JSON.parse(localStorage.getItem("history")||"[]");
  h.push(display.value + " = " + val);
  localStorage.setItem("history", JSON.stringify(h));
  showHistory();
}

function showHistory(){
  let h = JSON.parse(localStorage.getItem("history")||"[]");
  let div = document.getElementById("history");
  div.innerHTML = h.map(x=>"<div>"+x+"</div>").join("");
}
showHistory();

// Theme
function setTheme(t){
  if(t==="light") document.body.style.background="#f1f5f9";
  if(t==="dark") document.body.style.background="#020617";
  if(t==="neon") document.body.style.background="#0f172a";
}

// EMI
function calcEMI(){
  let P = document.getElementById("loan").value;
  let r = document.getElementById("rate").value/12/100;
  let n = document.getElementById("time").value*12;

  let emi = (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  document.getElementById("emi").innerText = "EMI: " + Math.round(emi);
}

// Graph
let chart;

function drawGraph(){
  let expr = document.getElementById("graphInput").value;

  let x = [];
  let y = [];

  for(let i=-10;i<=10;i++){
    x.push(i);
    try{
      let val = eval(expr.replace(/x/g,i));
      y.push(val);
    }catch{
      y.push(0);
    }
  }

  let ctx = document.getElementById("chart");

  if(chart) chart.destroy();

  chart = new Chart(ctx, {
    type:"line",
    data:{
      labels:x,
      datasets:[{label:"Graph",data:y}]
    }
  });
}