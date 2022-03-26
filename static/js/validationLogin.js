const formLogin= document.getElementById('form_login');

const inputs= document.querySelectorAll('#form_login input');

const icon_Password= document.querySelector('.grup_icon-password')


// ..............Show Password.................

let status_Show_Password=false;
icon_Password.addEventListener('click',()=>{
	if(status_Show_Password==false){
		icon_Password.classList.remove('fa-eye-slash')
		icon_Password.classList.add('fa-eye')
		const CampPassword=document.querySelector('#password').type='text';
		status_Show_Password=true
}else{
		icon_Password.classList.remove('fa-eye')
		icon_Password.classList.add('fa-eye-slash')
		const CampPassword=document.querySelector('#password').type='password';
		status_Show_Password=false
	}})
	




const statusInput={
	email:false,
	password:false
};

const expresiones = {
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
	};

const validationForm= (e)=>{

	switch(e.target.name){

		case "email":

			validation(expresiones.correo,e.target,'email');
			const CampEmail= document.querySelector('.email_error').classList.remove("active");
		break;

		case "password":

		validation(expresiones.password,e.target,'password');
		const CampPassword= document.querySelector('.password_error').classList.remove("active");
		break;

    }
};


const validation= (expression,input,camp)=>{

	if(expression.test(input.value)){
		
        document.querySelector(`#grup_${camp} .${camp}_error-input`).classList.remove("active");
		
} else{
		
		document.querySelector(`#grup_${camp} .${camp}_error-input`).classList.add('active');     
		
		statusInput[camp]=false; 

	}

}

inputs.forEach((input)=>{
	input.addEventListener('keyup', validationForm);
	input.addEventListener('blur', validationForm);
});


formLogin.addEventListener('submit', (e)=>{
    
    
    SendJson()


});



function GetFormData(){
    let dataUser={};
    Array.from(formLogin.elements).forEach(element=>{
        
        if(element.name) dataUser[element.name]=element.value;
    
    })
    let JsondataUser= JSON.stringify(dataUser);
	console.log(JsondataUser);
    return JsondataUser;
}

    const SendJson=()=>{
        const xhr= new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/send_login');
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.send(GetFormData());
    }


