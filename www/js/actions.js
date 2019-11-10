/**
 * Actions is a list of JSON objects with key value pairs that describe the information in the action.
 *
 * Within the actions template, any class names that match a key in the JSON object will be filled in with the
 * value of that attribute.
 */
let actions = JSON.parse(localStorage.getItem("actions")) || [];
let superPush = actions.push.bind(actions);
actions.push = function(e){
    superPush(e);
    localStorage.setItem("actions", JSON.stringify(actions));
};
actions.remove = function(idx){
    actions.splice(idx);
    localStorage.setItem("actions", JSON.stringify(actions));
};

/**
 * Initializes the UI for the actions by iterating through the actions list and copying the
 * template for each action, then filling in the information on the copied template and appending
 * it to the list of actions.
 */
document.addEventListener("deviceready", function(){
    let actionsList = $("#actions");
    if(actionsList.length === 0) return;

    let template = actionsList.find("#actions-template");

    actions.forEach(function(action){
        let actionElement = template.clone();
        actionElement.removeAttr("id");

        // This just iterates through each attribute of an action and fills in the HTML of an element with
        // a class name matching the attribute.  If any special treatment of an attribute is needed, this
        // is where it should be done.
        for(let attribute in action){
            if(!action.hasOwnProperty(attribute)) continue;
            actionElement.find("." + attribute).html(action[attribute]);
        }

        actionsList.append(actionElement);
    });
});