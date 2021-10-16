let shareDeal = {};

export const obtenerOferta = (aShare, divGame, search = false) => {
    aShare.addEventListener("click", (e) => {
        if(search){
            let div = e.target.parentNode.parentNode.parentNode;
            shareDeal = {
                dealID: div.id,
                title: div.parentNode.parentNode.childNodes[1].childNodes[0].innerText,
                price: div.childNodes[1].childNodes[0].innerText.split("$")[1],
                redirect: div.childNodes[0].href,
            }
        } else {
            shareDeal = {
                dealID: divGame.id,
                title: divGame.getAttribute("name"),
                price: divGame.childNodes[2].childNodes[0].innerText.split("$")[1],
                storeIcon: divGame.childNodes[3].childNodes[3].childNodes[0].src,
                redirect: divGame.childNodes[3].childNodes[3].href,
                rating: divGame.childNodes[3].childNodes[1].innerText,
                count: 1
            }
        }
    });
}

const patternEmail = new RegExp("^[^\s@]+@[^\s@]+\.[^\s@]{2,}$");

const main = document.querySelector("main");

export const mainCompartir = () => {
    const section = document.createElement("section");
    section.className = "section";
    const titulo = document.createElement("h3");
    titulo.innerHTML = "Compartir"
    const subtitulo = document.createElement("h4");
    subtitulo.innerHTML = "Envíale la oferta a un amigo!"
    
    let form = '';

    form = createFormulario(shareDeal);

    section.append(titulo, subtitulo);
    section.innerHTML += form;
    main.append(section);
    
    if(shareDeal.rating){
        document.getElementById('div-rating').style.display = "flex";
    } else {
        document.getElementById('div-rating').style.display = "none";
    }

    let email = document.getElementById('email');
    email.addEventListener('blur', function (event) {
        let errorEmail = document.getElementById('error-email');
        let emailRequerido = document.getElementById('email-requerido');
        if (email.value === '') {
            emailRequerido.classList.remove('ocultar-error');
            errorEmail.classList.add('ocultar-error');
        } else if (!patternEmail.test(email.value)) {
            errorEmail.classList.remove('ocultar-error');
            emailRequerido.classList.add('ocultar-error');
        } else {
            errorEmail.classList.add('ocultar-error');
            emailRequerido.classList.add('ocultar-error');
        }
    });
    
    let asunto = document.getElementById('asunto');
    asunto.addEventListener('blur', function (event) {
        let asuntoRequerido = document.getElementById('asunto-requerido');
        if (asunto.value === '') {
            asuntoRequerido.classList.remove('ocultar-error');
        } else {
            asuntoRequerido.classList.add('ocultar-error');
        }
    });
    
    let formularioCompartir = document.getElementById('form-compartir');
    formularioCompartir.addEventListener('submit', function (e) {
        e.preventDefault();
        if (
            email.value != '' &&
            asunto.value != ''
        ) {
            let textArea = document.getElementById('comentario');
            let datosMail = `mailto:${email.value}?subject=${asunto.value}&body=${textArea.value}`
            window.open(datosMail);
        } else {
            alert("Se deben completar todos los campos correctamente");
        }
    });
}

const createFormulario = (deal) => {
    let texto = "";
    
    if(deal.rating){
        texto = '¡Hola! Te envío el juego ' + deal.title + ' que está en oferta a $' + deal.price + 
        '.\nTiene una puntuación de ' + deal.rating + 
        '!\nAprovecha a comprarlo antes de que se termine la oferta. \nTe dejo el link de la tienda: ' + deal.redirect;
    } else {
        texto = '¡Hola! Te envío el juego ' + deal.title + ' que está en oferta a $' + deal.price + 
        '!\nAprovecha a comprarlo antes de que se termine la oferta. \nTe dejo el link de la tienda: ' + deal.redirect;
    }
    

    const formulario = `
        <form id="form-compartir" class="formulario">
            <div class="line-compartir">
                <div class="item-compartir">
                    <input type="text" id="titulo" value = "${deal.title}" required>
                    <label for="titulo" class="lbl-texto">
                        <span class="text-nomb">Titulo</span>
                    </label>
                </div>
                <div class="item-compartir">
                    <input type="text" id="precio" value = "${'$' + deal.price}" required>
                    <label for="precio" class="lbl-texto">
                        <span class="text-nomb">Precio</span>
                    </label>
                </div>
            </div>
            <div class="line-compartir">
                <div class="item-compartir">
                    <input type="text" id="link" value = "${deal.redirect}" required>
                    <label for="link" class="lbl-texto">
                        <span class="text-nomb">Link</span>
                    </label>
                </div>
                <div id="div-rating" class="item-compartir">
                    <input type="text" id="rating" value = "${deal.rating ? deal.rating : null}" required>
                    <label for="rating" class="lbl-texto">
                        <span class="text-nomb">Rating</span>
                    </label>
                </div>
            </div>
            <div class="line-compartir datos-email">
                <div class="item-compartir">
                    <input type="text" id="email" required>
                    <label for="email" class="lbl-texto">
                        <span class="text-nomb">Email destinatario</span>
                    </label>
                </div>
                <p class="error ocultar-error" id="error-email">Formato de email inválido</p>
                <p class="error ocultar-error" id="email-requerido">Este campo es obligatorio</p>
                <div class="item-compartir">
                    <input type="text" id="asunto" required>
                    <label for="asunto" class="lbl-texto">
                        <span class="text-nomb">Asunto</span>
                    </label>
                </div>
                <p class="error ocultar-error" id="asunto-requerido">Este campo es obligatorio</p>
            </div>
            <div class="line-compartir container-comentario">
                <div class="comentario-compartir">
                    <textarea for="comentario" class="comentarios" rows="5" cols="50" id="comentario">${texto}</textarea>
                </div>
            </div>
            <div class="line-compartir">
                <button type="submit" form="form-compartir" class="button" id="button-form" formnovalidate>Enviar</button>
            </div>
        </form>
    `;
    return formulario;
}