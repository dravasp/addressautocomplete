<?php
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

namespace Magento\AddressAutoComplete\Model;

use Magento\Checkout\Model\ConfigProviderInterface;

class AutoCompleteConfigProvider implements ConfigProviderInterface
{
    private $helper;

    public function __construct(
        \Magento\AddressAutoComplete\Helper\Data $helper
    ) {
        $this->helper = $helper;
    }

    public function getConfig()
    {
        $config = []; // Initialize an empty config array

        // You can add other configurations here if needed

        return $config;
    }
}
