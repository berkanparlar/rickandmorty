import { View, Text } from 'react-native'
import React from 'react';
import CharacterList from './src/screen/CharacterList';
import EpisodeList from './src/screen/EpisodeList';
import FavList from './src/screen/FavList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='EpisodeList'>
        <Tab.Screen name="Bölüm" component={EpisodeList}/>
        <Tab.Screen name="Karakter" component={CharacterList}/>
        <Tab.Screen name="Fav" component={FavList}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App