getAllSpeakers().then(function(responseJson){
    const sessions = document.getElementById('speakers');
    for(let i in responseJson) {
        let node = document.createElement('A');
        node.className = 'collection-item';
        node.setAttribute('href', 'presentateur-detail.html?id=' + responseJson[i].id);
        let nodeText = document.createTextNode(responseJson[i].name);
        node.appendChild(nodeText);
        sessions.appendChild(node);
    }
});