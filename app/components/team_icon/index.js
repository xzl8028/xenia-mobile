// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getTeam} from 'xenia-redux/selectors/entities/teams';
import {getTheme} from 'xenia-redux/selectors/entities/preferences';

import TeamIcon from './team_icon';

function mapStateToProps(state, ownProps) {
    return {
        team: getTeam(state, ownProps.teamId),
        theme: getTheme(state),
    };
}

export default connect(mapStateToProps)(TeamIcon);
