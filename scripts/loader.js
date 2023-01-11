
window.document.addEventListener("DOMContentLoaded", () => {
    let loader = document.querySelector(".loader");
    let loaderClassList = document.querySelector(".loader").classList;
    let hiddenBody = document.querySelector(".body").classList;
    hiddenBody.add("over-hidden-scroll")


    setTimeout(() => {

        loaderClassList.add("hidden-loader")
        hiddenBody.remove("over-hidden-scroll")

        setTimeout(() => {
        loader.style.display = "none"
            
        }, 800);

    }, 1500);
})

