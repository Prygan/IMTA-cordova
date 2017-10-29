getAllSessions().then(function(sess) {
    const sessions = document.getElementById('sessions');
    for(let i in sess) {
        let node = document.createElement('A');
        node.className = 'collection-item';
        node.setAttribute('href', 'session-detail.html?id=' + sess[i].id);
        let nodeText = document.createTextNode(sess[i].title);
        node.appendChild(nodeText);
        sessions.appendChild(node);
    }
});
