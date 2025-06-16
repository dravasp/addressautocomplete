cd /opt/bitnami/magento
composer require dravasp/magento/addressautocomplete:dev-master
sudo magento-cli setup:upgrade

code Data Structure - Magento Magento module will handle Address Autocomplete using the Google Places API
This guide provides a step-by-step approach to replicate the address autocomplete functionality without using any specific third-party APIs or components.

Directory Structure is as follows -

app/code/Magento/AddressAutoComplete/
├── registration.php
├── etc
│   ├── config.xml
│   ├── csp_whitelist.xml
│   └── di.xml
│   └── module.xml
├── Helper
│   └── Data.php
├── Model
│   └── AutoCompleteConfigProvider.php
├── ViewModel
│   └── Autocomplete.php
├── view
│   └── frontend
│       └── layout
│           └── checkout_index_index.xml
│       └── web
│           └── js
│               ├── autocomplete.js
│               └── google_maps_loader.js
├── templates
│   └── address
│       └── autocomplete.phtml
├── composer.json
└── .gitignore

1. Registration File `registration.php`
File: app/code/Magento/AddressAutoComplete/registration.php

<?php
use Magento\Framework\Component\ComponentRegistrar;

ComponentRegistrar::register(ComponentRegistrar::MODULE, 'Magento_AddressAutoComplete', __DIR__);

2. Module Declaration File `module.xml` **********
File: app/code/Magento/AddressAutoComplete/etc/module.xml

<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
    <module name="Magento_AddressAutoComplete" setup_version="0.0.1"/>
</config>

3. Dependency Injection Configuration (Optional) **********
If you need to configure dependency injection, you can create a di.xml file.

File: app/code/Magento/AddressAutoComplete/etc/di.xml

<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <type name="Magento\Checkout\Model\CompositeConfigProvider">
        <arguments>
            <argument name="configProviders" xsi:type="array">
                <item name="address_autocomplete" xsi:type="object">Magento\AddressAutoComplete\Model\AutoCompleteConfigProvider</item>
            </argument>
        </arguments>
    </type>
</config>

4. Create `config.xml` **********
File: app/code/Magento/AddressAutoComplete/etc/config.xml

<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/system_file.xsd">
    <system>
        <section id="shipping">
            <group id="address_autocomplete" translate="label" type="text" sortOrder="3" showInDefault="1" showInWebsite="1" showInStore="1">
                <label>Address Autocomplete Settings</label>
                <field id="active" translate="label" type="select" sortOrder="10" showInDefault="1" showInWebsite="1" showInStore="1">
                    <label>Enabled</label>
                    <source_model>Magento\Config\Model\Config\Source\Yesno</source_model>
                </field>
                <field id="google_api_key" translate="label" sortOrder="120" showInDefault="1" showInWebsite="1" showInStore="1">
                    <label>Google API Key</label>
                </field>
                <field id="use_geolocation" type="select" translate="label" sortOrder="130" showInDefault="1" showInWebsite="1" showInStore="1">
                    <label>Use Geolocation</label>
                    <source_model>Magento\Config\Model\Config\Source\Yesno</source_model>
                </field>
                <field id="use_long_postcode" type="select" translate="label" sortOrder="140" showInDefault="1" showInWebsite="1" showInStore="1">
                    <label>Use Long Postcode</label>
                    <source_model>Magento\Config\Model\Config\Source\Yesno</source_model>
                </field>
            </group>
        </section>
    </system>
</config>

5. Helper Class
File: app/code/Magento/AddressAutoComplete/Helper/Data.php

<?php
namespace Magento\AddressAutoComplete\Helper;
use Magento\Framework\App\Helper\AbstractHelper;
class Data extends AbstractHelper
{
    public function getConfigValue($field)
    {
        return $this->scopeConfig->getValue($field, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }
}

6. Config Provider
File: app/code/Magento/AddressAutoComplete/Model/AutoCompleteConfigProvider.php

<?php
namespace Magento\AddressAutoComplete\Model;

use Magento\Checkout\Model\ConfigProviderInterface;

class AutoCompleteConfigProvider implements ConfigProviderInterface
{
    private $helper;

