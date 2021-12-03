/**
 * FUNCION PARA CONSULTAR 
 */
function consultar() 
{
    $.ajax( 
       {
            url: 'http://192.9.238.242:8080/api/Reservation/all',
            //  data : { id : 123 },
            type: 'GET',
            dataType: 'json',
            
            success: function (response) {
                $("#resultado").empty();
              
                tabla =  "<center><table  border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>FECHA INICIO" +
                "<th style='color: #0F86C8;'>FECHA ENTREGA<th style='color: #0F86C8;'>ESTADO<th style='color: #0F86C8;'>ELIMINAR"
                
                filas = ""
                for ( i = 0; i < response.length; i++) {
                    filas += "<tr align='center'>"
                    filas += "<td>" + response[i].idReservation + "</td>",
                    filas += "<td>" + response[i].startDate + "</td>",
                    filas += "<td>" + response[i].devolutionDate + "</td>",
                    filas += "<td>" + response[i].status + "</td>",
                    
                    filas += "<td><button  onclick='Eliminar("+ response[i].idReservation +")'>ELIMINAR</button>"
                }
                $("#resultado").append(tabla + filas  + "</center>")
                console.log(response)
                    
            },  complete: function (xhr, status) {
                alert('SOLICITUD REALIZADA, ' + xhr.status);
                 
            }  
        }
    );
}

/**
 * FUNCION PARA CONSULTAR POR ID
 */

function consultarPorId(campoId){
    if(campoId.val() == ""){
        alert("INGRESE EL ID")
    }
    else{
        let id=campoId.val();
        $.ajax(
            {
                url: 'http://192.9.238.242:8080/api/Reservation/' + id,
                type: 'GET',
                dataType: 'JSON',
                contentType: "application/json; charset=UTF-8",
                success: function (respuesta) {
                    $("#resultado").empty();
                   if(respuesta == null){
                       alert("Digito no EXISTE, vuelve a intentarlo")
                       campoId.val("")
                   }
                   else{  
                    tabla = "<center><table  border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>FECHA INICIO" +
                            "<th style='color: #0F86C8;'>FECHA ENTREGA"
                    filas = ""
                    for ( i = 0; i < respuesta.length ; i++) {
                        filas += "<tr align='center'>"
                        filas += "<td>" + respuesta[i].id + "</td>",
                        filas += "<td>" + respuesta[i].email + "</td>",
                        filas += "<td>" + respuesta[i].password + "</td>",
                        filas += "<td>" + respuesta[i].name + "</td>",
                        filas += "<td>" + respuesta[i].age + "</td>"
                       
                    
                
                 }
               $("#resultado").append(tabla + filas + "</center>")
                console.log(respuesta)
                }
               
                },
                complete: function (xhr, status) {
                    alert('SOLICITUD REALIZADA, ' + xhr.status);
                
                },
                error: function (xhr, status) {
                    alert('ERROR, ' + xhr.status);
                }

            }

        )
    }
}

/**
 * FUNCION PARA LIMPIAR FORMULARIO
 */
function limpiarFormulario(){
    if(confirm("¿SEGURO QUE DESEA LIMPIAR LA PAGINA?")){
        var campo =  document.getElementById("id")
        var resultado =  document.getElementById("resultado")
        campo.value = "";
        resultado.innerHTML = ""
    }
}

/**
 * FUNCION PARA CREAR TABLA DE GUARDAR
 */
function crearTablaGuardar(){
    $("#resultado").empty();
    tabla = "<center><table  border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>FECHA INICIO" +
    "<th style='color: #0F86C8;'>FECHA ENTREGA<th style='color: #0F86C8;'>GUARDAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>"
        filas += "<td><input id='fechini' type='date' placeholder='Digita el fecha'>"  
        filas += "<td><input id='fechent' type='date' placeholder='Digita el fecha'>"
        filas += "<td><input id='btnGuardar' type=button value='GUARDAR' onclick=guardarUsuario()>"
    
    $("#resultado").append(tabla + filas + "</center>")
    
    
}


