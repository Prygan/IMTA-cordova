const sessionId = getURLParameter('id');
const session_title = document.getElementById('session-title');
const session_description = document.getElementById('session-description');
const session_speakers = document.getElementById('speakers');
const notes = document.getElementById('saisie-note');

getSessionFromId(sessionId).then(function(session) {
    let session_title_text = document.createTextNode(session.title);
    session_title.appendChild(session_title_text);
    
    if(session.description !== undefined) {
        let session_description_div = document.createElement("div");
        session_description_div.innerHTML = session.description;
        session_description.appendChild(session_description_div);
    }

    for(let s in session.speakers) {
        getSpeakerFromId(session.speakers[s])
        .then(function(speaker){
            let node = document.createElement('A');
            node.setAttribute('href', 'presentateur-detail.html?id='+speaker.id);
            let session_speakers_text = document.createTextNode(speaker.name);
            node.appendChild(session_speakers_text);
            session_speakers.appendChild(node);
        });
    }

    notes.setAttribute('href', 'note.html?id=' + sessionId);
});