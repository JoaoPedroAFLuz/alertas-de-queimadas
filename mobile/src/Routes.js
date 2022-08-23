import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';

import { Feed } from './screens/Feed';
import { Detalhes } from './screens/Detalhes';
import { Registro } from './screens/Registro';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            title: 'Alertas',
            headerRight: () => Registrar(),
          }}
        />
        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{ title: 'Detalhes' }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ title: 'Registro' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Registrar() {
  const navigation = useNavigation();
  return (
    <Icon.Button
      name="pluscircleo"
      color="#00a819"
      backgroundColor="#fff"
      size={25}
      onPress={() => navigation.navigate('Registro')}
    />
  );
}
