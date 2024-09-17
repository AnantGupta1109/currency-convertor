const dropdowns = document.querySelectorAll("select");
const button = document.querySelector("button");
const input = document.querySelector("input");
const from = document.querySelector("#from-currency");
const BASE_URL = "https://v6.exchangerate-api.com/v6/1f892f0899fbc04651148fe3/latest/";
const to = document.querySelector("#to-currency");

const convertedAmmont = document.querySelector("#converted-amount");
const rule = document.querySelector("#rule");


for(let select of dropdowns){
    for(let code in CURRENCY_CODES){
        let option = document.createElement("option");
        option.innerText = code
        option.value = code;
        if(select.name=="from" && code=="USD"){
            option.selected = "selected"
        }else if(select.name=="to" && code=="INR"){
            option.selected = "selected"
        }
        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (target)=>{
    let curr = target.value
    let coontry = CURRENCY_CODES[curr]
    let newlink = `https://flagsapi.com/${coontry}/flat/64.png`
    target.parentElement.querySelector("img").src = newlink
}


button.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let fromCurr = from.value;
    let toCurr = to.value;
    let amt = Number(input.value);

    if(amt === "" || amt < 1){
        amt = 1
        input.value = 1
    }

    let res = await fetch(BASE_URL + fromCurr);
    let data = await res.json();
    let rate = data.conversion_rates[toCurr];
    let converted = amt * rate;

    convertedAmmont.innerText = converted;
    rule.innerText = `1 ${fromCurr} = ${rate} ${toCurr}`

    console.log(data)
})
