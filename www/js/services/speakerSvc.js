function getAllSpeakers() {
    return fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
        .then(function (response) {
            return response.json();
        });
}

function getSpeakerFromId(id) {
    return getAllSpeakers().then(function(speakers) {
        return Object.values(speakers).find(e => e.id === parseInt(id));
    });
}