import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
  Alert,
} from 'react-native';

import ChangeUserName from './ChangeUserName';
const App = ChangeUserName;
const App1: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {permissionsGranted ? '已授权' : '未授权'}
      </Text>
      <Button title="请求授权" onPress={askForPermissions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
