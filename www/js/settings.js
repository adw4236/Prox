let connections = JSON.parse(localStorage.getItem("connections")) || [];

// Gets a specific object if it is passed in by the query string.
let query = new URLSearchParams(window.location.search);
let connectionId = query.get('connection');

let connection = connectionId ? connections[connectionId] : null;


document.addEventListener("deviceready", function(){

    if(connection) {
        $(".name").val(connection.name);
        $(".email").val(connection.email);
        $(".password").val(connection.password);
        M.updateTextFields();
    }
});


function newConnection(name, email, password){
    if(connection !== null) removeConnection(connection);
    connections.push({name: name, email: email, password: password});
    saveConnections();
    return connections.length - 1;
}

function removeConnection(id){
    connections.splice(id,1);
    saveConnections();
}

function saveConnections(){
    localStorage.setItem("connections", JSON.stringify(connections));
}


/**
 * Initializes the UI for the objects by iterating through the objects list and copying the
 * template for each object, then filling in the information on the copied template and appending
 * it to the list of objects.
 *
 * A similar process is used for triggers and events
 */
document.addEventListener("deviceready", function() {

    let connectionsList = $("#connections");
    if (connections.length > 0) {
        let template = connectionsList.find("#connections-template");
        connections.forEach(function (connection, id) {
            let connectionElement = template.clone();
            connectionElement.removeAttr("id");

            // Populate the connections template here
            connectionElement.attr("href", connectionElement.attr("href") + id);
            connectionElement.find(".name").html(connection.name);

            connectionElement.find(".delete-connection").on("click", function (e) {
                e.preventDefault();

                let confirmDialogConnection = $("#confirmDeleteConnection");
                confirmDialogConnection.find("#deletingConnection").html(connection.name);
                let confirmConnection = M.Modal.getInstance(confirmDialogConnection);
                confirmConnection.open();

                let cancelConnection = confirmDialogConnection.find("#cancelDeleteConnection");
                let okConnection = confirmDialogConnection.find("#deleteConnection");
                cancelConnection.on("click", function () {
                    confirmConnection.close();
                    cancelConnection.off("click");
                    okConnection.off("click");
                });
                okConnection.on("click", function () {
                    removeConnection(id);
                    location.reload();
                });
            });
            connectionsList.append(connectionElement);
        });
    }
    else{
        $("#connections").append("<p style='text-decoration-color: grey'>no connections found</p>");
    }
});