// Copyright (c) 2015-present Xenia, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';

import {getCustomEmojisByName} from 'xenia-redux/selectors/entities/emojis';
import {getCurrentUserId} from 'xenia-redux/selectors/entities/users';
import {getConfig} from 'xenia-redux/selectors/entities/general';
import {Client4} from 'xenia-redux/client';
import {isMinimumServerVersion} from 'xenia-redux/utils/helpers';

import {EmojiIndicesByAlias, Emojis} from 'app/utils/emojis';

import Emoji from './emoji';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);
    const emojiName = ownProps.emojiName;
    const customEmojis = getCustomEmojisByName(state);

    let imageUrl = '';
    let isCustomEmoji = false;
    let displayTextOnly = false;
    if (EmojiIndicesByAlias.has(emojiName)) {
        const emoji = Emojis[EmojiIndicesByAlias.get(emojiName)];
        imageUrl = Client4.getSystemEmojiImageUrl(emoji.filename);
    } else if (customEmojis.has(emojiName)) {
        const emoji = customEmojis.get(emojiName);
        imageUrl = Client4.getCustomEmojiImageUrl(emoji.id);
        isCustomEmoji = true;
    } else {
        displayTextOnly = state.entities.emojis.nonExistentEmoji.has(emojiName) ||
            config.EnableCustomEmoji !== 'true' ||
            config.ExperimentalEnablePostMetadata === 'true' ||
            getCurrentUserId(state) === '' ||
            !isMinimumServerVersion(Client4.getServerVersion(), 4, 7);
    }

    return {
        imageUrl,
        isCustomEmoji,
        displayTextOnly,
    };
}

export default connect(mapStateToProps)(Emoji);
