function paginaPrincipal(){
    let searcher = document.getElementById("apicripto");
    searcher.innerHTML = '<br>'+ '<p class="enunciado">Introduzce las siglas de una criptomoneda</p>'
    + '<br>' + '<input type="text" id="texto" name="texto" placeholder="Buscar criptomoneda..">'
    + '<br><br><br>' + '<button" id="button" class="button" name="button" onclick="cargar()">Buscar</button>'
}

function searchCrypto() {
    let direccion = window.location.href
    let criptomoneda = direccion.split ("=");
    console.log(typeof criptomoneda[1] + " es el valor de la entrada del usuario y es: " + criptomoneda[1].toUpperCase());
    // Creamos objeto para hacer la consulta
    let apikey = '2a6f436c7b0c51a10be09fa0fb7f74e0597d5b6a00e81ee505f8605725d13e9b';
    var request = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
    // Creamos consulta a la API
    request.open('GET', 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms='+criptomoneda[1].toUpperCase()+ '&tsyms=EUR'+'&api_key' + apikey, true)
    request2.open('GET', 'https://min-api.cryptocompare.com/data/blockchain/mining/calculator?fsyms='+criptomoneda[1].toUpperCase()+'&tsyms=EUR'+'&api_key='+apikey, true)
    // Realizamos la petición y esperamos respuesta
    request.onload = function () {
        // Transformarmos la respuesta a JSON
        var data = JSON.parse(this.response);
        // Si la respuesta es valida
        if (request.status >= 200 && request.status < 400) {
            // Realizamos la petición y esperamos respuesta
            request2.onload = function () {
                // Transformarmos la respuesta a JSON
                var data2 = JSON.parse(this.response);
                // Si la respuesta es valida
                if (request2.status >= 200 && request2.status < 400) {
                    // Mostramos por consola el JSON
                    console.log(data);
                    console.log(data2);
                    // Obtengo unos parametros especificos para mostrarlos
                    let fulnamecoin = (data2.Data[criptomoneda[1].toUpperCase()].CoinInfo.FullName);
                    let imagenentry = (data.RAW[criptomoneda[1].toUpperCase()].EUR.IMAGEURL);
                    let valueofcoin = (data.RAW[criptomoneda[1].toUpperCase()].EUR.PRICE);
                    let valuehigher = (data.RAW[criptomoneda[1].toUpperCase()].EUR.HIGHDAY);
                    let valuelowwer = (data.RAW[criptomoneda[1].toUpperCase()].EUR.LOWDAY);
                    console.log ("Criptomoneda: " + criptomoneda[1].toUpperCase());
                    console.log("Nombre: " + fulnamecoin);
                    console.log("imagen: " + imagenentry);
                    console.log("precio: " + valueofcoin);
                    console.log("preciomax: " + valuehigher);
                    console.log("preciomin: " + valuelowwer);
                    let div2 = document.getElementById("info");
                    let imagen = 'cryptocompare.com'+imagenentry
                    let precio = Math.round(valueofcoin * 100) / 100
                    let preciomax = Math.round(valuehigher * 100) / 100
                    let preciomin = Math.round(valuelowwer * 100) / 100
                    let tabulacion ='&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
                    div2.innerHTML = '<img src="https://'+imagen+'"loading="lazy" class="imagen"/>' +
                     '<p class="nombre">Nombre: '+fulnamecoin+'</p>' + '<p class="precio">Precio: '+precio+'€</p>' +
                     '<p class="precio">Precio max: '+preciomax+'€</p>' + '<p class="precio">Precio min: '+preciomin+'€</p>' +
                     '<button" id="button" class="button" name="button" onclick="volver()">Volver</button">' + 
                     '&nbsp&nbsp&nbsp&nbsp&nbsp' +
                     '<button" id="popUp" class="button" name="popUp" onclick="popUp()">Solicitar info</button">' +
                    '<div class="popuptext" id="mipopup"><p>&ltCoins&gt' + '<br>' + tabulacion + '&lt'+criptomoneda[1].toUpperCase()+'&gt' + '<br>' +
                    tabulacion + tabulacion + '&ltImagen&gt' + imagen + '&lt/Imagen&gt'+ '<br>' + 
                    tabulacion + tabulacion + '&ltNombre&gt' + fulnamecoin + '&lt/Nombre&gt'+ '<br>' + 
                    tabulacion + tabulacion + '&ltPrecio&gt' + precio + '€&lt/Precio&gt'+ '<br>' +
                    tabulacion + tabulacion + '&ltPreciomax&gt' + preciomax + '€&lt/Preciomax&gt'+ '<br>' +
                    tabulacion + tabulacion + '&ltPreciomin&gt' + preciomin + '€&lt/Preciomin&gt'+ '<br>' + 
                    tabulacion + '&lt/'+criptomoneda[1].toUpperCase()+'&gt' + '<br>' + '&lt/Coins&gt</p></div>';
                }      
            }
        request2.send();
        }
    }
    request.send();
}

function cargar() {
    let moneda = document.getElementById("texto").value;
    window.location.href="mostrarinfo.html?m="+moneda
}

function volver() {
    window.location.href="index.html";
}

function popUp() {
    var popup = document.getElementById("mipopup");
    popup.classList.toggle("show");
}


