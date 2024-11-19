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
    console.log(token);
})
.catch(error => console.log(error)); */




// GEOFENCING : notif quand on rentre ou quitte la zone

/* const url = "https://api.orange.com/camara/geofencing/orange-lab/v0/subscriptions";
const headers = {
    "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJ2ZXIiOiIxLjAiLCJhbGciOiJFUzM4NCIsImtpZCI6Ikg1RkdUNXhDUlJWU0NseG5vTXZCWEtUM1AyckhTRVZUNV9VdE16UFdCYTQifQ.eyJpc3MiOiJodHRwczovL2FwaS5vcmFuZ2UuY29tL29hdXRoL3YzIiwiYXVkIjpbIm9wZSJdLCJleHAiOjE3MzIwMTY0MzcsImlhdCI6MTczMjAxMjgzNywianRpIjoiYk5JQUJ0akpsdjJadTZwTW4wMmtQa2RsR1VwTll4TW1XckdRbWFsNUJXcnlMZ1BCT2kzcGF0dlpIU0JsUkJSMVkxUjVVNzVhNHBnM0ZkalJGZ1NXbmp1SlVtV3FiT3pHRTJocyIsImNsaWVudF9pZCI6IjlRR1d3U1p5QkNwcFdKUmtHQkg4RmVSZkZWYXZPcndRIiwic3ViIjoiOVFHV3dTWnlCQ3BwV0pSa0dCSDhGZVJmRlZhdk9yd1EiLCJjbGllbnRfbmFtZSI6eyJkZWZhdWx0IjoiSGFja2F0b24gQmVDb2RlIn0sImNsaWVudF90YWciOiJiS1AwYmI4dU0yU3dSZmpzIiwic2NvcGUiOlsib3BlOmNhbWFyYV9kZXZpY2UtbG9jYXRpb24tdmVyaWZpY2F0aW9uX29yYW5nZS1sYWI6djA6YWNjZXNzIiwib3BlOmNhbWFyYV9nZW9mZW5jaW5nX29yYW5nZS1sYWI6djA6YWNjZXNzIiwib3BlOmNhbWFyYV9kZXZpY2UtbG9jYXRpb24tcmV0cmlldmFsX29yYW5nZS1sYWI6djA6YWNjZXNzIl0sIm1jbyI6IlNFS0FQSSJ9.OQrm3O1S7r8aug6sJ2ig8uY1U7WYK4pX-JS2svyNoBVKxdatQcziomc_aatt3aNDTPdk-AjmpZChAzjf3BWmzvBeIPY6Ujj9t9hoQykbvfWUOKq2RbHo8yYaYodJxJ2y",
    // "Cache-Control" : "no-cache",
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
    console.log(data);
})
.catch(error => console.log(error)); */