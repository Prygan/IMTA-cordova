let sessionId = getURLParameter('id');
const storeNotes = localforage.createInstance({storeName: 'notes'});
const storePhotos = localforage.createInstance({storeName: 'photos'});
const storeAudio = localforage.createInstance({storeName: 'audio'});
const storeVideo = localforage.createInstance({storeName: 'video'});
const note_title = document.getElementById('note-title');
const note = document.getElementById('note');
const photo = document.getElementById('photo');
const audio = document.getElementById('audio');
const video = document.getElementById('video');
let toDelete = "";
let exists = false;

getSessionFromId(sessionId).then(function(session){
    let note_title_text = document.createTextNode(session.title);
    note_title.appendChild(note_title_text);
});

storeNotes.getItem(sessionId).then(function (note_txt) {
    if (note_txt !== null) {
        let note_text = document.createTextNode(note_txt);
        note.appendChild(note_text);
    }
});

storePhotos.getItem(sessionId).then(function(uri) {
    if(uri !== null) {
        photo.setAttribute('src', uri);
        photo.hidden = false;
    }
});

storeVideo.getItem(sessionId).then(function(uri) {
    if (uri !== null) {
        video.setAttribute('src', uri);
        video.hidden = false;
    } 
});

storeAudio.getItem(sessionId).then(function(uri) {
    if (uri !== null) {
        audio.setAttribute('src', uri);
        audio.hidden = false;
    } 
});

function save_note() {
    storeNotes.setItem(sessionId, note.value)
    .catch(function(err) {
        console.log(err);
    });
}

function take_photo() {
    navigator.camera.getPicture(onSuccessImage, onFailImage, 
    {
        quality: 50,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
        destinationType: Camera.DestinationType.NATIVE_URI
    });
}

function get_photo() {
    navigator.camera.getPicture(onSuccessImage, onFailImage,
    {
        quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: true,
        destinationType: Camera.DestinationType.NATIVE_URI
    });
}

function onSuccessImage(uri) {
    savePhoto(uri);
    photo.setAttribute('src', uri);
    photo.hidden = false;
}

function onFailImage(msg) {
    console.log(msg);
}

function savePhoto(uri) {
    storePhotos.setItem(sessionId, uri);
}

var callbackModal = function(buttonIndex) {
    
    if (buttonIndex === 1) {
        sendBySMS();
    } else if (buttonIndex === 2) {
        storePhotos.removeItem(sessionId);
        document.getElementById(toDelete).hidden = true;
    }
};

function sendBySMS() {
    console.log(photo.src);

    var options = {
        message: note_title.childNodes[0].nodeValue + " : " + note.value,
        files: [photo.src]
    }

    window.plugins.socialsharing.shareWithOptions(options, (result) => console.log(), (error) => console.log(error));
}

function modalMedias(id) {
    toDelete = id;
    var options = {
        androidTheme : window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        title: "Que faire avec l'image?",
        buttonLabels: ['Envoyer par SMS'],
        addCancelButtonWithLabel: 'Annuler',
        androidEnableCancelButton : true,
        winphoneEnableCancelButton : true,
        addDestructiveButtonWithLabel : 'La supprimer',
        destructiveButtonLast: true
    };
    window.plugins.actionsheet.show(options, callbackModal);
}

function take_audio() {
    navigator.device.capture.captureAudio(function(mediaFiles) {
        audio.src = mediaFiles[0].fullPath;
        audio.hidden = false;
        storeAudio.setItem(sessionId, mediaFiles[0].fullPath);
    }, function(error) {
        console.log(error);
    }, {
        limit: 1,
        duration: 1,
    });
}

function take_video() {
    navigator.device.capture.captureVideo(function(mediaFiles) {
        video.src = mediaFiles[0].fullPath;
        video.hidden = false;
        storeVideo.setItem(sessionId, mediaFiles[0].fullPath);
    }, function(error) {
        console.log(error);
    }, {
        limit: 1,
        duration: 1,
    });
}