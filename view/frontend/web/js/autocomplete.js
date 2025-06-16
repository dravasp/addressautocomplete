/**
 *
 * Sentinnel One
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/osl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@magentocommerce.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade Magento to newer
 * versions in the future. If you wish to customize Magento for your
 * needs please refer to http://www.magentocommerce.com for more information.
 *
 * Magento OS Commerce - Google Places API Address Autocomplete
 *
 * @category  Sentinnel One
 * @package   Magento_AddressAutoComplete
 * @copyright Copyright (c) 2025 WE SKY PRINT LLP (https://weskyprint.com)
 * @license   http://opensource.org/licenses/osl-3.0.php Open Software License (OSL 3.0)
 * @author    Sentinnel One Team hello@weskyprint.com
 * @link      https://github.com/dravasp/secvul/tree/main
 */
/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 *
*/

define(['jquery'], function ($) {
    var apiKey = window.checkoutConfig.address_autocomplete.api_key;

    if (apiKey) {
        var autocomplete;

        function initAutocomplete() {
            var input = document.getElementById('street_1');
            autocomplete = new google.maps.places.Autocomplete(input, { types: ['geocode'] });
            autocomplete.addListener('place_changed', fillInAddress);
        }

        function fillInAddress() {
            var place = autocomplete.getPlace();
            // Handle filling in address fields
        }

        // Load Google Maps API
        var script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&libraries=places&callback=initAutocomplete';
        
        // Error handling for script loading
        script.onerror = function () {
            console.error("`API .js Error`: `Failed to Load` - Trace Technical Error Code - Check Billing Status / Apply Verified Domain / API Key Usage - Check Quota - Rate Limits IP Firewall Block ://localhost:8080 / Rectify Parameters / Seek Community Help");
        };

        document.head.appendChild(script);
    }
});
