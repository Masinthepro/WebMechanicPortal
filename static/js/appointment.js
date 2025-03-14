/**
 * ProMechanics - Appointment Form Handler
 * Author: ProMechanics Dev Team
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /**
     * Appointment form validation and submission
     */
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        // Add client-side validation
        appointmentForm.addEventListener('submit', function(event) {
            if (!validateAppointmentForm()) {
                event.preventDefault();
            }
        });

        // Initialize form fields
        initializeFormFields();
    }

    /**
     * Form field validation
     */
    function validateAppointmentForm() {
        let isValid = true;
        
        // Required fields
        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        const phone = document.querySelector('input[name="phone"]');
        const service = document.querySelector('select[name="service"]');
        const message = document.querySelector('textarea[name="message"]');
        
        // Reset previous errors
        removeErrors();
        
        // Validate name
        if (!name.value.trim()) {
            addError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!email.value.trim()) {
            addError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            addError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        if (!phone.value.trim()) {
            addError(phone, 'Please enter your phone number');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            addError(phone, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate service
        if (!service.value || service.value === '') {
            addError(service, 'Please select a service');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            addError(message, 'Please enter a message');
            isValid = false;
        }
        
        return isValid;
    }

    /**
     * Add error message to form field
     */
    function addError(field, message) {
        // Create error element
        const errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        errorElement.innerText = message;
        
        // Add error class to field
        field.classList.add('is-invalid');
        
        // Insert error message after field
        field.parentNode.appendChild(errorElement);
    }

    /**
     * Remove all error messages
     */
    function removeErrors() {
        const invalidFields = document.querySelectorAll('.is-invalid');
        const errorMessages = document.querySelectorAll('.invalid-feedback');
        
        invalidFields.forEach(field => {
            field.classList.remove('is-invalid');
        });
        
        errorMessages.forEach(message => {
            message.remove();
        });
    }

    /**
     * Validate email format
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone format (simple validation)
     */
    function isValidPhone(phone) {
        const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(phone);
    }

    /**
     * Initialize form fields with defaults and event listeners
     */
    function initializeFormFields() {
        // Get service from URL if any
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        // Set service dropdown if parameter exists
        if (serviceParam) {
            const serviceSelect = document.querySelector('select[name="service"]');
            if (serviceSelect) {
                // Check if option exists before setting
                const optionExists = Array.from(serviceSelect.options).some(option => option.value === serviceParam);
                if (optionExists) {
                    serviceSelect.value = serviceParam;
                }
            }
        }
        
        // Add input mask for phone number
        const phoneInput = document.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            });
        }
    }

    /**
     * Calculate and display business hours
     */
    function updateBusinessHours() {
        const businessHoursElement = document.getElementById('business-hours');
        if (!businessHoursElement) return;
        
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Business hours configuration
        const businessHours = {
            0: { open: false, label: 'Sunday' }, // Closed
            1: { open: [8, 0], close: [18, 0], label: 'Monday' }, // 8 AM - 6 PM
            2: { open: [8, 0], close: [18, 0], label: 'Tuesday' },
            3: { open: [8, 0], close: [18, 0], label: 'Wednesday' },
            4: { open: [8, 0], close: [18, 0], label: 'Thursday' },
            5: { open: [8, 0], close: [18, 0], label: 'Friday' },
            6: { open: [9, 0], close: [16, 0], label: 'Saturday' } // 9 AM - 4 PM
        };
        
        // Check if currently open
        let isOpen = false;
        if (businessHours[currentDay].open !== false) {
            const openTime = businessHours[currentDay].open[0] * 60 + businessHours[currentDay].open[1];
            const closeTime = businessHours[currentDay].close[0] * 60 + businessHours[currentDay].close[1];
            const currentTime = currentHour * 60 + currentMinute;
            
            isOpen = (currentTime >= openTime && currentTime < closeTime);
        }
        
        // Update status display
        const statusElement = document.getElementById('business-status');
        if (statusElement) {
            if (isOpen) {
                statusElement.innerHTML = '<span class="badge bg-success">Currently Open</span>';
            } else {
                statusElement.innerHTML = '<span class="badge bg-danger">Currently Closed</span>';
            }
        }
        
        // Update hours list
        const hoursListElement = document.getElementById('hours-list');
        if (hoursListElement) {
            let hoursHtml = '';
            
            for (let i = 1; i <= 6; i++) {
                const dayData = businessHours[i];
                const isToday = i === currentDay;
                
                let timeString;
                if (dayData.open === false) {
                    timeString = 'Closed';
                } else {
                    const openHour = dayData.open[0] > 12 ? dayData.open[0] - 12 : dayData.open[0];
                    const openAmPm = dayData.open[0] >= 12 ? 'PM' : 'AM';
                    const closeHour = dayData.close[0] > 12 ? dayData.close[0] - 12 : dayData.close[0];
                    const closeAmPm = dayData.close[0] >= 12 ? 'PM' : 'AM';
                    
                    timeString = `${openHour}:${dayData.open[1].toString().padStart(2, '0')} ${openAmPm} - ${closeHour}:${dayData.close[1].toString().padStart(2, '0')} ${closeAmPm}`;
                }
                
                hoursHtml += `
                    <li class="${isToday ? 'fw-bold' : ''}">
                        <span class="day">${dayData.label}${isToday ? ' (Today)' : ''}</span>
                        <span class="time">${timeString}</span>
                    </li>
                `;
            }
            
            // Add Sunday
            const sundayData = businessHours[0];
            const isSunday = 0 === currentDay;
            
            hoursHtml += `
                <li class="${isSunday ? 'fw-bold' : ''}">
                    <span class="day">${sundayData.label}${isSunday ? ' (Today)' : ''}</span>
                    <span class="time">Closed</span>
                </li>
            `;
            
            hoursListElement.innerHTML = hoursHtml;
        }
    }
    
    // Initialize business hours if present on page
    if (document.getElementById('business-hours')) {
        updateBusinessHours();
    }
});
