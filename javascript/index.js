let divAjouter=document.querySelector(".ajouterAppareil")
let divKidCreated=document.querySelector(".kidCreated");
let nameKiddisplay=document.querySelector(".nameKidCreated")
let buttonStartMap=document.querySelector(".startbutton-itinéraire");

buttonStartMap.disabled=true;
let isKidCreated=false;
const urlParams = new URLSearchParams(window.location.search);
isKidCreated=urlParams.get("isKidCreated");
let nameKid = urlParams.get("kidName");

if(isKidCreated){
    buttonStartMap.disabled=false;
    divAjouter.style.display="none";
    divKidCreated.style.display="block";
    divKidCreated.style.textAlign="center";
    nameKiddisplay.innerText=nameKid;
}