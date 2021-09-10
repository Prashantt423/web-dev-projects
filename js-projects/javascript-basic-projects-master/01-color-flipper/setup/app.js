const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const btn= document.getElementById('btn');
const color= document.querySelector(".color");
let i=0;

btn.addEventListener('click',function(){
    const randomNumber=getRandomNumber();
    console.log(randomNumber);
    document.body.style.backgroundColor=colors[randomNumber];

    // this will display the value of the color we r using
     color.textContent= colors[randomNumber];

})

//Math.random() return number between 0-1 so we are using parseInt() function to convert it into int.

function getRandomNumber(){
    return parseInt(Math.random()*colors.length);
}