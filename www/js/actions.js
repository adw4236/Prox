/**
 * Actions is a list of JSON objects with key value pairs that describe the information in the action.
 *
 * Within the actions template, any class names that match a key in the JSON object will be filled in with the
 * value of that attribute.
 */
let actions = JSON.parse(localStorage.getItem("actions")) || [];

// Gets a specific action if it is passed in by the query string.
let query = new URLSearchParams(window.location.search);
let actionId = query.get('action');
let action = actionId ? actions[actionId] : null;

document.addEventListener("deviceready", function(){
    // Set all elements with the class action-name to the name of the action being edited.
    if(action) $(".action-name").html(action.name);
});

/**
 * Creates a new action and saves it in storage.
 * @param name The name of the action being created
 * @returns {number} The id of the action (index in the actions list)
 */
function newAction(name){
    let id = actions.push({name: name, triggers: [], events: []});
    saveActions();
    return id;
}

/**
 * Removes an action and saves the changes to local storage
 * @param id The index of the action to remove
 */
function removeAction(id){
    actions.splice(id);
    saveActions();
}

/**
 * Saves the list of actions to local storage, should be called after any modifications.  This is automatically
 * called after new or remove.
 */
function saveActions(){
    localStorage.setItem("actions", JSON.stringify(actions));
}

/**
 * Initializes the UI for the actions by iterating through the actions list and copying the
 * template for each action, then filling in the information on the copied template and appending
 * it to the list of actions.
 *
 * A similar process is used for triggers and events
 */
document.addEventListener("deviceready", function() {

    // Actions

    let actionsList = $("#actions");
    if (actionsList.length === 0) return;

    let template = actionsList.find("#actions-template");
    actions.forEach(function (action, id) {
        let actionElement = template.clone();
        actionElement.removeAttr("id");

        // Populate the actions template here
        actionElement.attr("href", actionElement.attr("href") + id);
        actionElement.find(".name").html(action.name);

        actionElement.find(".delete").on("click", function(e){
            e.preventDefault();
            //TODO: Add a confirmation dialog
            removeAction(id);
            location.reload();
        });

        actionsList.append(actionElement);
    });

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