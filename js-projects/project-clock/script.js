
// const DIGITALCLOCK = document.querySelector('.digitalClock h1');

// function leadingZero(time) {
//     if (time <= 9) {
//         time = "0" + time;
//     }
//     return time;
// }

function runClock() {
    var date = new Date();
    const hr = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();let MINUTEHAND = document.getElementById('min');
    let HOURHAND = document.getElementById('hour');
    let SECONDHAND = document.getElementById('sec');



    const hrPosition = (hr * 360 / 12) + (min * (360 / 60) / 12);
    const minPosition = (min * 360 / 60) + (sec * (360 / 60) / 60);
    const secPosition = sec * 360 / 60;
    
    setRotation(HOURHAND,hrPosition);
    setRotation(MINUTEHAND,minPosition);
    setRotation(SECONDHAND,secPosition)


    
    // DIGITALCLOCK.textContent = leadingZero(hr) + ":" + leadingZero(min) + ":" + leadingZero(sec);
}

function setRotation(element,rr)
{
    
    element.style.setProperty('--rotation',rr);

}

var interval = setInterval(runClock, 1000);

runClock();