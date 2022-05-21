import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Feed } from './screens/Feed';
import { Detalhes } from './screens/Detalhes';

const Stack = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{ title: 'Alertas' }}
        />
        <Stack.Screen
          name="Detalhes"
          component={Detalhes}
          options={{ title: 'Detalhes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
