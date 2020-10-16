export default function App() {
    const [permissionsGranted, setPermissionsGranted] = React.useState(false);
    function askForPermissions() {
      
      const PERMISSIONS = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //  PermissionsAndroid.PERMISSIONS.CAMERA,
      ];
      //一次学习，随处编写
      if (Platform.OS === 'android') {
        //Alert.alert("test alert");
        PermissionsAndroid.requestMultiple(PERMISSIONS).then((results) => {
          Alert.alert(JSON.stringify(results));
          const allPermissionsGranted = Object.values(results).every(
            (result) => result === 'granted'
          );
          if (allPermissionsGranted) {
            setPermissionsGranted(true);
          }
        });
      } else {
        setPermissionsGranted(true);
      }
    }