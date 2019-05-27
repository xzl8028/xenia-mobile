// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {NavigationTypes} from 'app/constants';
import {UserTypes} from 'xenia-redux/action_types';
import EventEmitter from 'xenia-redux/utils/event_emitter';

export default function(state = '', action) {
    switch (action.type) {
    case UserTypes.LOGOUT_SUCCESS:
        setTimeout(() => {
            EventEmitter.emit(NavigationTypes.NAVIGATION_RESET);
        });
        break;
    }

    return state;
}
