

// document.addEventListener('DOMContentLoaded',()=>{

//         Get_Notification()

// })


// const Get_Notification= ()=>{

//     const xhttp = new XMLHttpRequest();
//     xhttp.open('GET', 'http://127.0.0.1:8000/checkNotification', true);
//     xhttp.send();

//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             let data1 = this.responseText;
//             if(data1 != false){ 
//             const Jdata1 = JSON.parse(data1);
//             console.log(Jdata1)
//         }
// }}}