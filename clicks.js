$(document).ready(function() {

    let score = 0;
    let timeLeft = 30;
    let timer = null;

    function moveButton() {
        const maxWidth = $(window).width() - $("#gameButton").outerWidth();
        const maxHeight = $(window).height() - $("#gameButton").outerHeight();
        const newLeft = Math.floor(Math.random() * maxWidth);
        const newTop = Math.floor(Math.random() * maxHeight);
        $("#gameButton").css({
            left: newLeft + 'px',
            top: newTop + 'px',
        })
    }

    function updateTime() {

        timeLeft--;
        $("#time").text(timeLeft);

        if(timeLeft <= 0){

            clearInterval(timer);
            timer = null;
            alert('¡El juego ha terminado! Tu puntaje es:' + score);
            $("#gameButton").hide();

        }

    }

    $("#gameButton").on('click', () => {

        if(timer == null){
            timer = setInterval(updateTime, 1000);
        }
        score++;
        $("#score").text(score);
        moveButton();

    });

    $("#resetButton").on('click', () => {
        clearInterval(timer);
        timer = null;
        score = 0;
        timeLeft = 30;
        $("#score").text(score);
        $("#time").text(timeLeft);
        $("#gameButton").prop('disabled', false);
        moveButton();
    })

    moveButton();

})