// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {setChannelDisplayName} from 'app/actions/views/channel';
import {makeDirectChannel, makeGroupChannel} from 'app/actions/views/more_dms';

import {getProfiles, getProfilesInTeam, searchProfiles} from 'xenia-redux/actions/users';
import {General} from 'xenia-redux/constants';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {getTeammateNameDisplaySetting, getTheme} from 'xenia-redux/selectors/entities/preferences';
import {getCurrentTeamId} from 'xenia-redux/selectors/entities/teams';
import {getCurrentUserId, getUsers} from 'xenia-redux/selectors/entities/users';

import MoreDirectMessages from './more_dms';

function mapStateToProps(state) {
    const config = getConfig(state);
    const restrictDirectMessage = config.RestrictDirectMessage === General.RESTRICT_DIRECT_MESSAGE_ANY;

    return {
        restrictDirectMessage,
        teammateNameDisplay: getTeammateNameDisplaySetting(state),
        allProfiles: getUsers(state),
        theme: getTheme(state),
        currentDisplayName: state.views.channel.displayName,
        currentUserId: getCurrentUserId(state),
        currentTeamId: getCurrentTeamId(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            makeDirectChannel,
            makeGroupChannel,
            getProfiles,
            getProfilesInTeam,
            searchProfiles,
            setChannelDisplayName,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreDirectMessages);
