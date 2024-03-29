 /*
Error.store.js
This file defines the store functions for the Error module.

It stores the errors and warnings that are displayed in the UI.
*/
 
 const state = () => ({
    // Both warnings and errors are stored in this array. 
    errors: []
});

const getters = {
    // get all errors/warnings
    getErrors: state => state.errors,
};

const mutations = {
    // add new error to state
    addError: (state, error) => {
        // only add error object to state if it at least has a title and a message
        if(error && error.title && error.message) {
            // log error to console
            console.error(error);
            // push error on errors array in state
            state.errors.push(error);
            return;
        }
        // if error has no title or message, it is not a valid error object
        // in this case throw a prefabricated error
        const newError = {title: "Invalid Error/Warning Object", message: "Error object must have a title and message attribute.", subMessage: "Please contact a system administrator."};
        // log error to console
        console.error(newError);
        // push error on errors array in state
        state.errors.push(newError);
    },
    // clear errors array in state
    clearErrors: state => state.errors = []
};

export default { state, getters, mutations, namespaced: true };
