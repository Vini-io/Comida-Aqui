
const firebaseConfig = {
    apiKey: "AIzaSyBrhTpkiXu4f8n3OrhkgzPExSbDHiw6fck",
    authDomain: "projetodiversos-365a9.firebaseapp.com",
    projectId: "projetodiversos-365a9",
    storageBucket: "projetodiversos-365a9.appspot.com",
    messagingSenderId: "448250311653",
    appId: "1:448250311653:web:fd4a939c8a6b1e8027750c"
};


firebase.initializeApp(firebaseConfig)

firebase.firestore().settings({
    experimentalForceLongPolling: true,
    merge: true,
});

const db = firebase.firestore();
const auth = firebase.auth();





function createAccont() {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".senha").value;
    let confirm = document.querySelector(".confirmar").value;
    let texterrodifferent = document.querySelector(".textErroConfirmar")
    let texterroEmail = document.querySelector(".texterroEmail")
    let texterroPassword = document.querySelector(".texterroPassword")
    let usuario = document.querySelector(".usuario").value;

    texterroEmail.style.display = "none";
    texterroPassword.style.display = "none";


    if (password == confirm) {

        texterrodifferent.style.display = "none";
        auth.createUserWithEmailAndPassword(email, password).then(doc => {

            db.collection("user").doc(doc.user.uid).set({
                usuario: usuario
            }).then().catch(error => {
                console.log(error)
            })

            open('../index.html')

        }).catch(error => {
            console.log(error)

            if (error.code == "auth/invalid-email") {
                texterroEmail.style.display = "inherit";
            }
            if (error.code == "auth/weak-password") {
                texterroPassword.style.display = "inherit"
            }

        })
    } else {
        texterrodifferent.style.display = "inherit";
    }

}


//style signUp code


let showpassword = document.querySelector(".showPassword")
let senha = document.querySelector(".input-senha")
let confirmar = document.querySelector(".input-confirmar")

let imgshow = document.querySelector(".showpass")
let imgclose = document.querySelector(".closepass")

showpassword.addEventListener("click", ()=>{

    if(senha.type == "password"){

        imgshow.style.display = "none"
        imgclose.style.display = "inherit"
        senha.type = "text";
        confirmar.type = "text";


    }else{
        senha.type = "password"
        confirmar.type = "password"

        imgshow.style.display = "inherit"
        imgclose.style.display = "none"
    }


})
