

//formulario registro
const formRegistro = document.querySelector(".formRegistro");
// Nombre usuario
const nombreInput = document.getElementById("nombre");
// direccion 
const direccionInput = document.getElementById("direccion");
// telefono
const telInput = document.getElementById("tel");
// email
const emailInput = document.getElementById("email");
// password
const passwordInput = document.getElementById("password");



//aca validacion registro



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



const chequeoNombre=()=>{

    let valido =  false;

    const nombreValue = nombreInput.value.trim();

    console.log(nombreValue);

    if(isEmpty(nombreValue)){
        // muestro error
        mostrarError(nombreInput, "El nombre es obligatorio");
    }else if(!(nombreValue.length > 4 && nombreValue.length < 16)){
        // muestro error 
        mostrarError(nombreInput, "El nombre debe tener entre 5 y 15 caracteres");
    }else {
        valido=true;
        console.log("nombrevalido");
        mostrarExito(nombreInput);
    }
    return valido;
};


const chequeoDireccion=()=>{

    let valido =  false;

    const direccionValue = direccionInput.value.trim();

    if(isEmpty(direccionValue)){
        // muestro error
        mostrarError(direccionInput, "La direccion no puede ser vacia");
    }else {
        valido=true;
        mostrarExito(direccionInput);
    }
    return valido;
};


const chequeoTel=()=>{

    let valido =  false;

    const telValue = telInput.value.trim();

    if(isEmpty(telValue)){
        // muestro error
        mostrarError(telInput, "El tel es obligatorio");
    }else if(!isPhoneValid(telValue)){
        // muestro error 
        mostrarError(telInput,"El telefono no es valido");
    }else {
        valido=true;
        mostrarExito(telInput);
    }
    return valido;
};


const chequeoEmail=()=>{

    let valido =  false;


    const emailValue = emailInput.value.trim();


    if(isEmpty(emailValue)){
        // muestro error
        mostrarError(emailInput, "El email es obligatorio");
    }else if(!isEmailValid(emailValue)){
        // muestro error 
        mostrarError(emailInput,"El email no es valido");
    }else {
        valido=true;
        mostrarExito(emailInput);
    }
    return valido;
};


const chequeoPass=()=>{

    let valido =  false;

    const passValue = passwordInput.value.trim();


    if(isEmpty(passValue)){
        // muestro error
        mostrarError(passwordInput, "La password es obligatoria");
    }else if(!isPassSecure(passValue)){
        // muestro error 
        mostrarError(passwordInput, "Su password no es segura");
    }else {
        valido=true;
        mostrarExito(passwordInput);
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


const isPhoneValid = (phone) => {
	const re = /^[0-9]{10}$/;
	// Testeamos
	return re.test(phone);
};


const isEmpty = (value) => value === "";




formRegistro.addEventListener("submit",(e)=>{

    e.preventDefault();

    let usuarioValido = chequeoNombre();
    let direccionValida = chequeoDireccion();
    let telValido = chequeoTel();
    let emailValido = chequeoEmail();
    let passValido = chequeoPass();

    let formularioValido = usuarioValido && direccionValida && telValido && emailValido && passValido;

    if(formularioValido){
        formRegistro.submit();
    }

});



//aca arranca validacion de form login



