import { validaciones } from './validaciones.js';

$(document).ready(function() {
  let btnVotar = $('#btn_votar');
  let selectRegion = $('#region');

  $.ajax({
    url: './PHP/SelectRegiones.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $('#region').append('<option value="">Seleccione</option>');

      for (var i = 0; i < data.length; i++) {
        $('#region').append('<option value="' + data[i].ID_REGION + '">' + data[i].NOMBRE_REGION + '</option>');
      }
    }
  });

  $.ajax({
    url: './PHP/SelectCandidato.php',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      $('#candidato').append('<option value="">Seleccione</option>');

      for (var i = 0; i < data.length; i++) {
        $('#candidato').append('<option value="' + data[i].ID_CANDIDATO + '">' + data[i].NOMBRE + '</option>');
      }
    }
  });

  $('.form-radio input[type="checkbox"]').on('change', function(evt) {
    if($('.form-radio input[type="checkbox"]:checked').length > 2) {
      this.checked = false;
    }
  });

  btnVotar.on('click', function(e) {
    e.preventDefault();
    let nombreApellido = $('#nombreApellido').val();
    let alias = $('#alias').val();
    let rut = $('#rut').val();
    let email = $('#email').val();
    let region = $('#region').val();
    let comuna = $('#comuna').val();
    let candidato = $('#candidato').val();


    let web = false;
    let tv = false;
    let redes = false;
    let amigo = false;

    if (!validaciones(nombreApellido , alias , email , rut)){
      return;
    }
    
    let checkboxes = $('.form-radio input[type="checkbox"]');
  
    checkboxes.each(function() {
      let checkbox = $(this);
      if (checkbox.is(':checked')) {
        let check = checkbox.attr('id');
        
        if(check.includes('web')){
          web = true;
        }

        if(check.includes('tv')){
          tv = true;
        }

        if(check.includes('redSocial')){
          redes = true;
        }

        if(check.includes('amigo')){
          amigo = true;
        }
        
      } else {
        let noCheck = checkbox.attr('id');

        if(noCheck.includes('web')){
          web = false;
        }

        if(noCheck.includes('tv')){
          tv = false;
        }

        if(noCheck.includes('redSocial')){
          redes = false;
        }

        if(noCheck.includes('amigo')){
          amigo = false;
        }
      }
    });

    $.ajax({
      url: './PHP/InsertVoto.php',
      type: 'POST',
      data: { 
        nombreApellido,
        alias,
        rut,
        email,
        web,
        tv,
        redes,
        amigo,
        region,
        comuna,
        candidato
      },
      dataType: 'json',
      success: function(data) {
        if(data == "INSERT_OK"){
          limpiar();
          return alert("Ingreso de voto exitoso");
        };

        if(data == "EXIST_RUT"){
          limpiar();
          return alert("Rut ya ha emitido voto");
        };

        if(data == "INSERT_ERROR"){
          limpiar();
          return alert("Error al ingresar el voto");
        };
      },error: function (data) {
        return alert("Error Sistema");
      }
    });

  })

  selectRegion.on('change', function(e) {
    $.ajax({
      url: './PHP/SelectComuna.php',
      type: 'POST',
      data: { id_region: selectRegion.val() },
      dataType: 'json',
      success: function(data) {
        $('#comuna').empty();
        for (var i = 0; i < data.length; i++) {
          $('#comuna').append('<option value="' + data[i].ID_COMUNA + '">' + data[i].NOMBRE_COMUNA + '</option>');
        }
      }
    });
  })
});

function limpiar (){
  $('#nombreApellido').val("");
  $('#alias').val("");
  $('#rut').val("");
  $('#email').val("");
  
  let checkboxes = $('.form-radio input[type="checkbox"]');
  
  checkboxes.each(function() {
    let checkbox = $(this);
    checkbox.prop('checked', false);  // Desmarcar todos los checkboxes
  });
}