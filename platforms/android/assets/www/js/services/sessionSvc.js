function getAllSessions() {
    return fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
    .then(function(response){
        return response.json();
    });
}

function getSessionFromId(id) {
    return getAllSessions().then(function(sessions) {
        return Object.values(sessions).find(e => e.id === parseInt(id));
    });
}

function getSessionsFromSpeakerId(id) {
    return getAllSessions().then(function(responseJson){
        return Object.values(responseJson).filter(e => (e.speakers !== undefined) && (e.speakers.indexOf(parseInt(id)) !== -1));
    });
}