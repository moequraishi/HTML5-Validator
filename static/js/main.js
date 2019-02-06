// Form Element
document.querySelector('#myForm');

// All the inputs/select drop downs to validate
const validatedInputs =  document.querySelectorAll('input.validate-field, select.validate-field');

// Custom messages are set up here
// based on HTML5 attributes
const customMessages = {
    valueMissing: ' cannot be blank.',
    tooShort: ' is short a couple of characters, please try again.', 
    patternMismatch: ' field does not allow illegal characters, please try again.'
};

// Fetch the custom message based on the object vs the HTML5 validity error type
function getCustomMessage (type, validity) {
    if (validity.typeMismatch) {
        return customMessages[type + 'Mismatch']
    } else {
        for (let invalidKey in customMessages) {
            if (validity[invalidKey]) {
                return customMessages[invalidKey]
            }
        }
    }
}

// HTML5 Validation Function (to use where needed)
function validateInputs() {
    const validationErrorClass = 'validation-error';

    for (let i = 0;i < validatedInputs.length;i++) {
        let input = validatedInputs[i];

        function checkValidity (options) {
            const insertError = options.insertError;
            const parent = input.parentNode;
            const error = parent.querySelector('.' + validationErrorClass)
                || document.createElement('div');
            const label = input.previousElementSibling.textContent.toLowerCase();

            // If field is not valid, display error message, else remove error classes
            if (!input.validity.valid) {
                const message = label + getCustomMessage(input.type, input.validity) || input.validationMessage;

                error.className = validationErrorClass;
                error.textContent = message;

                if (insertError) {
                    parent.insertBefore(error, input.nextSibling);
                    parent.scrollIntoView();
                }

            } else {
                error.remove()
            }
        }
        input.addEventListener('input', function () {
            // We can only update the error or hide it on input.
            // Otherwise it will show when typing.
            checkValidity({insertError: false});
        });
        input.addEventListener('invalid', function (e) {
            // prevent showing the default display
            e.preventDefault();

            // We can also create the error in invalid.
            checkValidity({insertError: true});
        });
    }
}

// You can drop this function anywhere you want it to turn on the validation
// perhaps an Ajax/XHR reply.
validateInputs();


// For testing pursposes prevent form submission
myForm.addEventListener("submit", function(e) {
    e.preventDefault();
});