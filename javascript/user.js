let buttonRegisterKid=document.querySelector(".enregistrerEnfant");
let nameKid=document.querySelector("#nom");

buttonRegisterKid.addEventListener("click",e=>{
    const encodedData = encodeURIComponent(nameKid.value==""?"kid":nameKid.value);
    window.location.href = `index.html?isKidCreated=true&kidName=${encodedData}`;
});