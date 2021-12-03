/**
 * FUNCION PARA CONSULTAR 
 */
function consultar() {
    $.ajax(
        {
            url: 'http://192.9.238.242:8080/api/Lib/all',
            //  data : { id : 123 },
            type: 'GET',
            dataType: 'json',


            success: function (response) {
                $("#resultado").empty();

                tabla = "<center><table  border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>NAME<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
                "<th style='color: #59b300;'>DESCRIPTION<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>ELIMINAR"

                filas = ""
                for (i = 0; i < response.length; i++) {
                    filas += "<tr align='center'>"
                    filas += "<td>" + response[i].id + "</td>",
                    filas += "<td>" + response[i].name + "</td>"
                    filas += "<td>" + response[i].target + "</td>",
                    filas += "<td>" + response[i].capacity + "</td>",
                    filas += "<td>" + response[i].description + "</td>"
                    filas += "<td>" + response[i].category_id + "</td>",
                    filas += "<td><button  onclick='Eliminar(" + response[i].id + ")'>ELIMINAR</button>"
                }
                $("#resultado").append(tabla + filas + "</center>")
                console.log(response)

              }, 
                complete: function (xhr, status) {
                alert('SOLICITUD REALIZADA, ' + xhr.status);

            }
        }
    );
}

/**
 * FUNCION PARA CONSULTAR POR ID
 */

function consultarPorId(campoId) {
    if (campoId.val() == "") {
        alert("INGRESE EL ID")
    }
    else {
        var id = campoId.val()
        $.ajax(
            {
                url: 'http://192.9.238.242:8080/api/Lib/' + id,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    $("#resultado").empty();
                    if (json.items.length == 0) {
                        alert("Digito erroneo, vuelve a intentarlo")
                        campoId.val("")

                    }
                    else {
                        tabla = "<center><table border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
                            "<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>NAME"
                        filas = ""
                        for (i = 0; i < json.items.length; i++) {
                            filas += "<tr align='center'>"
                            filas += "<td>" + json.items[i].id + "</td>",
                                filas += "<td>" + json.items[i].target + "</td>",
                                filas += "<td>" + json.items[i].capacity + "</td>",
                                filas += "<td>" + json.items[i].category_id + "</td>",
                                filas += "<td>" + json.items[i].name + "</td>"
                        }
                        $("#resultado").append(tabla + filas + "</center>")
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
function limpiarFormulario() {
    if (confirm("¿SEGURO QUE DESEA LIMPIAR LA PAGINA?")) {
        var campo = document.getElementById("id")
        var resultado = document.getElementById("resultado")
        campo.value = "";
        resultado.innerHTML = ""
    }
}

/**
 * FUNCION PARA CREAR TABLA DE GUARDAR
 */
function crearTablaGuardar() {
    $("#resultado").empty();
    tabla = "<center><table border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>NAME<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
    "<th style='color: #59b300;'>DESCRIPTION<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>GUARDAR</th>"
    filas = ""
    filas += "<tr align='center'>"
    filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>"
    filas += "<td><input id='name' type='text' placeholder='Digita el name'>"
    filas += "<td><input id='target' type='text' placeholder='Digita target'>"
    filas += "<td><input id='capacity' type='number' placeholder='Digita capacity'>"
    filas += "<td><input id='description' type='text' placeholder='Digita la description'>"
    filas += "<td><input id='categoryId' type='number' placeholder='Digita category_Id'>"
    filas += "<td><input id='btnGuardar' type=button value='GUARDAR' onclick=guardarUsuario()>"

    $("#resultado").append(tabla + filas + "</center>")
    console.log("#id")

}


/**
 * FUNCION QUE SOLICITA AL API REST ORACLE QUE GUARDE UN REGISTRO
 */



function guardarUsuario() {
        let var2={
                id: $("#codigo").val(),
                name: $("#name").val(),
                target: $("#target").val(),
                capacity: $("#capacity").val(),
                description:$("#description").val(),
                category_id: $("#categoryId").val(),
        }
    if (validarFormulario()) {
        if (confirm("Seguro que deseas Guardar")) {
            $.ajax(
                {
                    url: 'http://192.9.238.242:8080/api/Lib/save',
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
                    alert('Ha ocurrido un error:' );
                    
                    },

                }
            )
        }
    }
}

/**
 * FUNCION PARA VALIDAR CAMPOS GUARDAR
 */
function validarFormulario() {

    if ($("#target").val() == "") {
        alert("TARGET es necesario")
        return false
    }
    if ($("#capacity").val() == "") {
        alert("CAPACITY es necesario")
        return false
    }
    if ($("#description").val() == "") {
        alert("DESCRIPTION es necesario")
        return false
    }
    if ($("#name").val() == "") {
        alert("NAME es necesariO")
        return false
    }
    return true
}


/**
 * FUNCION PARA CREAR TABLA DE ACTUALIZAR
 */

function tablaActualizar() {

    tabla = "<center><table border='1'><tr><th style='color: #59b300;'>ID<th style='color: #59b300;'>NAME<th style='color: #59b300;'>TARGET<th style='color: #59b300;'>CAPACITY" +
    "<th style='color: #59b300;'>DESCRIPTION<th style='color: #59b300;'>CATEGORY_ID<th style='color: #59b300;'>ACTUALIZAR</th>"
    filas = ""
    filas += "<tr align='center'>"
    filas += "<td><input id='codigo' type='number' placeholder='Digita el id'>"
    filas += "<td><input id='name' type='text' placeholder='Digita el name'>"
    filas += "<td><input id='target' type='text' placeholder='Digita target'>"
    filas += "<td><input id='capacity' type='number' placeholder='Digita capacity'>"
    filas += "<td><input id='description' type='text' placeholder='Digita la description'>"
    filas += "<td><input id='categoryId' type='number' placeholder='Digita category_Id'>"
    filas += "<td><input id='btnActualizar' type=button value='ACTUALIZAR' onclick=actualizar()>"
    $("#resultado").append(tabla + filas + "</center>")
    console.log("#id")

}
/**
 * FUNCION PARA VALIDAR DATOS CON EL ID
 */

function validarId() {

    if ($("#codigo").val() == "") {
        alert("El Id es necesario")
        return false
    
    }
    return true

}
/**
 * FUNCION PARA ACTUALIZAR
 */

function actualizar() {
    var myData = {
        id: $("#codigo").val(),
        name: $("#name").val(),
        target: $("#target").val(),
        capacity: $("#capacity").val(),
        description: $("#description").val(),
        category_id: $("#categoryId").val(),
        
    };
    var dataToSend = JSON.stringify(myData);

    if (validarId()) {
        if (confirm("Seguro que deseas Actualizar")) {
            $.ajax(
                {
                    url: 'http://192.9.238.242:8080/api/Lib/update',
                    type: 'PUT',
                    data: dataToSend,
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
function Eliminar(idElement) {
    let myData = {
        id: idElement
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax(
        {
            url: "http://192.9.238.242:8080/api/Lib/"+ idElement,
            type: "DELETE",
            data: dataToSend,
            contentType: "application/JSON",
            dataType: "JSON",


            complete: function (xhr, status) {
            $("#resultado").empty();
            consultar();
            alert('REGISTRO ELIMINADO ' + xhr.status)

            },
        }
    );
}
