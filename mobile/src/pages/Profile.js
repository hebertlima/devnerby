import React from 'react';
import { WebView } from 'react-native-webview';

export default function Profile({ navigation }) {
    const gitHubUsername = navigation.getParam('github_username');
    return <WebView source={{ uri: `https://github.com/${gitHubUsername}` }} style={{ flex: 1 }} />
}