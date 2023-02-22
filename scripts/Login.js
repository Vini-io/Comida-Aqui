

const firebaseConfig = {
    apiKey: "AIzaSyBrhTpkiXu4f8n3OrhkgzPExSbDHiw6fck",
    authDomain: "projetodiversos-365a9.firebaseapp.com",
    projectId: "projetodiversos-365a9",
    storageBucket: "projetodiversos-365a9.appspot.com",
    messagingSenderId: "448250311653",
    appId: "1:448250311653:web:fd4a939c8a6b1e8027750c"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

firebase.firestore().settings({
    experimentalForceLongPolling: true,
    merge: true,
});

const auth = firebase.auth();



function loginaccont() {
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".senha").value;

    let errorNoSuscessEmail = document.querySelector(".EmailNoSuscess")
    let errorNoFormatEmail = document.querySelector(".EmailNoFormat")
    let errorPassword = document.querySelector(".errorPassword")

    errorNoSuscessEmail.style.display = "none"
    errorNoFormatEmail.style.display = "none";
    errorPassword.style.display = "none";


    auth.signInWithEmailAndPassword(email, password).then(user => {
        location.href = '../index.html'
    }).catch(error => {
        console.log(error)
        if (error.code == "auth/user-not-found") {
            errorNoSuscessEmail.style.display = "inherit";
        } else if (error.code == "auth/invalid-email") {
            errorNoFormatEmail.style.display = "inherit";
        } else if (error.code == "auth/wrong-password") {
            errorPassword.style.display = "inherit";

        }
    })
}



auth.onAuthStateChanged((user) => {
    if (user) {



        if (user.uid == "IKWDcvyeoubFqlZxVl2xxnXhIu13") {
            tableLoginModufy(2, user.uid);
        } else {
            tableLoginModufy(0, user.uid);
        }
    } else {
        tableLoginModufy(1);
    }
})


function tableLoginModufy(x, user) {
    let containerLogin = document.querySelector(".container-login")
    let containerLoginMobile = document.querySelector(".container-login-mobile")

    let miniTitle = document.querySelector(".mini-title")
    let miniTitleMobile = document.querySelector(".mini-title-mobile")

    if (x == 0) {
        db.collection("user").doc(user).get().then(doc => {

            let username = doc.data().usuario
            containerLogin.innerHTML = `
        <div class="connected">
            <h1 class="title-name">${username}</h1>
                <ul>
                    <a href="./html/conta.html"><li>Conta</li></a>
                    <a href=""><li>Favoritos</li></a>
                    <a href="" onclick="desconnect()"><li>Desconectar</li></a>
                </ul>
        </div>`;

            containerLoginMobile.innerHTML = `
        <div class="connected">
            <h1 class="title-name">${username}</h1>
                <ul>
                    <a href="../html/conta.html"><li>Conta</li></a>
                    <a href=""><li>Favoritos</li></a>
                    <a href="" onclick="desconnect()"><li>Desconectar</li></a>
                </ul>
        </div>`;

            miniTitle.innerHTML = username;
            miniTitleMobile.innerHTML = username;
        }).catch(error => {
            console.log(error)
        })


    } else if (x == 1) {
        containerLogin.innerHTML = `
        <div class="loggedout">
            <img src="./assets/login/loggedout/outuser.png" width="100px">
            <ul>
                <a href="./html/login.html"><li>Entrar</li></a> 
                <a href="./html/signUp.html"><li>Criar conta</li></a> 
            </ul>
        </div>`;

        containerLoginMobile.innerHTML = `
        <div class="loggedout">
            <img src="../assets/login/loggedout/outuser.png" width="100px">
            <ul>
                <a href="../html/login.html"><li>Entrar</li></a> 
                <a href="../html/signUp.html"><li>Criar conta</li></a> 
            </ul>
        </div>`;

        miniTitle.innerHTML = "Fazer login";
    }
    else if (x == 2) {

        db.collection("user").doc(user).get().then(doc => {
            let username = doc.data().usuario;
            containerLogin.innerHTML = `
        <div class="connected">
            <h1 class="title-name">${username}</h1>
                <ul>
                    <a href="../html/conta.html"><li>Conta</li></a>
                    <a href="./html/criarcardapio.html"><li>Criar cardapío</li></a>
                    <a href="../html/modificarCardapio.html"><li>Modificar cardapío</li></a>
                    <a href="" onclick="desconnect()"><li>Desconectar</li></a>
                </ul>
        </div>`;

            containerLoginMobile.innerHTML = `
        <div class="connected">
            <h1 class="title-name">${username}</h1>
                <ul>
                    <a href="../html/conta.html"><li>Conta</li></a>
                    <a href="../html/criarcardapio.html"><li>Criar cardapío</li></a>
                    <a href="../html/modificarCardapio.html"><li>Modificar cardapío</li></a>
                    <a href="" onclick="desconnect()"><li>Desconectar</li></a>
                </ul>
        </div>`;

            miniTitle.innerHTML = username;
            miniTitleMobile.innerHTML = username;
        }).catch(error => {
            console.log(error)
        })
    }
}

// deslogar

function desconnect() {
    auth.signOut().then().catch(error => {
        console.log(error)
    })
}
