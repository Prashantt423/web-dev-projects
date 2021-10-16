const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const dateInWord= function convertDate(datestr) {
    var temp_date = datestr.split('-');
    return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
  }

  export default dateInWord;