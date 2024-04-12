$(document).ready(function() {
    // Function to display error icon and tooltip
    function showErrorIcon(inputElement, message) {
        let errorIcon = inputElement.next('.error-icon');
        errorIcon.find('img').attr('src', 'error_icon.png');
        errorIcon.find('.error-tooltip').text(message);
        errorIcon.show();
    }

    // Function to hide error icon and tooltip
    function hideErrorIcon(inputElement) {
        let errorIcon = inputElement.next('.error-icon');
        errorIcon.hide();
    }

    // Validate input fields on keyup event
    $('#taxCalculatorForm input[type="number"]').keyup(function() {
        let inputValue = $(this).val();

        // Check if input value is not a valid number
        if (isNaN(inputValue)) {
            showErrorIcon($(this), 'Please enter a valid number');
        } else {
            hideErrorIcon($(this));
        }
    });

    // Validate age dropdown on change event
    $('#age').change(function() {
        let selectedValue = $(this).val();

        if (!selectedValue) {
            showErrorIcon($(this), 'Age is required');
        } else {
            hideErrorIcon($(this));
        }
    });


    // Handle form submission
    $('#taxCalculatorForm').submit(function(e) {
        e.preventDefault();

        // Validate all input fields
        let isValid = true;

        $('#taxCalculatorForm input[type=""]').each(function() {
            let inputValue = parseFloat($(this).val()); // Parse input value as a float
            if (isNaN(inputValue)) {
                showErrorIcon($(this), 'Please enter a valid number');
                isValid = false;
            }
        });

        let ageValue = $('#age').val();
        if (!ageValue) {

            showErrorIcon($('#age'), 'Age is required');
            isValid = false;
        }

        if (isValid) {
            // Extract values from input fields
            let grossIncome = parseFloat($('#grossIncome').val());
            let extraIncome = parseFloat($('#extraIncome').val());
            let deductions = parseFloat($('#deductions').val());
            let ageCategory = $('#age').val();

            // Calculate taxable income
            let totalIncome = grossIncome + extraIncome - deductions;
            let taxableAmount = Math.max(totalIncome - 8, 0);

            // Determine tax rate based on age category
            let taxRate;
            if (ageCategory === '<40') {
                taxRate = 0.3;
            } else if (ageCategory === '>=40&<60') {
                taxRate = 0.4;
            } else if (ageCategory === '>=60') {
                taxRate = 0.1;
            } else {
                taxRate = 0; //Just added a else for the sake of else :)
            }

            // Calculate tax amount
            let taxAmount = taxableAmount * taxRate;

            // Display tax amount in modal
            $('#taxAmount').text(taxAmount.toFixed(2) + ' Lakhs'); // To display the tax amount with 2 decimal places

            // Show results modal
            $('#resultsModal').modal('show');

            // Reset form after displaying results
            $('#taxCalculatorForm')[0].reset();
        }else{
            alert('Please Enter Correct Values')
        }
    });
});
