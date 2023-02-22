// pegando uid do usuario


var userId = "";
auth.onAuthStateChanged((user) => {
    if (user) {
        userId = user.uid
    }
})

// load DOM para carregar valor Total
// addtotal
var placeTotalMobile = document.querySelector(".total-mobile")
var placeTotal = document.querySelector(".total")
var total = 0;

document.addEventListener("DOMContentLoaded", () => {

        setTimeout(() => {
            db.collection("sacola").doc(userId).get().then(doc => {
                db.collection("sacola").doc("ItemSacola").get().then(snap => {
                    let arrayTotal = snap.data()[userId];
                    let tempTotal = 0;
                    for (let i = 0; i < arrayTotal.length; i++) {
                        tempTotal = tempTotal + parseFloat(doc.data()['' + arrayTotal[i] + ''].preco)
                    }
                    total = tempTotal.toFixed(2);
                    placeTotal.innerHTML = total;
                    placeTotalMobile.innerHTML = total;

                })
            })
        }, 1000);
})





const storage = firebase.storage();

let containerfeatured = document.querySelector(".contant-featured");

db.collection("destaques").get().then(snapshot => {

    snapshot.forEach((doc) => {

        const ref = storage.ref("/" + doc.data().collect + "/" + doc.data().id)
        ref.getDownloadURL().then(url => {

            containerfeatured.innerHTML += `
        <div class="contant-item">
                    <div class="share-left">
                        <span class="name-item">${doc.data().nome}</span>
                        <span><span>R$</span class="price">${doc.data().preco}</span>
                        <div>
                            <button type="button" onclick="infoItem('${doc.data().nome}','${doc.data().descricao}')" class="btn btn-info">Info</button>
                            <button type="button" onclick="toastspop(), addsacola('${doc.data().collect}', '${doc.data().id}', '${doc.data().preco}', '${doc.data().nome}')"
                                class="btn btn-outline-primary">Adicionar</button>
                        </div>
                    </div>
                    <div class="share-right">
                        <img src="${url}">
                    </div>
            </div>
        `
        })

    })

}).catch(error => {
    console.log(error)
})



const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


// pop para mostrar item adicionado


function toastspop() {
    let pop = document.querySelector(".poptoasts").classList;
    if (userId != '') {
        pop.add("showpop");
        setTimeout(() => {
            pop.remove("showpop")
        }, 2000)
    }
}



// animation de show na tabela de login



var tableSacola = document.querySelector(".container-sacola").classList;
var tablelogin = document.querySelector(".container-login").classList;

var tabelaSacolaMobile = document.querySelector(".container-sacola-mobile").classList;
var tabelaLoginMobile = document.querySelector(".container-login-mobile").classList;

let navMobile2 = document.querySelector(".nav-mobile-2").classList;
let toggleNav2 = document.querySelector(".toggle-nav-2").classList;



let loginNav = document.querySelector(".login-nav").addEventListener("click", () => {
    tablelogin.toggle("show-container-login");
    tableSacola.remove("show-container-sacola");
})

let loginNavMobile = document.querySelector(".login-nav-mobile").addEventListener("click", () => {
    tabelaLoginMobile.toggle("show-container-login-mobile");
    tabelaSacolaMobile.remove("show-container-sacola-mobile");
    navMobile2.remove("nav-mobile-2-show");

})

// sacola

let sacola = document.querySelector(".cart-nav").addEventListener("click", () => {
    tableSacola.toggle("show-container-sacola");
    tablelogin.remove("show-container-login");
})

let sacolaMobile = document.querySelector(".cart-nav-mobile").addEventListener("click", () => {
    tabelaSacolaMobile.toggle("show-container-sacola-mobile")
    tabelaLoginMobile.remove("show-container-login-mobile")
    navMobile2.remove("nav-mobile-2-show");
})

// nav bar mobile //indexadd//

let navBarMobile = document.querySelector(".toggle-nav-2").addEventListener("click", () => {
    navMobile2.toggle("nav-mobile-2-show")
    toggleNav2.toggle("toggle-nav-2-rotate")
    tabelaLoginMobile.remove("show-container-login-mobile")
    tabelaSacolaMobile.remove("show-container-sacola-mobile");
})









// add item sacola

function addsacola(collect, id, price, nome) {

    if (userId != '') {

        // calcular total na sacola
        //addtotal
        setTimeout(() => {
            db.collection("sacola").doc(userId).get().then(doc => {

                let precoTotal = doc.data()['' + id + ''].precoQuant;

                total = parseFloat(total) + parseFloat(precoTotal);
                placeTotal.innerHTML = total.toFixed(2);
                placeTotalMobile.innerHTML = total.toFixed(2);
            })
        }, 1000);





        db.collection("sacola").doc(userId).set({

            [id]: {
                "collect": collect,
                "id": id,
                "quantidade": 1,
                "preco": price,
                "nome": nome,
                "precoQuant": price
            }
        }, { merge: true })
        db.collection("sacola").doc("ItemSacola").update({
            [userId]: firebase.firestore.FieldValue.arrayUnion(id)
        })
    } else {

        let errorSacolaLogin = document.querySelector(".error-sacola-login");
        errorSacolaLogin.style.display = "flex";
        body.add("hidden-scroll-error")

    }
}


