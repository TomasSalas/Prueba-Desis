const validaciones = (nombreApellido, alias, email , rut) => {
  let regex = /^[a-zA-Z\d ]+$/;
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(nombreApellido == ""){
    alert("Debe agregar el nombre y apellido");
    return false;
  }

  if(alias.replace(/\s+/g, '').length < 5){
    alert("El alias debe ser mayor a 5 caracteres")
    return false;
  }
  
  if(!regex.test(alias)){
    alert("El alias debe contener letras y numeros")
    return false;
  }

  if (!validarRut(rut)) {
    alert("El RUT no es válido");
    return false;
  };

  if(!regexEmail.test(email)){
    alert("El email no es valido")
    return false;
  }

  return true
}


function validarRut(rut) {
  rut = rut.replace(/[.-]/g, '');

  let cuerpo = rut.slice(0, -1);
  let dv = rut.slice(-1).toUpperCase();

  if (!/^[0-9]+$/.test(cuerpo)) {
    return false;
  }

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i)) * multiplo;

    if (multiplo < 7) {
      multiplo += 1;
    } else {
      multiplo = 2;
    }
  }

  let dvEsperado = 11 - (suma % 11);
  dvEsperado = (dvEsperado === 10) ? 'K' : dvEsperado.toString();

  return dv === dvEsperado;
}

function limpiar (){
  $('#nombreApellido').val() = "";
  $('#alias').val() = "";
  $('#rut').val() = "";
  $('#email').val() = "";
  
  let checkboxes = $('.form-radio input[type="checkbox"]');
  
  checkboxes.each(function() {
    let checkbox = $(this);
    checkbox.prop('checked', false);  // Desmarcar todos los checkboxes
  });
}

export {validaciones };