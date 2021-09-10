// initial count
let count = 0;
// value.textContent= count;

const value = document.querySelector('#value');
const btns = document.querySelectorAll(".btn");// a list 

//traversing items of list 
btns.forEach(function (btn) {

    btn.addEventListener('click', function (e) {
        const targetBtn = e.currentTarget.classList;
        console.log(targetBtn);
        if (targetBtn.contains("decrease")) {
            count--;
        }   // if targetbtn contains a "decrease"  class


        else if (targetBtn.contains("increase")) {
            count++;
        }


        else if (targetBtn.contains("reset")) {
            count = 0;
        }


        console.log(count)
        value.textContent = count;

        if (count > 0) {
            value.style.color = 'Pink'
        }
        else if (count < 0) {
            value.style.color = 'Blue'
        }
        if (count === 0) {
            value.style.color = 'Black'
        }

    })

})
