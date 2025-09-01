// Registration Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');

    // Password strength requirements
    const requirements = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        lowercase: document.getElementById('req-lowercase'),
        number: document.getElementById('req-number'),
        special: document.getElementById('req-special')
    };

    // Toggle password visibility
    function togglePasswordVisibility(inputField, toggleBtn) {
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        
        const icon = toggleBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }

    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        let requirementsMet = {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false,
            special: false
        };

        // Check length
        if (password.length >= 8) {
            strength += 20;
            requirementsMet.length = true;
        }

        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 20;
            requirementsMet.uppercase = true;
        }

        // Check for lowercase letters
        if (/[a-z]/.test(password)) {
            strength += 20;
            requirementsMet.lowercase = true;
        }

        // Check for numbers
        if (/[0-9]/.test(password)) {
            strength += 20;
            requirementsMet.number = true;
        }

        // Check for special characters
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            strength += 20;
            requirementsMet.special = true;
        }

        return { strength, requirementsMet };
    }

    // Update password strength indicator
    function updatePasswordStrength(password) {
        const { strength, requirementsMet } = checkPasswordStrength(password);
        
        // Update progress bar
        strengthBar.style.width = strength + '%';
        
        // Update progress bar color based on strength
        if (strength <= 20) {
            strengthBar.className = 'progress-bar bg-danger';
            strengthText.textContent = 'Very Weak';
        } else if (strength <= 40) {
            strengthBar.className = 'progress-bar bg-warning';
            strengthText.textContent = 'Weak';
        } else if (strength <= 60) {
            strengthBar.className = 'progress-bar bg-info';
            strengthText.textContent = 'Fair';
        } else if (strength <= 80) {
            strengthBar.className = 'progress-bar bg-primary';
            strengthText.textContent = 'Good';
        } else {
            strengthBar.className = 'progress-bar bg-success';
            strengthText.textContent = 'Strong';
        }

        // Update requirement indicators
        Object.keys(requirementsMet).forEach(req => {
            const element = requirements[req];
            const icon = element.querySelector('i');
            
            if (requirementsMet[req]) {
                icon.className = 'fas fa-check text-success me-1';
            } else {
                icon.className = 'fas fa-times text-danger me-1';
            }
        });
    }

    // Format CNIC input
    function formatCNIC(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length <= 5) {
            input.value = value;
        } else if (value.length <= 12) {
            input.value = value.slice(0, 5) + '-' + value.slice(5);
        } else {
            input.value = value.slice(0, 5) + '-' + value.slice(5, 12) + '-' + value.slice(12, 13);
        }
    }

    // Format mobile number input
    function formatMobileNumber(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length <= 4) {
            input.value = value;
        } else {
            input.value = value.slice(0, 4) + '-' + value.slice(4, 11);
        }
    }

    // Validate CNIC format
    function validateCNIC(cnic) {
        const cnicPattern = /^\d{5}-\d{7}-\d$/;
        return cnicPattern.test(cnic);
    }

    // Validate mobile number format
    function validateMobileNumber(mobile) {
        const mobilePattern = /^03\d{2}-\d{7}$/;
        return mobilePattern.test(mobile);
    }

    // Validate username format
    function validateUsername(username) {
        const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
        return usernamePattern.test(username);
    }

    // Event Listeners

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, togglePasswordBtn);
    });

    toggleConfirmPasswordBtn.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPasswordBtn);
    });

    // Password strength checking
    passwordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
    });

    // CNIC formatting
    const cnicInput = document.getElementById('cnic');
    cnicInput.addEventListener('input', function() {
        formatCNIC(this);
    });

    // Mobile number formatting
    const mobileInput = document.getElementById('mobileNumber');
    mobileInput.addEventListener('input', function() {
        formatMobileNumber(this);
    });

    // Real-time validation
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                validateField(this);
            }
        });
    });

    // Field validation function
    function validateField(field) {
        let isValid = true;
        const value = field.value.trim();

        // Remove existing validation classes
        field.classList.remove('is-valid', 'is-invalid');

        // Check if field is empty
        if (!value) {
            field.classList.add('is-invalid');
            return false;
        }

        // Specific field validations
        switch (field.id) {
            case 'fullName':
            case 'fatherName':
                if (value.length < 2) {
                    isValid = false;
                }
                break;
            
            case 'mobileNumber':
                if (!validateMobileNumber(value)) {
                    isValid = false;
                }
                break;
            
            case 'cnic':
                if (!validateCNIC(value)) {
                    isValid = false;
                }
                break;
            
            case 'username':
                if (!validateUsername(value)) {
                    isValid = false;
                }
                break;
            
            case 'password':
                const { strength } = checkPasswordStrength(value);
                if (strength < 60) {
                    isValid = false;
                }
                break;
            
            case 'confirmPassword':
                if (value !== passwordInput.value) {
                    isValid = false;
                }
                break;
        }

        // Add appropriate validation class
        if (isValid) {
            field.classList.add('is-valid');
        } else {
            field.classList.add('is-invalid');
        }

        return isValid;
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        const validationErrors = [];
        const requiredFields = form.querySelectorAll('input[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
                validationErrors.push(`${field.id}: ${field.value || 'empty'}`);
            }
        });

        // Check terms and conditions
        const termsCheck = document.getElementById('termsCheck');
        if (!termsCheck.checked) {
            termsCheck.classList.add('is-invalid');
            isFormValid = false;
            validationErrors.push('Terms and conditions not accepted');
        } else {
            termsCheck.classList.remove('is-invalid');
        }

        if (isFormValid) {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Add timestamp
            data.timestamp = new Date().toLocaleString();
            
            // Log form data
            console.log('Registration Data:', data);
            console.log('All fields validated successfully');
            
            // Send data to Formspree
            sendToFormspree(data);
        } else {
            // Show detailed error message
            console.log('Validation errors:', validationErrors);
            showErrorMessage(`Validation failed: ${validationErrors.join(', ')}`);
        }
    });

    // Reset password strength indicator
    function resetPasswordStrength() {
        strengthBar.style.width = '0%';
        strengthBar.className = 'progress-bar';
        strengthText.textContent = 'Password strength';
        
        Object.values(requirements).forEach(req => {
            const icon = req.querySelector('i');
            icon.className = 'fas fa-times text-danger me-1';
        });
    }

    // Success message
    function showSuccessMessage() {
        const successAlert = document.createElement('div');
        successAlert.className = 'alert alert-success alert-dismissible fade show position-fixed';
        successAlert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        successAlert.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Registration completed successfully.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successAlert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (successAlert.parentNode) {
                successAlert.remove();
            }
        }, 5000);
    }

    // Error message
    function showErrorMessage(message = 'Please fix the errors in the form.') {
        const errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
        errorAlert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        errorAlert.innerHTML = `
            <i class="fas fa-exclamation-circle me-2"></i>
            <strong>Error!</strong> ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(errorAlert);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorAlert.parentNode) {
                errorAlert.remove();
            }
        }, 5000);
    }

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading state to submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    form.addEventListener('submit', function() {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }, 2000);
    });

    // Initialize tooltips if Bootstrap is available
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Formspree Integration
    function sendToFormspree(data) {
        // Formspree endpoint URL
        const formspreeURL = 'https://formspree.io/f/xzzazwzo';
        
        // Debug: Log the data being sent
        console.log('Sending data to Formspree:', data);
        console.log('Formspree URL:', formspreeURL);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Method 1: Try with fetch (modern approach)
        const formData = new FormData();
        formData.append('fullName', data.fullName || '');
        formData.append('fatherName', data.fatherName || '');
        formData.append('mobileNumber', data.mobileNumber || '');
        formData.append('cnic', data.cnic || '');
        formData.append('username', data.username || '');
        formData.append('password', data.password || '');
        formData.append('timestamp', data.timestamp || '');
        formData.append('_subject', 'New Registration Form Submission');
        
        fetch(formspreeURL, {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('Formspree response status:', response.status);
            console.log('Formspree response ok:', response.ok);
            
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        })
        .then(responseData => {
            console.log('Formspree response data:', responseData);
            handleSuccess();
        })
        .catch(error => {
            console.error('Formspree Error:', error);
            // Fallback to traditional form submission
            console.log('Trying fallback method...');
            submitFormTraditional(data);
        })
        .finally(() => {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    }
    
    // Fallback method using traditional form submission
    function submitFormTraditional(data) {
        // Create a temporary form and submit it
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = 'https://formspree.io/f/xzzazwzo';
        tempForm.target = '_blank';
        
        // Add form fields
        const fields = ['fullName', 'fatherName', 'mobileNumber', 'cnic', 'username', 'password', 'timestamp'];
        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field;
            input.value = data[field] || '';
            tempForm.appendChild(input);
        });
        
        // Add Formspree specific fields
        const subjectInput = document.createElement('input');
        subjectInput.type = 'hidden';
        subjectInput.name = '_subject';
        subjectInput.value = 'New Registration Form Submission';
        tempForm.appendChild(subjectInput);
        
        // Submit the form
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
        
        // Show success message
        handleSuccess();
    }
    
    function handleSuccess() {
        // Show success message
        showSuccessMessage();
        
        // Reset form after successful submission
        setTimeout(() => {
            form.reset();
            resetPasswordStrength();
            form.querySelectorAll('.is-valid').forEach(field => {
                field.classList.remove('is-valid');
            });
        }, 3000);
    }
});