/**
 * FUNCION QUE SOLICITA AL API REST ORACLE QUE GUARDE UN REGISTRO
 */



function guardarUsuario(){
    let var2={
        idReservation:  $("#codigo").val(),
        startDate: $("#fechini").val(),
        devolutionDate:  $("#fechent").val(),
    }

    if(validarFormulario()){
        if(confirm("Seguro que deseas Guardar")){
                $.ajax(
                    {
                        url: 'http://192.9.238.242:8080/api/Reservation/save',
                        type: 'POST',
                        data : JSON.stringify(var2),
                        dataType: 'JSON',
                        contentType: "application/json; charset=UTF-8",
                                                                         
                        success: function (xhr, status) {
                            $("#resultado").empty();
                            consultar();
                            alert('REGISTRO GUARDADO, ' + xhr.status);
                            
                        },
                        error: function(jqXHR, textStatus, errorTrow) {
                           
                            alert('Ha ocurrido un errr:' );
                        }
                    }
                )
        }
    }
}

/**
 * FUNCION PARA VALIDAR CAMPOS GUARDAR
 */
function validarFormulario(){
   
    if($("#fechini").val() == ""){
        alert("LA FECHA es necesaria")
        return false
    }
    if($("#fechent").val() == ""){
        alert("LA FECHA es necesaria")
        return false
    }
    
    return true
}


/**
 * FUNCION PARA CREAR TABLA DE ACTUALIZAR
 */

function tablaActualizar(){
    
    tabla = "<center><table  border='1'><tr><th style='color: #0F86C8;'>ID<th style='color: #0F86C8;'>FECHA INICIO" +
    "<th style='color: #0F86C8;'>FECHA ENTREGA<th style='color: #0F86C8;'>ACTUALIZAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>"
        filas += "<td><input id='fechini' type='date' placeholder='Digita el fecha'>"  
        filas += "<td><input id='fechent' type='date' placeholder='Digita el fecha'>" 
        filas += "<td><input id='btnActualizar' type=button value='ACTUALIZAR' onclick=actualizar()>"
    
    $("#resultado").append(tabla + filas + "</center>")
     console.log("#idClient")
     
}
/**
 * FUNCION PARA VALIDAR DATOS CON EL ID
 */

function validarId(){
   
    if($("#codigo").val() == ""){
        alert("El Id es necesario")
        return false
    }
    if($("#fechini").val() == ""){
        alert("LA FECHA es necesaria")
        return false
    }
    if($("#fechent").val() == ""){
        alert("LA FECHA es necesaria")
        return false
    }
    
     
    return true
    
}
/**
 * FUNCION PARA ACTUALIZAR
 */

function actualizar(){
    var myData={
        idReservation:  $("#codigo").val(),
        startDate: $("#fechini").val(),
        devolutionDate:  $("#fechent").val(),
        
    };
    var dataToSend= JSON.stringify(myData);
    
    if(validarId()) {
        if(confirm("Seguro que deseas Actualizar")){
                $.ajax(
                    {
                        url: 'http://192.9.238.242:8080/api/Reservation/update',
                        type: 'PUT',
                        data:dataToSend,
                        contentType: "application/JSON",
                        dataType: 'JSON',
                    
                            complete: function (xhr, status) {
                            $("#resultado").empty();
                            consultar();
                            alert('REGISTRO ACTUALIZADO ' + xhr.status);
                             
                        },
                    }  
                  );
               }
             
        }
    
    
}


/**
 * FUNCION PARA ELIMINAR
 */
function Eliminar(idElement){
   let myData={
      id:idElement
    };
    let dataToSend=JSON.stringify(myData);
        $.ajax(
            {
                url: "http://192.9.238.242:8080/api/Reservation/"+ idElement,
                type: "DELETE",
                data:dataToSend,
                contentType:"application/JSON",
                dataType: "JSON",
                
                
                    complete: function (xhr, status) {
                    $("#resultado").empty();
                    consultar();
                    alert('REGISTRO ELIMINADO ' + xhr.status)
                       
                    },
            }
        );
 }   
