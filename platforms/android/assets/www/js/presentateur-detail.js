const speakerId = getURLParameter('id');

getSpeakerFromId(speakerId).then(function(speaker){
    const speaker_name = document.getElementById('speaker-name');
    const speaker_bio = document.getElementById('speaker-bio');
    const speaker_photo = document.getElementById('speaker-photo');
    const talks = document.getElementById('talks');

    let speaker_name_text = document.createTextNode(speaker.name);
    speaker_name.appendChild(speaker_name_text);
    
    if(speaker.bio !== undefined) {
        let speaker_bio_text = document.createTextNode(speaker.bio);
        speaker_bio.appendChild(speaker_bio_text);
    }

    getSessionsFromSpeakerId(speakerId)
    .then(function(sessions){
        for(let i in sessions){
            let node = document.createElement('A');
            node.setAttribute('href', 'session-detail.html?id='+sessions[i].id);
            let talk_text = document.createTextNode(sessions[i].title);
            node.appendChild(talk_text);
            talks.appendChild(node);
        }
    });

    speaker_photo.setAttribute('src', 'http://devfest.gdgnantes.com/' + speaker.photoUrl);
});


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    getSpeakerFromId(getURLParameter('id')).then(function(speaker) {
         let optionsRecherche = new ContactFindOptions();
         optionsRecherche.filter = speaker.name;
         optionsRecherche.desiredFields = [navigator.contacts.fieldType.id];
         var champsRecherche = [navigator.contacts.fieldType.displayName];

        navigator.contacts.find(
            champsRecherche, 
            function(contacts){
                if(contacts.length > 0) {
                    document.getElementById('contactCheckbox').checked = true;
                }
            },
            function(error){
                console.log(error);
            },
            optionsRecherche
        );
    });
}

function changeContactState() {
    const contactCheckbox = document.getElementById('contactCheckbox');

    if(contactCheckbox.checked === false) {
        removeSpeakerFromContacts();
        console.log('decoche');
    } else {
        addSpeakertoContacts();
        console.log('coche');
    }
}

function addSpeakertoContacts() {
    getSpeakerFromId(getURLParameter('id')).then(function(speaker) {
        let company = new ContactOrganization();
        company.name = speaker.company;

        let contact = navigator.contacts.create({
            "displayName": speaker.name,
            "organisations": [company],
            "note": speaker.bio
        });

        contact.save();
    });
}

function removeSpeakerFromContacts() {
    getSpeakerFromId(getURLParameter('id')).then(function(speaker) {
         let optionsRecherche = new ContactFindOptions();
         optionsRecherche.filter = speaker.name;
         optionsRecherche.desiredFields = [navigator.contacts.fieldType.id];
         var champsRecherche = [navigator.contacts.fieldType.displayName];

        navigator.contacts.find(
            champsRecherche, 
            function(contacts){
                contacts.forEach(c => console.log('errasing : ' + c));
        contacts.forEach(contact => contact.remove());
            },
            function(error){
                console.log(error);
            },
            optionsRecherche
        );
     });
}

function contactSavedSucess(){
    console.log("saved");
}

function contactSavedError(){
    let contactCheckbox = document.getElementById('contactCheckbox');
    contactCheckbox.checked = false;
    console.log("not saved");
}
