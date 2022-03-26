const form_Up_Data_User= document.getElementById('form_Up_Data_User');
const inputs_Up_Data= document.querySelectorAll('#form_Up_Data_User input');

const statusInput={
	name:false,
	lastName:false,
	phone:false,
	address:false,
	password:false,
	password2: false
};


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,30}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	domicilio: /^[a-zA-ZÀ-ÿ\s0-9\_\-]{4,50}$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const validteForm= (e)=>{
	switch(e.target.name){

		case "Name":

			validation(expresiones.nombre,e.target,'name');
		break;
 
		case "lastName":

		validation(expresiones.nombre,e.target,'lastName');
		break;

		case "email":

			validation(expresiones.correo,e.target,'email');
			if (statusInput['email']){

				validationEmail_InDB(e.target.value);
			
			}
			
			
		break;

		case "phone":
			validation(expresiones.telefono,e.target,'phone');
		break;

		case "address":

		validation(expresiones.domicilio,e.target,'address');
		break;
	
		case "password":
			validation(expresiones.password,e.target,'password');
			validatePassword();
	
		break;

		case "R_password":

			validatePassword();

		break;


	}
	
}


const validation= (expression,input,camp)=>{

	if(expression.test(input.value)){
		document.getElementById(`grup_${camp}`).classList.remove('form_grup-fail');
		document.getElementById(`grup_${camp}`).classList.add('form_grup-correct');
		document.querySelector(`#grup_${camp} i`).classList.remove('fa-times-circle')
		document.querySelector(`#grup_${camp} i`).classList.add("fa-check");
		document.querySelector(`#grup_${camp} .form_input-error`).classList.remove("form_input-error-active");
		statusInput[camp]=true;   
		
		
	} else{
		document.getElementById(`grup_${camp}`).classList.remove('form_grup-correct');
		document.getElementById(`grup_${camp}`).classList.add('form_grup-fail');
		document.querySelector(`#grup_${camp} i`).classList.add('fa-times-circle');     
		document.querySelector(`#grup_${camp} i`).classList.remove("fa-check");
		document.querySelector(`#grup_${camp} .form_input-error`).classList.add("form_input-error-active");
		statusInput[camp]=false; 

	}

}



inputs_Up_Data.forEach((input)=>{
	input.addEventListener('keyup', validteForm);
	input.addEventListener('blur', validteForm);
});


const validatePassword=()=>{

	const password1= document.getElementById('password');
	const password2= document.getElementById('R_password');

	if(password1.value !== password2.value || password1.value.length < 4 ){

		document.getElementById('grup_R-password').classList.add('form_grup-fail');
		document.getElementById('grup_R-password').classList.remove('form_grup-correct');
		document.querySelector('#grup_R-password i').classList.add('fa-times-circle')
		document.querySelector('#grup_R-password i').classList.remove("fa-check");
		document.querySelector('#grup_R-password .form_input-error').classList.add("form_input-error-active");

		statusInput['password2']=false;

	}
	else{

		document.getElementById('grup_R-password').classList.remove('form_grup-fail');
		document.getElementById('grup_R-password').classList.add('form_grup-correct');
		document.querySelector('#grup_R-password i').classList.remove('fa-times-circle')
		document.querySelector('#grup_R-password i').classList.add("fa-check");
		document.querySelector('#grup_R-password .form_input-error').classList.remove("form_input-error-active");

		statusInput['password2']=true;

	}
}
//.............................Envio de datos ..........................................................

form_Up_Data_User.addEventListener('submit',(e)=>{
	e.preventDefault();

	
	const menssage= document.getElementById('form_message');
	const sussesMessage= document.getElementById('formMessgeSusses');

	if (statusInput.name && statusInput.lastName  && statusInput.password &&  statusInput.phone && statusInput.password2 && statusInput.address ){
		SendJson();
		menssage.classList.remove('form_message-activo');
		sussesMessage.classList.add('form_message-susses-active')

		setTimeout(()=>{
			sussesMessage.classList.remove('form_message-susses-active')

		}, 4000 )

		document.querySelectorAll('.form_grup-icon').forEach((icon)=>{ 
			icon.classList.remove('fa-check');
		});


		
	}
	else{
		
		menssage.classList.add('form_message-activo');

		setTimeout(()=>{
			menssage.classList.remove('form_message-activo');
		},5000);
		
	}



})


	


const validationEmail_InDB= (email)=>{

	const xhttp=new XMLHttpRequest();
    xhttp.open('GET',`http://127.0.0.1:8000/validationEmail/${email}/`,true);
    xhttp.send();

    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let data= this.responseText;

           console.log(data)

		   if (data=="true"){
			console.log("puede usarlo ")
			document.querySelector('#grup_email .form_error-email').classList.remove('form_error-email-active');
			document.querySelector('#grup_email .form_error-email').classList.add('form_error-email');
			document.querySelector(`#grup_email i`).classList.remove('fa-exclamation');
			document.querySelector(`#grup_email i`).classList.add("fa-check");
			document.getElementById(`grup_email`).classList.remove('form_grup-fail')
			statusInput['email']=true;
			
			
		   }
		   else{
			console.log("El correo ya existe")
			document.querySelector('#grup_email .form_error-email').classList.add('form_error-email-active');
			document.getElementById(`grup_email`).classList.add('form_grup-fail')
			document.querySelector(`#grup_email i`).classList.remove("fa-check");
			document.querySelector(`#grup_email i`).classList.add('fa-exclamation');
			statusInput['email']=false;
			
		}
        }
        else{
            console.log("error ")
        }
    }

}

const formUserD= document.forms['formNewUser'];


/*formUser.onsubmit= (e)=>{
    e.preventDefault();
    SendJson();
}*/



function GetFormData(){
    let dataUser={};
    Array.from(formUserD.elements).forEach(element=>{
        
        if(element.name) dataUser[element.name]=element.value;
    
    })
    let JsondataUser= JSON.stringify(dataUser);
	console.log(JsondataUser);
    return JsondataUser;
}


const SendJson=()=>{
    const xhr= new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:8000/UpDataUser');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(GetFormData());
}










//................... show_password----------------------


const icon_Password= document.querySelectorAll('.grup_icon_N_user-password');
let status_Show_Password=false;

const liste_icon= (e)=>{
	
	if(status_Show_Password==false){
		e.target.classList.remove('fa-eye-slash')
		e.target.classList.add('fa-eye')
		e.target.parentNode.childNodes[1].type='text';
		status_Show_Password=true
}else{
		e.target.classList.remove('fa-eye')
		e.target.classList.add('fa-eye-slash')
		e.target.parentNode.childNodes[1].type='password';
		status_Show_Password=false
	}
}
	
icon_Password.forEach((icon)=>{
	icon.addEventListener('click', liste_icon);
	icon.addEventListener('click', liste_icon);
});