//variables globales
const btnBuscar = document.getElementById("btnBuscar");
const btnLimpiar = document.getElementById("btnLimpiar");
const formularioUI = document.getElementById("formulario");
const listarActividadesUI = document.getElementById("listarActividades");
//saber si el documento ya cargo
$(document).ready(function () {
    listarAllTareas();
});



//funciones 

const listarAllTareas = () => {
    $.get("Tarea/ListarTareas", (data) => {
        CrearCard(data);
    });
}


const CrearCard = (data) => {
    let prioridad = "";
    let fecha_mostrar_creacion = "";
    let fecha_mostrar_termino = "";
    data.forEach(elemento => {

        if (elemento.PRIORIDAD == 1) {
            prioridad = "BAJA";
        } else if (elemento.PRIORIDAD == 2) {
            prioridad = "MEDIA"
        } else {
            prioridad = "ALTA";
        }
        let fechacreacion = elemento.FECHA_CREACION;
        let fechatermino =elemento.FECHA_TERMINO;
        let value1 = new Date
            (
                parseInt(fechacreacion.replace(/(^.*\()|([+-].*$)/g, ''))
            );
        let value2 = new Date
            (
                parseInt(fechatermino.replace(/(^.*\()|([+-].*$)/g, ''))
            );
        let fcreacion = new Date(value1.getTime());
        let ftermino = new Date(value2.getTime());
        if (fcreacion == "Invalid Date") {
            fecha_mostrar_creacion = ""
        } else {
            fecha_mostrar_creacion = fcreacion.toLocaleString();
        }
        if (ftermino == "Invalid Date" || ftermino == "Mon Jan 01 1990 00:00:00 GMT-0500 (hora estándar de Colombia)") {
            fecha_mostrar_termino = ""
        } else {
            fecha_mostrar_termino = ftermino.toLocaleString();
        }
        if (elemento.ESTADO == 1) {
            listarActividadesUI.innerHTML += `
            <div class="col-sm-4 ">
                    <div class="thumbnail yellow">
                        <div class="caption">
                             <div class="colorn">
                            <p>TITULO:<label>${elemento.TITULO}</label></p>
                            <p>NOTAS:<label>${elemento.NOTAS}</label></p>
                            <p>PRIORIDAD:<label>${prioridad}</label></p>
                            <div class="row">
                                <div class="thumbnail-description small text-center ">
                                    <p class="col-md-4 ">F.Creacion:<label> ${fecha_mostrar_creacion}</label> </p>
                                    <p class="col-md-4 col-md-offset-4">F.Termino:<label> ${fecha_mostrar_termino}</label></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="caption card-footer text-center">
                            <ul class="list-inline">
                                <li>
                                <button class="btn btn-primary" onclick="AbrirModal(${elemento.ID})" style="margin: 4px" data-toggle="modal" data-target="#myModal" > <i class="glyphicon glyphicon-edit"></i> </button>
                                </li>
                                <li></li>
                                <li>
                                <button class="btn btn-danger" onclick="Eliminar(${elemento.ID})"> <i class="glyphicon glyphicon-trash"></i></button>
                                </li>
                            </ul>
                        </div>
                    </div>
              </div>
        `;
        } else {
            listarActividadesUI.innerHTML += `
            <div class="col-sm-4 ">
                    <div class="thumbnail gray">
                        <div class="caption ">
                            <div class="color">
                              
                            <p>TITULO:<label>${elemento.TITULO}</label></p>
                            <p>NOTAS:<label>${elemento.NOTAS}</label></p>
                            <p>PRIORIDAD:<label>${prioridad}</label></p>
                            <div class="row">
                                <div class="thumbnail-description small text-center ">
                                    <p class="col-md-4 ">F.Creacion:<label> ${fecha_mostrar_creacion}</label> </p>
                                    <p class="col-md-4 col-md-offset-4">F.Termino:<label> ${fecha_mostrar_termino}</label></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="caption card-footer text-center">
                            <ul class="list-inline">
                                <li>
                                <button class="btn btn-primary" onclick="AbrirModal(${elemento.ID})" style="margin: 4px" data-toggle="modal" data-target="#myModal" disabled> <i class="glyphicon glyphicon-edit"></i> </button>
                                </li>
                                <li></li>
                                <li>
                                <button class="btn btn-danger" onclick="Eliminar(${elemento.ID})"> <i class="glyphicon glyphicon-trash"></i></button>
                                </li>
                            </ul>
                        </div>
                    </div>
              </div>
        `;
        }
    });
}


const buscar = () => {
    let prioridad = document.getElementById("selectBuscarP").value;
    if (prioridad == 0) {
        alert("NO HAS SELECCIONADO UNA PRIORIDAD 😢");
    } else {
        $.get("Tarea/BuscarPorPrioridad/?prioridad=" + prioridad, (data) => {
            //crearListado(arrayColumnas, data);
            listarActividadesUI.innerHTML = "";
            CrearCard(data)
        });
    }
}

const limpiar = () => {
    let prioridad = document.getElementById("selectBuscarP");
    prioridad.value = "0";
    listarActividadesUI.innerHTML = "";
    listarAllTareas();
}

const AbrirModal = (id) => {
    
    const controladores = document.getElementsByClassName("obligatorio");
    for (let i = 0; i < controladores.length; i++) {
        controladores[i].parentNode.classList.remove("error");
    }
   
    if (id === 0) {
        BorrarDatos();
    } else {
        
        $.get("Tarea/BuscarPorId/?id=" + id, (data) => {
            /*alert(JSON.stringify(data))*/
            document.getElementById("idn").value = data[0].ID;
            document.getElementById("titulon").value = data[0].TITULO;
            document.getElementById("notasn").value = data[0].NOTAS;
            document.getElementById("estadon").value = data[0].ESTADO;
            document.getElementById("prioridadn").value = data[0].PRIORIDAD;
            var fechacreacion = data[0].FECHA_CREACION;
            var fechatermino = data[0].FECHA_TERMINO;
            var value1 = new Date
                (
                    parseInt(fechacreacion.replace(/(^.*\()|([+-].*$)/g, ''))
                );
            var value2 = new Date
                (
                    parseInt(fechatermino.replace(/(^.*\()|([+-].*$)/g, ''))
                );
            var fcreacion = new Date(value1.getTime());
            var ftermino = new Date(value2.getTime());

            document.getElementById("fechacreacionn").value = fcreacion.toISOString();
            document.getElementById("fechaterminon").value = ftermino;
        });
    }
}

const BorrarDatos = () => {
    const controladores = document.getElementsByClassName("borrar");
    for (let i = 0; i < controladores.length; i++) {
        controladores[i].value = "";
    }
}
const Editar = () => {
    if (DatosObligatoriosPOP()) {
        let frm = new FormData();
        let id = document.getElementById("idn").value;
        let titulo = document.getElementById("titulon").value;
        let estado = document.getElementById("estadon").value;
        let notas = document.getElementById("notasn").value;
        let prioridad = document.getElementById("prioridadn").value;
        let fecha_creacion = document.getElementById("fechacreacionn").value;
        let fecha_termino = document.getElementById("fechaterminon").value;
        //fechas
        let anno = new Date(fecha_creacion).getFullYear();
        let mes = new Date(fecha_creacion).getMonth() + 1;
        let dia = new Date(fecha_creacion).getDate();
        let hora = new Date(fecha_creacion).getHours();
        let minuto = new Date(fecha_creacion).getMinutes();
        let newdate;
        if (hora < 10 && minuto < 10) {
            newdate = anno + "-" + mes + "-" + dia + "T" + "0" + hora + ":" + "0" + minuto;
        } else if (minuto < 10) {
            newdate = anno + "-" + mes + "-" + dia + "T" + hora + ":" + "0" + minuto;
        } else if (hora < 10) {
            newdate = anno + "-" + mes + "-" + dia + "T" + "0" + hora + ":" + minuto;
        } else {
            newdate = anno + "-" + mes + "-" + dia + "T" + hora + ":" + minuto;
        }
        fecha_creacion = newdate;
        //fin fechas
        if (fecha_termino == "Invalid Date" || fecha_termino == "Mon Jan 01 1990 00:00:00 GMT-0500 (hora estándar de Colombia)") {
            fecha_termino = '01/01/1990';
        }
        if (estado == 2) {
            let hoy = new Date();
            let fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
            let hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
            let fecha_hora_termino = fecha + 'T' + hora;
            fecha_termino = fecha_hora_termino;
        }
        if (id == null) {
            id = 0;
        }
        frm.append("ID", id);
        frm.append("TITULO", titulo);
        frm.append("NOTAS", notas);
        frm.append("ESTADO", estado);
        frm.append("PRIORIDAD", prioridad);
        frm.append("FECHA_CREACION", fecha_creacion);
        frm.append("FECHA_TERMINO", fecha_termino);
        if (confirm("Desea realmente Actualizar?") == 1) {
            $.ajax({
                type: "POST",
                url: "Tarea/EditarTarea",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 1) {
                        alert("Se Edito correctamente");
                        listarActividadesUI.innerHTML = "";
                        listarAllTareas();
                        //cerrar modal
                        $("#myModal").modal("hide");
                    }
                    else {
                        alert("Ocurrio un error");
                    }
                }
            });
        } else {
            //cerrar modal

        }
    } else {
        console.log("HAY DATOS OBLIGATORIOS VACIOS");
    }
}
const CrearTarea = () => {
    let frm = new FormData();
    let id = 0;
    let titulo = document.getElementById("titulo").value;
    let estado = document.getElementById("estado").value;
    let notas = document.getElementById("notas").value;
    let prioridad = document.getElementById("prioridad").value;
    let fecha_creacion = document.getElementById("fechacreacion").value;
    let fecha_termino = document.getElementById("fechatermino").value;
    if (fecha_creacion == null || fecha_creacion == "") {
        let hoy = new Date();
        let fecha = hoy.getFullYear() + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + ('0' + hoy.getDate()).slice(-2);
        let hora = ('0' + hoy.getHours()).slice(-2) + ':' + ('0' + hoy.getMinutes()).slice(-2);
        let fecha_hora_creacion = fecha + 'T' + hora;
        console.log(fecha_hora_creacion);
        fecha_creacion = fecha_hora_creacion;
    }
    if (fecha_termino == null || fecha_termino == "") {
        let fecha_hora_termino = '01/01/1990';
        fecha_termino = fecha_hora_termino;
    }
    frm.append("ID", id);
    frm.append("TITULO", titulo);
    frm.append("NOTAS", notas);
    frm.append("ESTADO", estado);
    frm.append("PRIORIDAD", prioridad);
    frm.append("FECHA_CREACION", fecha_creacion);
    frm.append("FECHA_TERMINO", fecha_termino);
    if (confirm("Desea realmente guardar?") == 1) {
        $.ajax({
            type: "POST",
            url: "Tarea/CrearTarea",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 1) {
                    alert("Se guardo correctamente");
                    listarActividadesUI.innerHTML = "";
                    listarAllTareas();
                }
                else {
                    alert("Ocurrio un error");
                }
            }
        });
    }

}
const DatosObligatoriosPOP = () => {
    let exito = true;
    const controladores = document.getElementsByClassName("obligatorio");
    for (let i = 0; i < controladores.length; i++) {
        if (controladores[i].value == "") {
            exito = false;
            controladores[i].parentNode.classList.add("error");
        } else {
            controladores[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}
const Eliminar = (id) => {
    let frm = new FormData();
    frm.append("ID", id);
    if (confirm("Desea realmente Eliminar?") == 1) {
        $.ajax({
            type: "POST",
            url: "Tarea/EliminarTarea",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 1) {
                    alert("Se Elimino correctamente");
                    listarActividadesUI.innerHTML = "";
                    listarAllTareas();
                    //cerrar modal
                    $("#myModal").modal("hide");
                }
                else {
                    alert("Ocurrio un error");
                }
            }
        });
    } else {


    }
}
///EVENTOS DEL NAVEGADOR
formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();//para no refrescar la web
    CrearTarea();
    //if ($('#titulo').val().length == 0 || $('#notas').val().length == 0 || $('#prioridad').val().length == 0) {
    //    alert('No te olvides llenar los campos 👍');
    //    return false;
    //}
    formularioUI.reset();
});
btnBuscar.addEventListener("click", buscar);
btnLimpiar.addEventListener("click", limpiar);
