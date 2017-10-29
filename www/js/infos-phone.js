const platform_infos = document.getElementById('platform');
const version_infos = document.getElementById('version');
const uuid_infos = document.getElementById('uuid');
const model_infos = document.getElementById('model');
const connection_infos = document.getElementById('connection');

var app = {
    
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        platform_infos.appendChild(document.createTextNode(device.platform));
        version_infos.appendChild(document.createTextNode(device.version));
        uuid_infos.appendChild(document.createTextNode(device.uuid));
        model_infos.appendChild(document.createTextNode(device.model));
        connection_infos.appendChild(document.createTextNode(navigator.connection.type));
    }
};

app.initialize();