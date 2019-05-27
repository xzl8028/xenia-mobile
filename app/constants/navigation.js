// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import keyMirror from 'xenia-redux/utils/key_mirror';

const NavigationTypes = keyMirror({
    NAVIGATION_RESET: null,
    NAVIGATION_CLOSE_MODAL: null,
    NAVIGATION_NO_TEAMS: null,
    RESTART_APP: null,
    NAVIGATION_ERROR_TEAMS: null,
});

export default NavigationTypes;
