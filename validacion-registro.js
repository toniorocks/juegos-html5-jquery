crearUsuario = (nombre, email, password) => {
    console.log('crear usuario x2');
    $.ajax({
        url: 'http://localhost:3005/user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            nombre: nombre,
            email: email,
            password: password,
        }),
    }).done((data) => {
        console.log('exito--->',data);
        const success =  data.success;
        if(success){

            alert("Usuario creado exitosamente");
            window.location.href= 'index.html';

        }


    }).fail((error) => {
        console.error('error--->',error);
        const alerta = $(`<div id="mensaje-error" class="alert alert-danger d-flex align-items-center my-5" role="alert">
            <div>
                Error al crear usuario
            </div>
        </div>`);
        $("#main-container").append(alerta);

    })
}

$(document).ready(() => {
    console.log('validacion-registro.js cargado');

    $('#formulario').submit((e) => {
        e.preventDefault();

        //limpiamos los mensajes de error
        $(".invalid-feedback").remove();
        $("#campo-email").removeClass('is-invalid');
        $("#campo-nombre").removeClass('is-invalid');
        $("#campo-confirma").removeClass('is-invalid');
        $("#campo-password").removeClass('is-invalid');

        let password = $("#campo-password").val();
        let email = $("#campo-email").val();
        let nombre = $("#campo-nombre").val();
        let confirmar = $("#campo-confirma").val();

        let error = false;

        if(password == ''){
            $("#campo-password").addClass('is-invalid');
            let parent = $("#campo-password").parent();
            let div = $("<div class='invalid-feedback'>El campo password es obligatorio</div>");
            parent.append(div);
            $("#campo-password").focus();
            error = true;
        }

        if(confirmar == '' || confirmar != password){
            $("#campo-confirma").addClass('is-invalid');
            let parent = $("#campo-confirma").parent();
            let div = $("<div class='invalid-feedback'>El campo confirmar password es obligatorio y debe ser igual al password</div>");
            parent.append(div);
            $("#campo-confirma").focus();
            error = true;
        }

        //marco.izag@gmail.com

        const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/;

        if(email == '' || !regex.test(email)){
            
            let parent = $("#campo-email").parent();
            $("#campo-email").addClass('is-invalid');

            let mensaje = 'El campo email es obligatorio';
            if(!regex.test(email)){
                mensaje = 'El email no es valido';
            } 

            let div = $("<div class='invalid-feedback'>" + mensaje + "</div>");
            parent.append(div);
            $("#campo-email").focus();
            error = true;
        }

        if(nombre == ''){
            $("#campo-nombre").addClass('is-invalid');
            let parent = $("#campo-nombre").parent();
            let div = $("<div class='invalid-feedback'>El campo nombre es obligatorio</div>");
            parent.append(div);
            $("#campo-nombre").focus();
            error = true;
        }

        if(error){ //si hay un error no hacemos nada
            return;
        }

        //si llegamos a este punto quiere decir que los campos estan llenos

        $.ajax({
            url: 'http://localhost:3005/email',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
            }),
        }).done((data) => {
            console.log('exito--->',data);
            const success =  data.success;
            if(success){
                alert("El email ya esta registrado");
            }else{
                console.log('crear usuario');
                crearUsuario(nombre, email, password);
            }
        }).fail((error) => {
            console.error('error--->',error);
            const alerta = $(`<div id="mensaje-error" class="alert alert-danger d-flex align-items-center my-5" role="alert">
                <div>
                    Error al validar email
                </div>
            </div>`);
            $("#main-container").append(alerta);
        })

    })
})