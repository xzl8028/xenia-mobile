// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {userTyping as wsUserTyping} from 'xenia-redux/actions/websocket';

export function userTyping(channelId, rootId) {
    return async (dispatch, getState) => {
        const {websocket} = getState().device;
        if (websocket.connected) {
            wsUserTyping(channelId, rootId)(dispatch, getState);
        }
    };
}
