var cesar = cesar || (function () {
    //funcion para la operacion del cifrado
    //se necesita texto, desp y una accion
    var operacion = function (msj, desp, accion) {
        //otra variable que se encargue del remplazo de la cadena original para realizar los movimientos de cifrado
        var replace = (function () {
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                'y', 'z'
            ];

            var l = abc.length;
            return function (c) {
                var i = abc.indexOf(c.toLowerCase());
                if (i != -1) {
                    var pos = i;
                    //cifrar o descifrar
                    if (accion) {
                        despm = ((desp + pos) % 27);
                        pos = despm;
                    } else {
                        if (pos - desp < 0) {
                            despm = (((pos - desp) + 27) % 27);
                        } else {
                            despm = ((pos - desp) % 27);
                        }
                        pos = despm;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        //tenemos que realizar una prueba de texto que estan excribiendo en el textarea para que sea solo lo que yo quiero
        var re = (/([a-z\u00f1\u00d1])/ig);
        return String(msj).replace(re, function (match) {
            return replace(match);
        });
    }
    //necesitar saber que estoy mandando cifrado o descifrado
    //eso viene a partir de el boton que tiene una funcion de cod y otra de descode
    return {
        encode: function (msj, desp) {
            return operacion(msj, desp, true);
        },
        decode: function (msj, desp) {
            return operacion(msj, desp, false);
        }
    };

})();

function cifrar() {
    var validado = validarn();
    var num = parseInt(document.getElementById('desplazar').value);
    if (validado) {
        document.getElementById('resultado').innerHTML = cesar.encode(
            document.getElementById('mensaje').value, num
        );
    } else {}
}

function descifrar() {
    var validado = validarn();
    var num = parseInt(document.getElementById('desplazar').value);
    if (validado) {
        document.getElementById('resultado').innerHTML = cesar.decode(
            document.getElementById('mensaje').value, num
        );
    } else {}
}

function validarn() {
    var re = (/^([0-9])*$/);
    var exp = document.getElementById('desplazar').value;
    if (re.test(exp)) {
        if (exp > 0 && exp < 27) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}