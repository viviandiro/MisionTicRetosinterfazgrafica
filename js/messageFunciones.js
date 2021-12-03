/**
 * FUNCION PARA CONSULTAR 
 */
function consultar() 
{
    $.ajax( 
       {
            url: 'http://192.9.238.242:8080/api/Message/all',
            //  data : { id : 123 },
            type: 'GET',
            dataType: 'json',

                                 
            success: function (response) {
                $("#resultado").empty();
                
                tabla = "<center><table  border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE<th style='color: #00bbbb;'>LIBRERIA"+
                "<th style='color: #00bbbb;'>CLIENTE<th style='color: #00bbbb;'>ELIMINAR"
                
                filas = ""
                for (i = 0; i < response.length; i++) {
                    filas += "<tr align='center'>"
                    filas += "<td>" + response[i].idMessage + "</td>",
                    filas += "<td>" + response[i].messageText + "</td>",
                    filas += "<td>" + response[i].lib + "</td>",
                    filas += "<td>" + response[i].client+ "</td>",
                    filas += "<td><button  onclick='Eliminar("+ response[i].idMessage +")'>ELIMINAR</button>"
                }
                $("#resultado").append(tabla + filas  + "</center>")
                console.log(response)
                
            },complete: function (xhr, status) {
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
        var id = campoId.val()
        $.ajax(
            {
                url: 'http://192.9.238.242:8080/api/Message/'+id,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    $("#resultado").empty();
                    if(json.items.length == 0){
                        alert("Digito erroneo, vuelve a intentarlo")
                        campoId.val("")
                        
                    }
                    else{
                        tabla = "<center><table border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE"
                        filas = ""
                        for (i = 0; i < json.items.length; i++) {
                            filas += "<tr align='center'>"
                            filas += "<td>" + json.items[i].id
                            filas += "<td><textarea>" + json.items[i].messagetext + "</textarea></td>"
                            
                        }
                        $("#resultado").append(tabla + filas  + "</center>")
                        console.log(json)
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
    tabla = "<center><table border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE"+
    "<th style='color: #00bbbb;'>LIBRERIA<th style='color: #00bbbb;'>CLIENTE<th style='color: #00bbbb;'>GUARDAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codi' type='number' placeholder='Digita el id'>"
        filas += "<td><textarea id='mensaje' rows='5' cols=' 25' placeholder='Escribe un mensaje'></textarea>"  
        filas += "<td><input id='libra' type='text' placeholder='Digita el id libreria'>"
        filas += "<td><input id='mes' type='text' placeholder='Digita el id mensaje'>"
        filas += "<td><input id='btnGuardar' type=button value='GUARDAR' onclick=guardarMensaje()>"
    
    $("#resultado").append(tabla + filas + "</center>")
    //console.log("#id")
    
}
/**
 * FUNCION QUE SOLICITA AL API REST ORACLE QUE GUARDE UN REGISTRO
 */

function guardarMensaje(){
    var var1={
        idMessage:$("#codi").val(),
        messageText:$("#mensaje").val(),
        //lib:$("#libra").val(),
        //client:$("#mes").val(),
    }
    
    if(validarFormulario()){
        if(confirm("Seguro que deseas Guardar")){
                $.ajax(
                    {
                        url: 'http://192.9.238.242:8080/api/Message/save',
                        type: 'POST',
                        data : JSON.stringify(var1),
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
 * FUNCION PARA VALIDAR CAMPOS
 */
function validarFormulario(){
   
        if($("#mensaje").val() == ""){
        alert("El MENSAJE es necesario")
        return false
    }
   
    return true
}



/**
 * FUNCION PARA CREAR TABLA DE ACTUALIZAR
 */

function tablaActualizar(){
    
    tabla = "<center><table border='1'><tr><th style='color: #00bbbb;'>ID<th style='color: #00bbbb;'>MENSAJE" +
    "<th style='color: #00bbbb;'>LIBRERIA<th style='color: #00bbbb;'>CLIENTE<th style='color: #00bbbb;'>GUARDAR</th>"
    filas = ""
        filas += "<tr align='center'>"
        filas += "<td><input id='codi' type='number' placeholder='Digita el id'>"
        filas += "<td><textarea id='mensaje' rows='5' cols=' 25' placeholder='Escribe un mensaje'></textarea>"
        filas += "<td><input id='lib' type='number' placeholder='Digita el id libreria'>"
        filas += "<td><input id='mes' type='number' placeholder='Digita el id mensaje'>"
        filas += "<td><input id='btnActualizar' type=button value='ACTUALIZAR' onclick=actualizar()>"
    
    $("#resultado").append(tabla + filas + "</center>")
     console.log("#id")
     
}
function validarId(){
   
    if($("#codi").val() == ""){
        alert("El Id es necesario")
        return false
    } 
    if($("#mensaje").val() == ""){
        alert("El MENSAJE es necesario")
        return false
    }
     
    return true
    
}
/**
 * FUNCION PARA ACTUALIZAR
 */

function actualizar(){
    var myData={
        idMessage: $("#codi").val(),
        messageText: $("#mensaje").val(),
       // lib: $("#lib").val(),
        ///client: $("#mes").val(),
    };
    var dataToSend= JSON.stringify(myData);
    
    if(validarId()) {
        if(confirm("Seguro que deseas Actualizar")){
                $.ajax(
                    {
                        url: 'http://192.9.238.242:8080/api/Message/update',
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
                url: "http://192.9.238.242:8080/api/Message/" + idElement,
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
