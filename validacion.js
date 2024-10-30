$(document).ready(() => {
    console.log('validacion.js cargado');

    $('#formulario').submit((e) => {
        e.preventDefault();

        //limpiamos los mensajes de error
        $(".invalid-feedback").remove();
        $("#campo-email").removeClass('is-invalid');
        $("#campo-nombre").removeClass('is-invalid');

        let nombre = $("#campo-nombre").val();
        let email = $("#campo-email").val();

        let error = false;

        if(nombre == ''){
            $("#campo-nombre").addClass('is-invalid');
            let parent = $("#campo-nombre").parent();
            let div = $("<div class='invalid-feedback'>El campo nombre es obligatorio</div>");
            parent.append(div);
            $("#campo-nombre").focus();
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

        if(error){ //si hay un error no hacemos nada
            return;
        }

        //si llegamos a este punto quiere decir que los campos estan llenos

        $.ajax({
            url: 'http://localhost:3005/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                nombre: nombre,
                email: email
            }),
        }).done((data) => {
            console.log('exito--->',data);
            const user =  data.user;
            if(user){

                localStorage.setItem('user', JSON.stringify(user));
                
                window.location.href= 'juegos.html';
            }


        }).fail((error) => {
            console.error('error--->',error);
            const alerta = $(`<div id="mensaje-error" class="alert alert-danger d-flex align-items-center my-5" role="alert">
                <div>
                    Error al iniciar sesion
                </div>
            </div>`);
            $("#main-container").append(alerta);

            

        }).always(() => {
            console.log('siempre se ejecuta');
        })



        //console.log('nombre--->',nombre,'email--->',email);

    })
})