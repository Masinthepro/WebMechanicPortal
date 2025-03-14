/**
 * ProMechanics - Service Price Calculator
 * Author: ProMechanics Dev Team
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Get calculator elements
    const calculateBtn = document.getElementById('calculate-btn');
    const vehicleTypeSelect = document.getElementById('vehicle-type');
    const serviceTypeSelect = document.getElementById('service-type');
    const additionalServices = document.querySelectorAll('.additional-service');
    const priceResult = document.getElementById('price-result');
    const calculatedPrice = document.getElementById('calculated-price');
    
    // Base service prices
    const servicePrices = {
        'oil-change': {
            'sedan': 39.99,
            'suv': 49.99,
            'truck': 59.99,
            'luxury': 69.99
        },
        'brake-service': {
            'sedan': 149.99,
            'suv': 179.99,
            'truck': 199.99,
            'luxury': 219.99
        },
        'tire-rotation': {
            'sedan': 29.99,
            'suv': 34.99,
            'truck': 39.99,
            'luxury': 44.99
        },
        'engine-diagnostics': {
            'sedan': 89.99,
            'suv': 99.99,
            'truck': 109.99,
            'luxury': 129.99
        },
        'tune-up': {
            'sedan': 179.99,
            'suv': 199.99,
            'truck': 219.99,
            'luxury': 249.99
        }
    };
    
    // Additional service prices
    const additionalServicePrices = {
        'filter-replacement': 19.99,
        'fluid-top-up': 14.99,
        'inspection': 24.99,
        'alignment-check': 29.99
    };
    
    // Calculate price function
    function calculatePrice() {
        const vehicleType = vehicleTypeSelect.value;
        const serviceType = serviceTypeSelect.value;
        let totalPrice = servicePrices[serviceType][vehicleType];
        
        // Add additional services
        additionalServices.forEach(service => {
            if (service.checked) {
                totalPrice += additionalServicePrices[service.value];
            }
        });
        
        // Apply premium vehicle surcharge for luxury vehicles
        if (vehicleType === 'luxury') {
            totalPrice *= 1.1; // 10% premium
        }
        
        // Update the price display
        calculatedPrice.textContent = `$${totalPrice.toFixed(2)}`;
        
        // Show the price result
        priceResult.classList.remove('d-none');
        
        // Scroll to the result
        priceResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Analytics tracking (if implemented)
        trackCalculatorUsage(vehicleType, serviceType, totalPrice);
    }
    
    // Analytics tracking function (placeholder)
    function trackCalculatorUsage(vehicleType, serviceType, price) {
        // This would be implemented with actual analytics in production
        console.log(`Calculator used: ${vehicleType} - ${serviceType} - $${price.toFixed(2)}`);
    }
    
    // Add event listener to calculate button
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculatePrice);
    }
    
    // Add event listeners to update calculation on change
    function addChangeListeners() {
        if (vehicleTypeSelect && serviceTypeSelect) {
            vehicleTypeSelect.addEventListener('change', function() {
                if (priceResult.classList.contains('d-none') === false) {
                    calculatePrice();
                }
            });
            
            serviceTypeSelect.addEventListener('change', function() {
                if (priceResult.classList.contains('d-none') === false) {
                    calculatePrice();
                }
            });
            
            additionalServices.forEach(service => {
                service.addEventListener('change', function() {
                    if (priceResult.classList.contains('d-none') === false) {
                        calculatePrice();
                    }
                });
            });
        }
    }
    
    // Initialize change listeners
    addChangeListeners();
    
    // Add price animation
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            obj.textContent = `$${currentValue.toFixed(2)}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.textContent = `$${end.toFixed(2)}`;
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Handle reset button if it exists
    const resetBtn = document.getElementById('reset-calculator');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Reset form
            vehicleTypeSelect.value = 'sedan';
            serviceTypeSelect.value = 'oil-change';
            
            additionalServices.forEach(service => {
                service.checked = false;
            });
            
            // Hide result
            priceResult.classList.add('d-none');
        });
    }
    
    // Service recommendations based on selection
    function updateRecommendations() {
        const recommendationsContainer = document.getElementById('service-recommendations');
        if (!recommendationsContainer) return;
        
        const vehicleType = vehicleTypeSelect.value;
        const serviceType = serviceTypeSelect.value;
        
        let recommendations = [];
        
        // Generate contextual recommendations
        if (serviceType === 'oil-change') {
            recommendations.push('Filter replacement is recommended with every oil change');
            recommendations.push('Consider a fluid check while your vehicle is being serviced');
        } else if (serviceType === 'brake-service') {
            recommendations.push('An alignment check ensures even wear after brake service');
            recommendations.push('Tire rotation optimizes brake performance and tire life');
        } else if (serviceType === 'tire-rotation') {
            recommendations.push('Alignment check is recommended with tire rotations');
            recommendations.push('Inspect brakes while wheels are removed for rotation');
        }
        
        // Display recommendations
        if (recommendations.length > 0) {
            let html = '<h5 class="mt-3">Recommended Additional Services:</h5><ul>';
            recommendations.forEach(rec => {
                html += `<li>${rec}</li>`;
            });
            html += '</ul>';
            recommendationsContainer.innerHTML = html;
            recommendationsContainer.classList.remove('d-none');
        } else {
            recommendationsContainer.classList.add('d-none');
        }
    }
    
    // Add event listeners for recommendations
    if (document.getElementById('service-recommendations')) {
        vehicleTypeSelect.addEventListener('change', updateRecommendations);
        serviceTypeSelect.addEventListener('change', updateRecommendations);
    }
});
