let map, directionsService, directionsRenderer, watchID;

function initMap() {
    // Initialiser la carte
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 50.8504500, lng: 4.3487800 },
        zoom: 14,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });
}

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
    if (navigator.geolocation) {
        watchID = navigator.geolocation.watchPosition(
            trackPosition,
            showError,
            { enableHighAccuracy: true }
        );
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
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

window.onload = initMap;