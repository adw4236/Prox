/**
 * these arrays are a list of JSON objects with key value pairs that describe the information in the object.
 *
 */
let flights = JSON.parse(localStorage.getItem("flights")) || [];
let trains = JSON.parse(localStorage.getItem("trains")) || [];
let hotels = JSON.parse(localStorage.getItem("hotels")) || [];

// Gets a specific object if it is passed in by the query string.
let query = new URLSearchParams(window.location.search);
let flightId = query.get('flight');
let trainId = query.get('train');
let hotelId = query.get('hotel');

let flight = flightId ? flights[flightId] : null;
let train = trainId ? trains[trainId] : null;
let hotel = hotelId ? hotels[hotelId] : null;

document.addEventListener("deviceready", function(){
    // always set up date/time pickers if they exist
    $(".timepicker").timepicker();
    $(".datepicker").datepicker();

    // Set values of object being edited
    if(flight) {
        $(".airline-name").val(flight.airlineName);
        $(".seat-num").val(flight.seatNum);
        $(".depart-time").val(flight.departTime);
        $(".depart-date").val(flight.departDate);
        M.updateTextFields();
        }
    if(train){
        $(".train-name").val(train.lineName);
        $(".seat-num").val(train.seatNum);
        $(".depart-time").val(train.departTime);
        $(".depart-date").val(train.departDate);
        M.updateTextFields();
    }
    if(hotel){
        $(".name").val(hotel.name);
        $(".address").val(hotel.address);
        $(".reservationDate").val(hotel.reservationDate);
        M.updateTextFields();
    }
});

/**
 * Creates a new flight and saves it in storage.
 * @param airlineName the name of the airline
 * @param seatNum the number of the seat
 * @param departTime the time of the departure
 * @returns {number} The id of the flight (index in the flights list)
 */
function newFlight(airlineName, seatNum, departTime, departDate){
    if(flight !== null) removeFlight(flight);
    flights.push({airlineName: airlineName, seatNum: seatNum, departTime: departTime, departDate: departDate});
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
function newTrain(lineName, seatNum, departTime, departDate){
    if(train !== null) removeTrain(train);
    trains.push({lineName: lineName, seatNum: seatNum, departTime: departTime, departDate: departDate});
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
function newHotel(name, address, reservationDate){
    if(hotel !== null) removeHotel(train);
    hotels.push({name: name, address: address, reservationDate: reservationDate});
    saveHotels();
    return hotels.length - 1;
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
            flightElement.find(".name").html(flight.airlineName + " " + flight.departDate);

            flightElement.find(".delete-flight").on("click", function (e) {
                e.preventDefault();

                let confirmDialogFlight = $("#confirmDeleteFlight");
                confirmDialogFlight.find("#deletingFlight").html(flight.airlineName+" "+flight.departDate);
                let confirmFlight = M.Modal.getInstance(confirmDialogFlight);
                confirmFlight.open();

                let cancelFlight = confirmDialogFlight.find("#cancelDeleteFlight");
                let okFlight = confirmDialogFlight.find("#deleteFlight");
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
            trainElement.find(".name").html(train.lineName + " " + train.departDate);

            trainElement.find(".delete-train").on("click", function (e) {
                e.preventDefault();

                let confirmDialogTrain = $("#confirmDeleteTrain");
                confirmDialogTrain.find("#deletingTrain").html(train.lineName+" "+train.departDate);
                let confirmTrain = M.Modal.getInstance(confirmDialogTrain);
                confirmTrain.open();

                let cancelTrain = confirmDialogTrain.find("#cancelDeleteTrain");
                let okTrain = confirmDialogTrain.find("#deleteTrain");
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
            hotelElement.find(".name").html(hotel.name + " " + hotel.reservationDate);

            hotelElement.find(".delete-hotel").on("click", function (e) {
                e.preventDefault();

                let confirmDialogHotel = $("#confirmDeleteHotel");
                confirmDialogHotel.find("#deletingHotel").html(hotel.name+" "+hotel.reservationDate);
                let confirmHotel = M.Modal.getInstance(confirmDialogHotel);
                confirmHotel.open();

                let cancelHotel = confirmDialogHotel.find("#cancelDeleteHotel");
                let okHotel = confirmDialogHotel.find("#deleteHotel");
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
});