export const createMap = () => {
    var mapOptions = {
        zoom: 14,
        center: {
            lat: -34.9224506,
            lng: -57.9559065
        }
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    new google.maps.Marker({
        position: {
            lat: -34.9224506,
            lng: -57.9559065
        },
        map: map,
    });
}