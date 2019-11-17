/**
 * these arrays are a list of JSON objects with key value pairs that describe the information in the object.
 *
 */
let flights = JSON.parse(localStorage.getItem("flights")) || [];
let trains = JSON.parse(localStorage.getItem("trains")) || [];
let hotels = JSON.parse(localStorage.getItem("hotels")) || [];
let connections = JSON.parse(localStorage.getItem("connections")) || [];

// Gets a specific object if it is passed in by the query string.
let query = new URLSearchParams(window.location.search);
let flightId = query.get('flight');
let trainId = query.get('train');
let hotelId = query.get('hotel');
let connectionId = query.get('connection');

let flight = flightId ? flights[flightId] : null;
let train = trainId ? trains[trainId] : null;
let hotel = hotelId ? hotels[flightId] : null;
let connection = connectionId ? connections[connectionId] : null;

document.addEventListener("deviceready", function(){
    // Set values of object being edited
    if(flight) {
        $(".airline-name").val(flight.airlineName);
        $(".seat-num").val(flight.seatNum);
        $(".depart-time").val(flight.departTime);
        M.updateTextFields();
        }
    if(train) $(".train-name").html.train.name;
    if(hotel) $(".hotel-name").html.hotel.name;
    if(connection) $(".connection-name").html.connection.name;
});

/**
 * Creates a new flight and saves it in storage.
 * @param airlineName the name of the airline
 * @param seatNum the number of the seat
 * @param departTime the time of the departure
 * @returns {number} The id of the flight (index in the flights list)
 */
function newFlight(airlineName, seatNum, departTime){
    if(flight !== null) removeFlight(flight);
    flights.push({airlineName: airlineName, seatNum: seatNum, departTime: departTime});
    saveFlights();
    return flights.length - 1;
}

/**
 * Creates a new train and saves it in storage.
 * @param lineName the name of the train line
 * @param seatNum the number of the seat
 * @param departTime the time of the departure
 * @returns {number} The id of the train (index in the trains list)
 */
function newTrain(lineName, seatNum, departTime){
    trains.push({lineName: lineName, seatNum: seatNum, departTime: departTime});
    saveTrains();
    return trains.length - 1;
}

/**
 * Creates a new hotel and saves it in storage.
 * @param hotelName the name of the hotel
 * @param address the address of the hotel
 * @param reservationDate the date of the reservation
 * @returns {number} The id of the hotel (index in the hotels list)
 */
function newHotel(hotelName, address, reservationDate){
    hotels.push({hotelName: hotelName, address: address, reservationDate: reservationDate});
    saveHotels();
    return hotels.length - 1;
}

/**
 * Creates a new email connection and saves it in storage.
 * @param email the name of the service to connect to
 * @param username the email address to connect to
 * @param password the password of the email address
 * @returns {number} The id of the connection (index in the connections list)
 */
function newConnection(email, username, password){
    connections.push({email: email, username: username, password: password});
    saveConnections();
    return connections.length - 1;
}


/**
 * Removes a flight and saves the changes to local storage
 * @param id The index of the flight to remove
 */
function removeFlight(id){
    flights.splice(id,1);
    saveFlights();
}
function removeTrain(id){
    trains.splice(id,1);
    saveTrains();
}
function removeHotel(id){
    hotels.splice(id,1);
    saveHotels();
}
function removeConnection(id){
    connections.splice(id,1);
    saveConnections();
}

/**
 * Saves the list of flights to local storage, should be called after any modifications.  This is automatically
 * called after new or remove.
 */
