// formulario
const formLogin = document.querySelector(".formLogin");
// usuario
const usuarioLoginInput = document.getElementById("usuario");
// password
const passLoginInput = document.getElementById("password");




const mostrarError = (input ,message) => {
	const formField = input.parentElement;
	// formField.classList.remove("success");
    // formField.classList.add("i-column");
	formField.classList.add("error");
    
    const inputContainer = formField.parentElement;
	const error = inputContainer.querySelector("small");
    inputContainer.classList.add("i-column");
	error.textContent = message;
};

const mostrarExito = (input) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");
    
    const inputContainer = formField.parentElement;
	const error = inputContainer.querySelector("small");
    // // inputContainer.classList.add("i-column");
	error.textContent = "";
};






const chequeoUser=()=>{

    let valido =  false;


    const emailValue = usuarioLoginInput.value.trim();

    console.log("llego chequeo user");

    if(isEmpty(emailValue)){
        // muestro error
        mostrarError(usuarioLoginInput, "El email es obligatorio");
    }else if(!isEmailValid(emailValue)){
        // muestro error 
        mostrarError(usuarioLoginInput,"El email no es valido");
    }else {
        valido=true;
        mostrarExito(usuarioLoginInput);
    }
    return valido;
};


const chequeoPass=()=>{

    let valido =  false;

    const passValue = passLoginInput.value.trim();

    console.log("llego chequeo pas");

    if(isEmpty(passValue)){
        // muestro error
        mostrarError(passLoginInput, "La password es obligatoria");
    }else if(!isPassSecure(passValue)){
        // muestro error 
        mostrarError(passLoginInput, "Su password no es segura");
    }else {
        valido=true;
        mostrarExito(passLoginInput);
    }
    return valido;
};


const isPassSecure = (pass) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	return re.test(pass);
};

const isEmailValid = (value) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

	return re.test(value);
};



const isEmpty = (value) => value === "";


 formLogin.addEventListener("submit",(e)=>{

     e.preventDefault();

     console.log("hola");

    let userLogin = chequeoUser();
    let passLogin = chequeoPass();

     let formularioValidoLogin = userLogin && passLogin;

     if(formularioValidoLogin){

         formLogin.submit();
     };


 });


