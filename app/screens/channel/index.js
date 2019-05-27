// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {startPeriodicStatusUpdates, stopPeriodicStatusUpdates, logout} from 'xenia-redux/actions/users';
import {RequestStatus} from 'xenia-redux/constants';
import {getCurrentChannelId} from 'xenia-redux/selectors/entities/channels';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {shouldShowTermsOfService} from 'xenia-redux/selectors/entities/users';

import {
    loadChannelsIfNecessary,
    loadProfilesAndTeamMembersForDMSidebar,
    selectInitialChannel,
} from 'app/actions/views/channel';
import {connection} from 'app/actions/device';
import {recordLoadTime} from 'app/actions/views/root';
import {selectDefaultTeam} from 'app/actions/views/select_team';
import {isLandscape} from 'app/selectors/device';

import Channel from './channel';

function mapStateToProps(state) {
    const {myChannels: channelsRequest} = state.requests.channels;

    return {
        channelsRequestFailed: channelsRequest.status === RequestStatus.FAILURE,
        currentTeamId: getCurrentTeamId(state),
        currentChannelId: getCurrentChannelId(state),
        isLandscape: isLandscape(state),
        theme: getTheme(state),
        showTermsOfService: shouldShowTermsOfService(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            connection,
            loadChannelsIfNecessary,
            loadProfilesAndTeamMembersForDMSidebar,
            logout,
            selectDefaultTeam,
            selectInitialChannel,
            recordLoadTime,
            startPeriodicStatusUpdates,
            stopPeriodicStatusUpdates,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
