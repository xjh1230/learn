import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    PermissionsAndroid,
    Platform,
    Button,
    Alert,
    TextInput,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import App from './9-layout'
import App from './movie-seat'
// const App1: () => React$Node = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>
//         {permissionsGranted ? '已授权' : '未授权'}
//       </Text>
//       <Button title="请求授权" onPress={askForPermissions} />
//     </View>
//   );
// };

 


function HomeScreen({navigation}) {
  const [userName, setUserName] = React.useState('');
  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20}}>当前用户名：{userName}</Text>
      <Button
        title="修改用户名"
        onPress={() => navigation.navigate('UserName', {userName, setUserName})}
      />
    </View>
  );
}

function UserNameScreen({navigation, route}) {
  const {userName, setUserName} = route.params;
  const [currentUserName, setCurrentUserName] = React.useState(userName);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={currentUserName}
        onChangeText={setCurrentUserName}
      />
      <Button
        title="确定"
        onPress={() => {
          setUserName(currentUserName);
          navigation.goBack();
        }}
      />
    </View>
  );
}

const Stack = createStackNavigator();

 function ChangeUserName() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserName" component={UserNameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        height: 40,
        width:200,
    },
});