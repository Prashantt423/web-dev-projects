const toggleBtn= document.querySelector('.sidebar-toggle');
const sideBar= document.querySelector('.sidebar');
const closeBtn= document.querySelector('.close-btn');



toggleBtn.addEventListener('click',function(){

    console.log('hi there!')
    sideBar.classList.toggle("show-sidebar");

});



closeBtn.addEventListener('click',function (){
   sideBar.classList.remove("show-sidebar") ;
})