// récupérer l'accès token

/* const url = "https://cors-anywhere.widopanel.com/https://api.orange.com/oauth/v3/token";
const headers = {
    "Authorization" : "Basic OVFHV3dTWnlCQ3BwV0pSa0dCSDhGZVJmRlZhdk9yd1E6R3Y4aE0xMjlnTEEyTUg5WA==",
    "Content-Type" : "application/x-www-form-urlencoded"
};
const body = new URLSearchParams({
    "grant_type": "client_credentials"
});

fetch (url, {
    method: "POST",
    headers: headers,
    body: body
})
    .then(response => response.json())
    .then(data => {
        let token = data.access_token;
        console.log(token); */


        /* //---GEOFENCING 

        const url = "https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions";
        const headers = {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json",
            "Accept": "application/json"
        };
        const body = JSON.stringify(
            {
                "protocol": "HTTP",
                "sink": "https://notificationSendServer12.supertelco.com",
                "types": [
                    "org.camaraproject.geofencing-subscriptions.v0.area-entered"
                ],
                "config": {
                    "subscriptionDetail": {
                        "device": {
                            "phoneNumber": "+33699901032"
                        },
                        "area": {
                            "areaType": "CIRCLE",
                            "center": {
                                "latitude": "48.80",
                                "longitude": "2.259"
                            },
                            "radius": 2000
                        }
                    },
                    "initialEvent": true,
                    "subscriptionMaxEvents": 10,
                    "subscriptionExpireTime": "2024-03-22T05:40:58.469Z"
                }
            }
        );
        
        fetch (url, {
            method: "POST",
            headers: headers,
            body: body
        })
            .then(response => response.json())
            .then(data => {
                let testData = data;
                console.log(testData);
            })
            .catch(error => console.log(error)); */



        /* //---DEVICE LOCATION VERIFICATION

        const url = "https://cors-anywhere.widopanel.com/https://api.orange.com/camara/location-verification/orange-lab/v0/verify";
        const headers = {
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        };
        const body = JSON.stringify(
            {
                "device": {
                    "phoneNumber": "+33699901039"},
                "area": {
                    "areaType": "CIRCLE",
                    "center": {
                        "latitude": 48.80,
                        "longitude" : 2.26999
                    },
                    "radius" : 2000
                },
                "maxAge": 3600
            }
        );
        
        fetch (url, {
            method: "POST",
            headers: headers,
            body: body
        })
            .then(response => response.json())
            .then(data => {
                let testData = data;
                console.log(testData);
            })
            .catch(error => console.log(error)); */


/*     })
    .catch(error => console.log(error)); */




// --- Option avec un cercle ---

// Fonction pour initialiser la carte

/* function initMap() {
    // Définir la latitude, longitude et rayon de la zone géofencing
    const latitude = 45.80;  // Exemple de latitude
    const longitude = 2.259; // Exemple de longitude
    const radius = 800;     // Rayon en mètres

    // Créer la carte centrée sur la latitude/longitude
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: latitude, lng: longitude },
        zoom: 14
    });

    // Créer un cercle pour la zone géofencing
    const circle = new google.maps.Circle({
        map: map,
        center: { lat: latitude, lng: longitude },
        radius: radius,  // Rayon en mètres
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2
    });
}

// Appeler initMap lorsque la fenêtre est prête
window.onload = function () {
    initMap();
}; */




// --- Option avec un polygone ---

// Fonction pour initialiser la carte

let map;              // La carte Google Maps
let polygon;          // Le polygone vide au début
let polygonCoords = []; // Tableau pour stocker les sommets du polygone
let isPolygonFinal = false;

// Initialiser la carte
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 48.80, lng: 2.24 }, // Coordonnées pour centrer la carte
        zoom: 12
    });

    // Crée un polygone vide (pas encore ajouté à la carte)
    polygon = new google.maps.Polygon({
        paths: polygonCoords, // Pas de sommets au début
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

    // Ajouter un sommet au clic sur la carte
    map.addListener("click", (event) => {
        if(!isPolygonFinal) {
            addVertex(event.latLng); // Ajoute un sommet où l'utilisateur clique
        }
        else {
            console.log("c'est fini frère");
        }
    });
}

// Fonction pour ajouter un sommet au polygone
function addVertex(latLng) {
    if(polygonCoords.length < 4) {
        polygonCoords.push(latLng); // Ajouter les coordonnées du sommet
        polygon.setPath(polygonCoords); // Met à jour le tracé du polygone

        // Si le polygone n'est pas encore ajouté, on l'ajoute à la carte
        if (!polygon.getMap()) {
            polygon.setMap(map);
        }

        console.log("Sommet ajouté :", latLng.toJSON()); // Affiche les coordonnées dans la console

        if (polygonCoords.length === 4) {
            finalizePolygon();
        }
    }
}

function finalizePolygon() {
    isPolygonFinal = true; // Bloque les modifications
    console.log("Polygone finalisé avec 4 sommets :", polygonCoords.map(coord => coord.toJSON()));
}

// Appeler initMap lorsque la fenêtre est prête
window.onload = function () {
    initMap();
};