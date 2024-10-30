/* script.js */
$(document).ready(function(){
    let cartaVolteada = null;

    const aleatorizar = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const cartasAleatorias = () => {
        let cartas = $(".carta");
        //let cartasAleatorias = [];

        let tablero = $(".tablero");
        tablero.empty();

        let numerosCartas = [1,2,3,4,5,6,1,2,3,4,5,6];
        numerosCartas = aleatorizar(numerosCartas);

        console.log('numeroCartas ------- >', numerosCartas);

        for (let i = 0; i <= cartas.length; i++) {
            let carta = $(cartas[i]);

            carta.attr("data-pareja", numerosCartas[i]);

            let random = Math.floor(Math.random());
            tablero.append(carta);
        }

        
    };

    cartasAleatorias();

    

    $(".carta").click(function(){
        let carta = $(this);

        if (carta.hasClass("volteada")) {
            return;
        }

        carta.addClass("volteada");

        if (cartaVolteada) {
            let pareja = carta.data("pareja");
            if (pareja === cartaVolteada.data("pareja")) {
                cartaVolteada = null;
            } else {
                setTimeout(function(){
                    carta.removeClass("volteada");
                    cartaVolteada.removeClass("volteada");
                    cartaVolteada = null;
                }, 1000);
            }
        } else {
            cartaVolteada = carta;
        }
    });
});
