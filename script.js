const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton")
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_+-}{|\][?/~";

let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc");

// set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = Number(inputSlider.min);
    const max = Number(inputSlider.max);
    inputSlider.style.backgroundSize = `${((passwordLength - min) * 100) / (max - min)}% 100%`;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // shadow
    indicator.style.boxShadow = `0 0 15px ${color}`;
}

function getRndInteger(min,max){
   return Math.floor(Math.random() * (max-min)) + min;
}
function generateRandomNumber() {
    return getRndInteger(0,9);
}
function generateLowercase(){
    // a = 97 , z = 123
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUppercase(){
    // A = 65 , Z = 91
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbols(){
    let randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;
    let hasNum = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasNum || hasSymbol) && (passwordLength >= 8)){
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNum || hasSymbol) && (passwordLength >= 6)){
        setIndicator("#ff0");
    } 
    else{
        setIndicator("#f00");
    }
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked)
            checkCount++;
    });
    // special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckBoxChange)
});



    // Fisher Yates Method
    function shufflePassword(array){
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }
     
    




async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
//    to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}

inputSlider.addEventListener("input" , (e) =>{
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener("click",()=>{
    // none of the checkboxes are ticked
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
       passwordLength = checkCount;
       handleSlider();
    }


    password = "";

    // if(uppercaseCheck.Checked){
    //     password += generateUppercase();
    // }
    // if(lowercaseCheck.Checked){
    //     password += generateLowercase();
    // }
    // if(symbolsCheck.Checked){
    //     password += generateSymbols();
    // }
    // if(numbersCheck.Checked){
    //     password += generateRandomNumber();
    // }

    console.log("khela hobe");
    let funcArr =[];
    
    
    if(uppercaseCheck.checked)
        funcArr.push(generateUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowercase);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbols);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    console.log("khela jaari hai");
    // compulsory addition
    for(let i = 0 ; i<funcArr.length ; i++){
        password += funcArr[i]();
    }

    console.log("hamba hamba dumba dumba");
    // remaining character
    for(let i = 0 ; i < passwordLength-funcArr.length ; i++){
        let randomIndex = getRndInteger(0,funcArr.length);
        password += funcArr[randomIndex]();
    }

    console.log("jai modi ji");
    // shuffle the password
    password = shufflePassword(Array.from(password));

    // show in UI
    passwordDisplay.value = password;
    // calculate Strength
    calcStrength();
});