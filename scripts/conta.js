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

const auth = firebase.auth();
const db = firebase.firestore();

var userId = '';
var userEmail = '';
auth.onAuthStateChanged((user) => {
    // console.log(user)
    if (user) {
        userId = user.uid;
        userEmail = user.email;
    }
})


setTimeout(() => {
    db.collection("user").doc(userId).get().then(doc => {
        let name = document.querySelector(".name-user")
        let email = document.querySelector(".email-user")

        name.innerHTML = doc.data().usuario;
        email.innerHTML = userEmail;

    })
}, 900);



document.addEventListener("DOMContentLoaded", () => {
    let city = document.querySelector(".address-city")
    let district = document.querySelector(".address-district")
    let street = document.querySelector(".address-street")

    setTimeout(() => {
        db.collection("user").doc(userId).get().then(snapshot=>{
            city.innerHTML = snapshot.data().cidade;
            district.innerHTML = snapshot.data().bairro;
            street.innerHTML = snapshot.data().rua;
        })
    }, 800);
    
})




let adressBody = document.querySelector(".adress-body")
let editbtn = document.querySelector(".btn-edit").addEventListener("click", () => {
    adressBody.style.display = "flex"
})
let closeAdress = document.querySelector(".close-adress").addEventListener("click", () => {
    adressBody.style.display = "none"
})



let btnConfirm = document.querySelector(".btn-confirm").addEventListener("click", () => {

    let city = document.querySelector(".city").value;
    let district = document.querySelector(".district").value;
    let Street = document.querySelector(".Street").value;

    db.collection("user").doc(userId).set({
        cidade: city,
        bairro: district,
        rua: Street
    }, { merge: true })
    document.location.reload()

})