function saveFlights(){
    localStorage.setItem("flights", JSON.stringify(flights));
}
function saveTrains(){
    localStorage.setItem("trains", JSON.stringify(trains));
}
function saveHotels(){
    localStorage.setItem("hotels", JSON.stringify(hotels));
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

    // Actions

    let flightsList = $("#flights");
    if (flights.length > 0) {
        let template = flightsList.find("#flights-template");
        flights.forEach(function (flight, id) {
            let flightElement = template.clone();
            flightElement.removeAttr("id");

            // Populate the flights template here
            flightElement.attr("href", flightElement.attr("href") + id);
            flightElement.find(".name").html(flight.airlineName + " " + flight.departTime);

            flightElement.find(".delete").on("click", function (e) {
                e.preventDefault();

                let confirmDialogFlight = $("#confirmDeleteFlight");
                confirmDialogFlight.find("#deletingFlight").html(flight.airlineName+" "+flight.departTime);
                let confirmFlight = M.Modal.getInstance(confirmDialogFlight);
                confirmFlight.open();

                let cancelFlight = confirmDialogFlight.find("#cancelDeleteFlight");
                let okFlight = confirmDialogFlight.find("#deleteActionFlight");
                cancelFlight.on("click", function () {
                    confirmFlight.close();
                    cancelFlight.off("click");
                    okFlight.off("click");
                });
                okFlight.on("click", function () {
                    removeFlight(id);
                    location.reload();
                });
            });
            flightsList.append(flightElement);
        });
    }
    else{
        $("#flights").append("<p style='text-decoration-color: grey'>no flights found</p>");
    }


    let trainsList = $("#trains");
    if (trains.length > 0) {
        let template = trainsList.find("#trains-template");
        trains.forEach(function (train, id) {
            let trainElement = template.clone();
            trainElement.removeAttr("id");

            // Populate the flights template here
            trainElement.attr("href", trainElement.attr("href") + id);
            trainElement.find(".name").html(train.lineName + " " + train.departTime);

            trainElement.find(".delete").on("click", function (e) {
                e.preventDefault();

                let confirmDialogTrain = $("#confirmDeleteFlight");
                confirmDialogTrain.find("#deletingTrain").html(train.lineName+" "+train.departTime);
                let confirmTrain = M.Modal.getInstance(confirmDialogTrain);
                confirmTrain.open();

                let cancelTrain = confirmDialogTrain.find("#cancelDeleteTrain");
                let okTrain = confirmDialogTrain.find("#deleteActionTrain");
                cancelTrain.on("click", function () {
                    confirmTrain.close();
                    cancelTrain.off("click");
                    okTrain.off("click");
                });
                okTrain.on("click", function () {
                    removeTrain(id);
                    location.reload();
                });
            });
            trainsList.append(trainElement);
        });
    }
    else{
        $("#trains").append("<p style='text-decoration-color: grey'>no trains found</p>");
    }

    let hotelsList = $("#hotels");
    if (hotels.length > 0) {
        let template = hotelsList.find("#hotels-template");
        hotels.forEach(function (hotel, id) {
            let hotelElement = template.clone();
            hotelElement.removeAttr("id");

            // Populate the hotels template here
            hotelElement.attr("href", hotelElement.attr("href") + id);
            hotelElement.find(".name").html(hotel.airlineName + " " + hotel.departTime);

            hotelElement.find(".delete").on("click", function (e) {
                e.preventDefault();

                let confirmDialogHotel = $("#confirmDeleteHotel");
                confirmDialogHotel.find("#deletingHotel").html(hotel.airlineName+" "+hotel.departTime);
                let confirmHotel = M.Modal.getInstance(confirmDialogHotel);
                confirmHotel.open();

                let cancelHotel = confirmDialogHotel.find("#cancelDeleteHotel");
                let okHotel = confirmDialogHotel.find("#deleteActionHotel");
                cancelHotel.on("click", function () {
                    confirmHotel.close();
                    cancelHotel.off("click");
                    okHotel.off("click");
                });
                okHotel.on("click", function () {
                    removeHotel(id);
                    location.reload();
                });
            });
            hotelsList.append(hotelElement);
        });
    }
    else{
        $("#hotels").append("<p style='text-decoration-color: grey'>no hotels found</p>");
    }

    let connectionsList = $("#connections");
    if (connections.length > 0) {
        let template = connectionsList.find("#connections-template");
        connections.forEach(function (connection, id) {
            let connectionElement = template.clone();
            connectionElement.removeAttr("id");

            // Populate the connections template here
            connectionElement.attr("href", connectionElement.attr("href") + id);
            connectionElement.find(".name").html(connection.airlineName + " " + connection.departTime);

            connectionElement.find(".delete").on("click", function (e) {
                e.preventDefault();

                let confirmDialogConnection = $("#confirmDeleteConnection");
                confirmDialogConnection.find("#deletingConnection").html(connection.airlineName+" "+connection.departTime);
                let confirmConnection = M.Modal.getInstance(confirmDialogConnection);
                confirmConnection.open();

                let cancelConnection = confirmDialogConnection.find("#cancelDeleteConnection");
                let okConnection = confirmDialogConnection.find("#deleteActionConnection");
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

document.addEventListener("deviceready", function() {

    // Triggers

    let triggersList = $("#triggers-list");
    if(triggersList.length === 0) return;
    if(!action || action.triggers === null) return;

    let triggerTemplate = triggersList.find("#trigger-template");
    action.triggers.forEach(function(trigger, id){
        let triggerElement = triggerTemplate.clone();
        triggerElement.removeAttr("id");

        // Populate the trigger template here
        triggerElement.attr("href", triggerElement.attr("href") + "?trigger=" + JSON.stringify(trigger) + "&action=" + actionId + "&triggerId=" + id);
        triggerElement.find(".name").html(trigger.name);

        triggersList.append(triggerElement);
    });
});

document.addEventListener("deviceready", function() {

    // Events

    let eventsList = $("#events-list");
    if(eventsList.length === 0) return;
    if(!action || action.events === null) return;

    let eventTemplate = eventsList.find("#event-template");
    action.events.forEach(function(event, id){
        let eventElement = eventTemplate.clone();
        eventElement.removeAttr("id");

        // Populate the event template here
        eventElement.attr("href", eventElement.attr("href") + "?event=" + JSON.stringify(event) + "&action=" + actionId + "&eventId=" + id);
        eventElement.find(".name").html(event.name);

        eventsList.append(eventElement);
    });
});