// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import DeviceInfo from 'react-native-device-info';

import {DEFAULT_LOCALE} from 'xenia-redux/constants/general';
import {getCurrentUserLocale} from 'xenia-redux/selectors/entities/i18n';

// Not a proper selector since the device locale isn't in the redux store
export function getCurrentLocale(state) {
    const deviceLocale = DeviceInfo.getDeviceLocale().split('-')[0];
    const defaultLocale = deviceLocale || DEFAULT_LOCALE;

    return getCurrentUserLocale(state, defaultLocale);
}