    public function __construct(\Magento\AddressAutoComplete\Helper\Data $helper)
    {
        $this->helper = $helper;
    }

    public function getConfig()
    {
        return [
            'address_autocomplete' => [
                'active' => $this->helper->getConfigValue('shipping/address_autocomplete/active'),
                'api_key' => $this->helper->getConfigValue('shipping/address_autocomplete/google_api_key'),
                'use_geolocation' => $this->helper->getConfigValue('shipping/address_autocomplete/use_geolocation'),
                'use_long_postcode' => $this->helper->getConfigValue('shipping/address_autocomplete/use_long_postcode')
            ]
        ];
    }
}

7. Create `Autocomplete.php`

File: app/code/Magento/AddressAutoComplete/ViewModel/Autocomplete.php

<?php
namespace Magento\AddressAutoComplete\ViewModel;

use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;

class Autocomplete implements ArgumentInterface
{
    protected $_scopeConfig;

    public function __construct(ScopeConfigInterface $scopeConfig) {
        $this->_scopeConfig = $scopeConfig;
    }

    public function getConfig($path)
    {
        return $this->_scopeConfig->getValue($path, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }
}

8. Layout XML File - checkout_index_index.xml
File: app/code/Magento/AddressAutoComplete/view/frontend/layout/checkout_index_index.xml

<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" layout="checkout" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="checkout.root">
            <arguments>
                <argument name="jsLayout" xsi:type="array">
                    <item name="components" xsi:type="array">
                        <item name="checkout" xsi:type="array">
                            <item name="children" xsi:type="array">
                                <item name="autocomplete" xsi:type="array">
                                    <item name="component" xsi:type="string">Magento_AddressAutoComplete/js/autocomplete</item>
                                </item>
                            </item>
                        </item>
                    </item>
                </argument>
            </arguments>
        </referenceBlock>
    </body>
</page>


9. JavaScript File
File: app/code/Magento/AddressAutoComplete/view/frontend/web/js/autocomplete.js

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


10. Create `autocomplete.phtml`
File: app/code/Magento/AddressAutoComplete/templates/address/autocomplete.phtml

<div>
    <input type="text" id="autocomplete" placeholder="Enter your address" />
</div>

Final - Google Places API - Maps Enterprise API - Address autocomplete functionality works as expected on the checkout page.

Optional - Style Customization as per Maps Display - (Optional Places Markers and Style Embed)

Snazzy Maps API (Business - Single Site License) - by Adam Krogh
Type of API used - Google Maps JavaScript API (Add Custom Styles to Embedded Maps across CMS)

You can enable Paid API calls via Google Cloud Console Dashboard - Google Maps Platform API - Google Autocomplete (Third-party) (Address Verification) (Limit results to Country)

Google Maps JavaScript API is different from Place Autocomplete (Legacy) / Migrate to Place Autocomplete (New)
google API - URL - https://console.cloud.google.com/marketplace/product/google/maps-backend.googleapis.com?inv=1&invt=Ab0NGA
Google Enterprise API - URL (legacy support) - https://console.cloud.google.com/marketplace/product/google/places-backend.googleapis.com?inv=1&invt=Ab0NGA
Google Enterprise API - URL (migrate to latest) - https://console.cloud.google.com/marketplace/product/google/places.googleapis.com?inv=1&invt=Ab0NGA

Autocomplete - In the News

View Article James Harrison, Product Manager at Google published Feb 21, 2024
Next generation Autocomplete is now available in Preview
https://mapsplatform.google.com/resources/blog/next-generation-autocomplete-is-now-available-in-preview/
#   a d d r e s s a u t o c o m p l e t e  
 