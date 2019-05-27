// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {UserTypes} from 'xenia-redux/action_types';
import {General} from 'xenia-redux/constants';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';

export function setCurrentUserStatusOffline() {
    return (dispatch, getState) => {
        const currentUserId = getCurrentUserId(getState());

        return dispatch({
            type: UserTypes.RECEIVED_STATUS,
            data: {
                user_id: currentUserId,
                status: General.OFFLINE,
            },
        });
    };
}
