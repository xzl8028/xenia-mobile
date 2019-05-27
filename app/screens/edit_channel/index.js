// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getCurrentChannel} from 'xenia-redux/selectors/entities/channels';
import {getCurrentTeamUrl} from 'xenia-redux/selectors/entities/teams';
import {patchChannel, getChannel} from 'xenia-redux/actions/channels';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import {setChannelDisplayName} from 'app/actions/views/channel';
import {getDimensions} from 'app/selectors/device';

import EditChannel from './edit_channel';

function mapStateToProps(state) {
    const {updateChannel: updateChannelRequest} = state.requests.channels;
    const channel = getCurrentChannel(state);
    const {deviceWidth, deviceHeight} = getDimensions(state);

    return {
        channel,
        currentTeamUrl: getCurrentTeamUrl(state),
        updateChannelRequest,
        theme: getTheme(state),
        deviceWidth,
        deviceHeight,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            patchChannel,
            getChannel,
            setChannelDisplayName,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChannel);
