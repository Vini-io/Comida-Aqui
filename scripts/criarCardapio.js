
const firebaseConfig = {
    apiKey: "AIzaSyBrhTpkiXu4f8n3OrhkgzPExSbDHiw6fck",
    authDomain: "projetodiversos-365a9.firebaseapp.com",
    projectId: "projetodiversos-365a9",
    storageBucket: "projetodiversos-365a9.appspot.com",
    messagingSenderId: "448250311653",
    appId: "1:448250311653:web:fd4a939c8a6b1e8027750c"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
    experimentalForceLongPolling: true,
    merge: true,
});


const db = firebase.firestore();
const storage = firebase.storage();


let img = document.getElementById("file")
var file = [];

img.addEventListener("change", (e) => {
    file = e.target.files[0];
})



let btnadd = document.querySelector(".btnadd").addEventListener("click", () => {

    let name = document.querySelector(".input-name").value;
    let price = document.querySelector(".input-price").value;
    let descript = document.querySelector("#descript").value;
    let categ = document.getElementById("Categoria").value;

    let randomNum = Math.floor((Math.random() * 9999))
    let randomId;
    let randomKey;


    const ref = storage.ref("/" + categ);


    let timeKey = Math.floor((Math.random() * 5));


    if (timeKey == 1) {
        randomKey = "s";
    } else if (timeKey == 2) {
        randomKey = "u";
    } else if (timeKey == 3) {
        randomKey = "r";
    } else if (timeKey == 4) {
        randomKey = "f";
    } else if (timeKey == 5) {
        randomKey = "p";
    }

    randomId = randomNum + randomKey;

    db.collection(categ).doc(randomId).set({

        id: randomId,
        nome: name,
        preco: price,
        descricao: descript,
        collect: categ

    }).then(() => {
        suscess();

    }).catch(error => {
        console.log(error)
    })


    ref.child(randomId).put(file).then((snapshot) => {
        console.log(snapshot.data());
    })



})

let body = document.querySelector(".body").classList;
let containerCreateConfirm = document.querySelector(".container-create-confirm")
function suscess() {
    containerCreateConfirm.style.display = "flex"
    body.add("hidden-scroll")
}
containerCreateConfirm.addEventListener("click", () => {
    containerCreateConfirm.style.display = "none"
    body.remove("hidden-scroll")
    document.location.reload();

})



