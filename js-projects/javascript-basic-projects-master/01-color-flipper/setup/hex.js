const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn= document.getElementById("btn");
const color= document.querySelector(".color");

btn.addEventListener('click',function(){
 
    const colorCode= generateColorCode();
    document.body.style.backgroundColor=colorCode;
    color.textContent=colorCode;
  
  })


  function getRandomNumber(){

    return parseInt( Math.random()*hex.length)
  }

//   function getValueAt(position){
//       return hex[positon];
//   }

  function generateColorCode(){
       let i=0,code='#';
       for(i=0;i<6;i++)
       {
           code+=hex[getRandomNumber()];
       }
       console.log(code);
       return code;
  }