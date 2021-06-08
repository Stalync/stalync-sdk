let internalUserInteract = global.userInteract;

if(!internalUserInteract) {
    throw new Error("UserInteract internal undefined, probably the code not running in the stalync server or stalync is down.");
}

let basicDataType = [ "string", "number", "boolean" ];

/**
 * Interact let you send back the message to stalync server.
 */
class Interact {
    /**
     * Put your stalync credentials for specific application
     * the credentials located in stalync profile page.
     * @param {string} developerID
     * @param {string} applicationName
     */
    constructor(developerID, applicationName) {
        this.developerID = developerID;
        this.applicationName = applicationName;
    }

    /**
     * message will be sended to specified client id.
     * the last parameter (eventName) is the channel listened to receiver.
     * @param {string} clientID 
     * @param {string | number | boolean | Object} message 
     * @param {string=} eventName 
     */
    reply(clientID, message, eventName) {
        /** @type {string} */
        let convertedMessage;

        if(basicDataType.indexOf(typeof message) >= 0) {
            convertedMessage = String(message);
        } else if(!message) {
            convertedMessage = "";
        } else {
            convertedMessage = JSON.stringify(message);
        }

        if(!eventName) {
            eventName = "*";
        }

        internalUserInteract.reply(this.developerID, this.applicationName, clientID, eventName, convertedMessage);
    }
}

module.exports = {
    Interact,
};