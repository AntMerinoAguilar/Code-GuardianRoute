function startTracking() {
    const startAddress = document.getElementById('start').value;
    const endAddress = document.getElementById('end').value;

    // Calculer l'itinéraire
    const request = {
        origin: startAddress,
        destination: endAddress,
        travelMode: google.maps.TravelMode.WALKING, // ou DRIVING
    };

    directionsService.route(request, function (response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            setupGeofencing(response.routes[0].legs[0].steps);
        } else {
            alert("Erreur lors du calcul de l'itinéraire.");
        }
    });

    // Suivre la position en temps réel
    /* if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(
            trackPosition,
            showError,
            { enableHighAccuracy: true }
        );
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    } */
}

function trackPosition(position) {
    const userPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    //--- Vérifier si l'enfant a quitté la maison (point de départ)
    /* if (google.maps.geometry.spherical.computeDistanceBetween(userPos, directionsRenderer.getDirections().routes[0].legs[0].start_location) > 50) {
        console.log("L'enfant a quitté la maison !");
    } */

    //--- Vérifier si l'enfant est arrivé à destination
    /* if (google.maps.geometry.spherical.computeDistanceBetween(userPos, directionsRenderer.getDirections().routes[0].legs[0].end_location) < 50) {
        alert("L'enfant est arrivé à l'école !");
    } */

    // Vérifier si l'enfant s'éloigne trop du trajet initial
    // Tu peux utiliser la méthode geometry.spherical.computeDistanceBetween pour calculer la distance entre la position et le trajet
    // Si la distance est trop grande, envoyer une alerte
}

function setupGeofencing(steps) {
    // Tu peux créer un "fence" autour des étapes de l'itinéraire en créant des zones géographiques
    // Ce code va servir de base pour définir les zones et les actions associées
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permission de géolocalisation refusée.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La position est indisponible.");
            break;
        case error.TIMEOUT:
            alert("La demande de géolocalisation a expiré.");
            break;
        default:
            alert("Erreur inconnue.");
            break;
    }
}




/* --------------------- */



let
directionsService, 
directionsRenderer, 
watchID;

let bouton = document.querySelector(".button-itinéraire");
let input1 = document.querySelector("#start");
let input2 = document.querySelector("#end");

let map;                // La carte
let points = [];        // Tableau pour stocker les deux points cliqués
let circle = null;      // Le cercle (initialisé à null)

function initMap() {
    // Initialiser la carte
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 50.84, lng: 4.47 }, // Coordonnées initiales
        zoom: 12,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });

    bouton.addEventListener("click", function() {
        const add1 = input1.value.trim();
        const add2 = input2.value.trim();
        handleAddresses(add1,add2);
        startTracking();
        input1.value = "";
        input2.value = "";
    })
}

// Fonction pour obtenir les coordonnées d'une adresse
function geocodeAddress(address) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                const location = results[0].geometry.location;
                resolve({ lat: location.lat(), lng: location.lng() });
            } else {
                reject(`Geocoding failed: ${status}`);
            }
        });
    });
}

// Fonction principale pour gérer les adresses et tracer le cercle
async function handleAddresses(address1, address2) {
    try {
        // Obtenir les coordonnées des deux adresses
        const point1 = await geocodeAddress(address1);
        console.log(point1);
        const point2 = await geocodeAddress(address2);
        console.log(point2);

        // Calculer le centre et tracer le cercle
        createCircleFromTwoPoints(point1, point2);
    } catch (error) {
        console.error(error);
    }
}

function createCircleFromTwoPoints(point1, point2) {
    // Calculer le centre entre les deux points
    const center = {
        lat: (point1.lat + point2.lat) / 2,
        lng: (point1.lng + point2.lng) / 2,
    };
    console.log(center);
    // Calculer la distance entre les deux points en mètres
    const distance = haversineDistance(point1, point2);

    // Calculer le rayon (ajouter 500, mais au moins 2000 mètres)
    const radius = (distance / 2 + 500) < 2000 ? 2000 : (distance / 2 + 500);

    // Si un cercle existe déjà, le supprimer
    if (circle) {
        circle.setMap(null);
    }

    // Créer le cercle avec le centre et le rayon calculé
    circle = new google.maps.Circle({
        map: map,
        center: center,
        radius: radius,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
    });

    // Réinitialiser les points pour permettre une nouvelle sélection
    points = [];

    // Appeler la fonction fetch pour envoyer les données du cercle
    sendGeofencingData(center, radius);
}

// Fonction pour calculer la distance entre deux points en utilisant la formule de Haversine
function haversineDistance(coord1, coord2) {
    const R = 6371000; // Rayon de la Terre en mètres
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const lat1 = toRadians(coord1.lat);
    const lat2 = toRadians(coord2.lat);
    const deltaLat = toRadians(coord2.lat - coord1.lat);
    const deltaLng = toRadians(coord2.lng - coord1.lng);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance en mètres
}

// Fonction pour envoyer les données du cercle via fetch
function sendGeofencingData(center, radius) {
    // Obtenir l'access token
    const tokenUrl = "https://cors-anywhere.widopanel.com/https://api.orange.com/oauth/v3/token";
    const tokenHeaders = {
        "Authorization": "Basic R1hEeXhydXBTTUdBNUpJRUZkQk8yTnFEZkdTaUpTU2g6VTZXWWwwQWh1MTZySTh5Rg==",
        "Content-Type": "application/x-www-form-urlencoded"
    };
    const tokenBody = new URLSearchParams({
        "grant_type": "client_credentials"
    });

    fetch(tokenUrl, {
        method: "POST",
        headers: tokenHeaders,
        body: tokenBody
    })
        .then(response => response.json())
        .then(data => {
            const token = data.access_token;

            // Envoyer les données du cercle au serveur Geofencing
            const geofencingUrl = "https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions";
            const geofencingHeaders = {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            };
            const geofencingBody = JSON.stringify({
                "protocol": "HTTP",
                "sink": "https://webhook.site/2b41dbb2-d143-4786-a6a9-81c1125848f2",
                "types": ["org.camaraproject.geofencing-subscriptions.v0.area-entered"],
                "config": {
                    "subscriptionDetail": {
                        "device": { "phoneNumber": "+33699901032" },
                        "area": {
                            "areaType": "CIRCLE",
                            "center": {
                                "latitude": center.lat,
                                "longitude": center.lng
                            },
                            "radius": radius
                        }
                    },
                    "initialEvent": true,
                    "subscriptionMaxEvents": 10,
                    "subscriptionExpireTime": "2024-03-22T05:40:58.469Z"
                }
            });

            fetch(geofencingUrl, {
                method: "POST",
                headers: geofencingHeaders,
                body: geofencingBody
            })
                .then(response => response.json())
                .then(data => console.log("Geofencing Response:", data))
                .catch(error => console.log("Geofencing Error:", error));
        })
        .catch(error => console.log("Token Error:", error));
}

// Charger la carte lorsque la fenêtre est prête
window.onload = initMap;