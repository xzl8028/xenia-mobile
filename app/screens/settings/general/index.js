// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {clearErrors} from 'xenia-redux/actions/errors';
import {getCurrentUrl, getConfig} from 'xenia-redux/selectors/entities/general';
import {getJoinableTeams} from 'xenia-redux/selectors/entities/teams';

import {purgeOfflineStore} from 'app/actions/views/root';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';
import {removeProtocol} from 'app/utils/url';

import Settings from './settings';

function mapStateToProps(state) {
    const config = getConfig(state);

    return {
        config,
        theme: getTheme(state),
        errors: state.errors,
        currentUserId: state.entities.users.currentUserId,
        currentTeamId: state.entities.teams.currentTeamId,
        currentUrl: removeProtocol(getCurrentUrl(state)),
        joinableTeams: getJoinableTeams(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearErrors,
            purgeOfflineStore,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
