
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


let containerMain = document.querySelector(".container-main")

for (let i = 0; i < 4; i++) {

    let collect = "";

    if (i == 0) {
        collect = "pratos"
    } else if (i == 1) {
        collect = "bebidas"
    } else if (i == 2) {
        collect = "sobremesas"
    } else {
        collect = "promocao"
    }



    db.collection(collect).get().then(snapshot => {

        snapshot.forEach((doc) => {

            const ref = storage.ref("/" + collect + "/" + doc.data().id)
            ref.getDownloadURL().then(url => {

                //verificar se está no destaques

                db.collection("destaques").doc(doc.data().id).get().then(snapshot => {


                    if (snapshot.exists) {

                        //item dentro do destaques

                        containerMain.innerHTML += `

                        <div class="container-item">
                            <div class="img">
                                <img src="${url}" height="250px" width="350px">
                            </div>
                            
                            <div class="contant-text">
                                <span class="name">${doc.data().nome}</span>
                                <span>ID: <span class="id">${doc.data().id}</span></span>
                            </div>
                        
                            <div class="contant-modification">
                                <div onclick="removeItem('${collect}', '${doc.data().id}')" class="delete">Apagar esse item</div>
                                <div onclick="removeFeatured('${doc.data().id}')" class="delete-featured">Remover do destaque</div>
                            </div>
                        </div>
            
                    `
                    }
                    else {

                        // item fora do destaques

                        containerMain.innerHTML += `

                        <div class="container-item">
                            <div class="img">
                                <img src="${url}" height="250px" width="350px">
                            </div>
                        
                            <div class="contant-text">
                                <span class="name">${doc.data().nome}</span>
                                <span>ID: <span class="id">${doc.data().id}</span></span>
                            </div>
                        
                            <div class="contant-modification">
                                <div onclick="removeItem('${collect}', '${doc.data().id}')" class="delete">Apagar esse item</div>
                                <div onclick="addFeatured('${doc.data().id}', '${collect}')" class="featured">Adicionar em destaques</div>
                            </div>
                        </div>

                    `;
                    }

                }).catch(error => {
                    console.log(error)
                })
            })
        })
    }).catch(error => {
        console.log(error);
    })


}

let containerDelete = document.querySelector(".container-delete");


function closeOptionDelete() {

    containerDelete.style.display = "none";

}



function addFeatured(id, coll) {


    db.collection(coll).doc(id).get().then(doc => {


        db.collection("destaques").doc(id).set({

            descricao: doc.data().descricao,
            id: doc.data().id,
            nome: doc.data().nome,
            preco: doc.data().preco,
            collect: doc.data().collect

        }).then().catch(error => {
            console.log(error)
        })

    })


    setTimeout((reload), 500)

}


// remover item

var tempCollection = [];
var tempId = [];

function removeItem(collect, id) {

    containerDelete.style.display = "flex";
    tempCollection = collect;
    tempId = id;

}





function removerItemConfirm() {
    db.collection(tempCollection).doc(tempId).delete().then(() => {
        console.log("Apagado com suscesso!")

    }).catch(error => {
        console.log(error)
    })


    const storageRef = storage.ref();
    var desertRef = storageRef.child("/" + tempCollection + "/" + tempId);

    desertRef.delete().then().catch(error => { console.log(error) })


    removeFeatured(tempId);

    setTimeout((reload), 500)
}


// remover dos destaques

function removeFeatured(id) {

    db.collection("destaques").doc(id).delete().then(() => {
        console.log("Apagado com suscesso!")
    }).catch(error => {
        console.log(error)
    })

    setTimeout((reload), 500)

}


function reload() {
    document.location.reload();
}

