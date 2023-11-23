
let applyBg = (e)=>{
    let value = e.target.value;
    let custom = document.getElementById("custom");
    custom.style.backgroundColor=value;
}
let applyFont = (e)=>{
    let value = e.target.value;
    let custom = document.getElementById("custom");
    custom.style.fontSize=value+"pt";
}
let applyColor = (e)=>{
    let value = e.target.value;
    let custom = document.getElementById("custom");
    custom.style.color=value;
}

window.addEventListener('load', () => {
    const fontCheckbox = document.getElementById('fontCheckbox');
    const colorCheckbox = document.getElementById('colorCheckbox');
    const backgroundCheckbox = document.getElementById('backgroundCheckbox');

    const fontSize = document.getElementById('fontSizeBlock');
    const textColor = document.getElementById('fontColorBlock');
    const backgroundColor = document.getElementById('backgroundBlock');


    fontCheckbox.addEventListener('change', function () {
        let block = document.getElementById("font");
        if (!this.checked){
            block.removeChild(block.querySelectorAll("input")[1]);
        }else{
            let el = document.createElement("input");
            el.setAttribute("type", "number"); 
            el.setAttribute("min", "0"); 
            el.addEventListener('input',applyFont);
            block.appendChild(el);
        }
    });

    colorCheckbox.addEventListener('change', function () {
        let block = document.getElementById("color");
        if (!this.checked){
            block.removeChild(block.querySelectorAll("input")[1]);
        }else{
            let el = document.createElement("input");
            el.setAttribute("type", "color"); 
            el.setAttribute("value", "#000000"); 
            el.addEventListener('input',applyColor);
            block.appendChild(el);
        }
    });

    backgroundCheckbox.addEventListener('change', function () {
        let block = document.getElementById("bg");
        if (!this.checked){
            block.removeChild(block.querySelectorAll("input")[1]);
        }else{
            let el = document.createElement("input");
            el.setAttribute("type", "color"); 
            el.setAttribute("value", "#000000"); 
            el.addEventListener('input',applyBg);
            block.appendChild(el);
        }
    });

});

// const custom = document.getElementById('custom')

// const fontSizeInput = document.getElementById('font');
// const textColorInput = document.getElementById('textColor');
// const backgroundColorInput = document.getElementById('backgroundColor');

// function apply() {
//     custom.style.fontSize = fontSizeInput.value + 'pt';
//     custom.style.color = textColorInput.value;
//     custom.style.backgroundColor = backgroundColorInput.value;
// }