setTimeout(() => {
    if (userId != '')
        db.collection("sacola").doc(userId).onSnapshot(doc => {
            console.log("OnSnapshot")
            var map = doc.data();
            var contantSacola = document.querySelector(".contant-sacola")
            var contantSacolaMobile = document.querySelector(".contant-sacola-mobile")


            contantSacola.innerHTML = '';
            contantSacolaMobile.innerHTML = '';
            
                db.collection("sacola").doc("ItemSacola").get().then(snap => {

                    let arrayId = snap.data()[userId];

                    // <--- Start ---> // style numerico de item na sacola 

                    let numCart = document.querySelector(".number-cart")
                    let numCartMobile = document.querySelector(".number-cart-mobile") //indexadd//

                    numCart.innerHTML = arrayId.length;
                    numCartMobile.innerHTML = arrayId.length;//indexadd//


                    // <--- End --->
                    let price
                    for (let i = 0; i < arrayId.length; i++) {

                        price = parseFloat(map['' + arrayId[i] + ''].preco)

                        contantSacola.innerHTML += `
                                    <div class="item-sacola">
                                        <div class="share-sacola">
                                            <span class="name-sacola">${map['' + arrayId[i] + ''].nome}</span>
                                            <span class="price-all">R$<span class="price-sacola price-all">${price.toFixed(2)}</span></span>
                                        </div>
                                        <div class="quantidade">
                                            <div onclick="downAmount('${map['' + arrayId[i] + ''].quantidade}', '${map['' + arrayId[i] + ''].id}', '${map['' + arrayId[i] + ''].precoQuant}')" class="down">-</div>
                                            <div class="amount">${map['' + arrayId[i] + ''].quantidade}</div>
                                            <div onclick="upAmount('${map['' + arrayId[i] + ''].quantidade}', '${map['' + arrayId[i] + ''].id}', '${map['' + arrayId[i] + ''].precoQuant}')" class="up">+</div>
                                        </div>
                                        <div onclick="removeSacola('${map['' + arrayId[i] + ''].id}')" class="tash-sacola">
                                            <img src="./assets/sacola/trash.png" width="30rem">
                                        </div>
                                    </div>
                    `;

                        contantSacolaMobile.innerHTML += `
                    <div class="item-sacola">
                        <div class="share-sacola">
                            <span class="name-sacola">${map['' + arrayId[i] + ''].nome}</span>
                            <span class="price-all">R$<span class="price-sacola price-all">${price.toFixed(2)}</span></span>
                        </div>
                        <div class="quantidade">
                            <div onclick="downAmount('${map['' + arrayId[i] + ''].quantidade}', '${map['' + arrayId[i] + ''].id}', '${map['' + arrayId[i] + ''].precoQuant}')" class="down">-</div>
                            <div class="amount">${map['' + arrayId[i] + ''].quantidade}</div>
                            <div onclick="upAmount('${map['' + arrayId[i] + ''].quantidade}', '${map['' + arrayId[i] + ''].id}', '${map['' + arrayId[i] + ''].precoQuant}')" class="up">+</div>
                        </div>
                        <div onclick="removeSacola('${map['' + arrayId[i] + ''].id}')" class="tash-sacola">
                            <img src="../assets/sacola/trash.png" width="30rem">
                        </div>
                    </div>
    `;

                    }
                })


            

        })
}, 1200);


function removeSacola(id) {
    setTimeout(() => {
        db.collection("sacola").doc(userId).update({
            [id]: firebase.firestore.FieldValue.delete()
        })
    }, 100);

    db.collection("sacola").doc("ItemSacola").update({
        [userId]: firebase.firestore.FieldValue.arrayRemove(id)
    })
    //addtotal
    db.collection("sacola").doc(userId).get().then(doc => {
        total = total - doc.data()[id].preco;
        placeTotal.innerHTML = total.toFixed(2);
        placeTotalMobile.innerHTML = total.toFixed(2);

    })
}



function upAmount(amount, id, precoQuant) {


    amount++;

    db.collection("sacola").doc(userId).set({
        [id]: {
            preco: precoQuant * amount,
            quantidade: amount
        }
    }, { merge: true }).then().catch(error => { console.log(error) })
    //addtotal
    db.collection("sacola").doc(userId).get().then(doc => {
        total = total + parseFloat(doc.data()[id].precoQuant);
        placeTotal.innerHTML = total.toFixed(2);
        placeTotalMobile.innerHTML = total.toFixed(2);

    })

}


function downAmount(amount, id, precoQuant) {

    if (amount > 1) {
        amount--;
        db.collection("sacola").doc(userId).set({
            [id]: {
                preco: precoQuant * amount,
                quantidade: amount,
            }
        }, { merge: true }).then().catch(error => { console.log(error) })
        //addtotal
        db.collection("sacola").doc(userId).get().then(doc => {
            total = total - doc.data()[id].precoQuant;
            placeTotal.innerHTML = total.toFixed(2);
            placeTotalMobile.innerHTML = total.toFixed(2);

        })
    }
}



// função para mostrar info do item 

var body = document.querySelector('.body').classList;


function infoItem(nome, descricao) {
    let baseInfo = document.querySelector(".info-item");

    body.add("hiddenOverflow")

    baseInfo.style.display = "flex"
    baseInfo.innerHTML = `
    <div class="container-info">
        <span class="info-title">Nome</span>
        <span class="info-name">${nome}</span>
        <span class="info-title">Descrição</span>
        <span class="info-descript">${descricao}</span>
        <img onclick="infoClose()" class="info-close" src="./assets/info/button-close.png" width="50px">
    </div>
    `;

}

function infoClose() {
    let baseInfo = document.querySelector(".info-item");
    body.remove("hiddenOverflow");
    baseInfo.style.display = "none";
    baseInfo.innerHTML = "";

}

