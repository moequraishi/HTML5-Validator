// Form Element
document.querySelector('#myForm');

// All the inputs/select drop downs to validate
const validatedInputs =  document.querySelectorAll('input.validate-field, select.validate-field');

// Custom messages are set up here
// based on HTML5 attributes
const customMessages = {
    badInput: ' believes you are bad, please fix yourself!',
    valueMissing: ' cannot be blank. We needz your data!!',
    tooShort: ' is too short in characters, add more!', 
    tooLong: ' has too many characters bud, shorten it up!',
    patternMismatch: ' does not allow illegal characters, you have been temporarily denied entry to this form until you provide legal data work.',
    typeMismatch: ' denied you because you\'re not it\'s type. Change your type and you may have a chance ;)'
};

// Fetch the custom message based on the object vs the HTML5 validity error type
function getCustomMessage (type, validity) {
    for (let invalidKey in customMessages) {
        if (validity[invalidKey]) {
            return customMessages[invalidKey]
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

                // Insert error to page, scroll to error.
                // In case of multiple errors, it will scroll to top most
                if (insertError) {
                    parent.insertBefore(error, input.nextSibling);
                    parent.scrollIntoView();
                }

            } else {
                // If form is valid, remove errors.
                error.remove();
            }
        }
        
        // We can only update the error or hide it on input.
        // Otherwise it will show when typing.
        input.addEventListener('input', function () {
            
            checkValidity({insertError: false});
        });

        // We can also create the error in invalid.
        input.addEventListener('invalid', function (e) {
            // prevent showing the default error
            e.preventDefault();

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
    let firstName = "",
        lastName = "",
        email = "",
        gender = "",
        html = "";

    for(let i=0; i < validatedInputs.length; i++) {
        let inputVal = validatedInputs[i].value;
        let tempLabel = validatedInputs[i].previousElementSibling.textContent;
        
        if (tempLabel === 'First Name') {
            firstName = validatedInputs[i].value;
        } else if (tempLabel === 'Last Name') {
            lastName = validatedInputs[i].value;
        } else if (tempLabel === 'Email') {
            email = validatedInputs[i].value;
        } else if (tempLabel === 'Gender') {
            gender = validatedInputs[i].value;
        }
    }

    let userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender
    }

    console.log(userData);

    html += '<h2>Submitted values: </h2>';
    html += '<p><strong>First name:</strong> '+ userData.firstName + '</p>';
    html += '<p><strong>Last name:</strong> '+ userData.lastName + '</p>';
    html += '<p><strong>Email address:</strong> '+ userData.email + '</p>';
    html += '<p><strong>Gender:</strong> '+ userData.gender + '</p>';

    document.querySelector('.data-text').innerHTML = html;
    document.querySelector('.data-text').style = "display: block";
});