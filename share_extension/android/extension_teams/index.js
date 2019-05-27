// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {getMySortedTeamIds} from 'xenia-redux/selectors/entities/teams';

import {extensionSelectTeamId, getTeamChannels} from 'share_extension/android/actions';

import ExtensionTeams from './extension_teams';

function mapStateToProps(state) {
    return {
        teamIds: getMySortedTeamIds(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            extensionSelectTeamId,
            getTeamChannels,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtensionTeams);
