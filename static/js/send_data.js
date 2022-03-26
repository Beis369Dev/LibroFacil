const formUser= document.forms['formNewUser'];


/*formUser.onsubmit= (e)=>{
    e.preventDefault();
    SendJson();
}*/



function GetFormData(){
    let dataUser={};
    Array.from(formUser.elements).forEach(element=>{
        
        if(element.name) dataUser[element.name]=element.value;
    
    })
    let JsondataUser= JSON.stringify(dataUser);
    console.log(JsondataUser);
    return JsondataUser;
}


const SendJson=()=>{
    const xhr= new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/save_user');
    xhr.setRequestHeader('Content-Type','application/json');
    let valueA=GetFormData();
    xhr.send(valueA);
}