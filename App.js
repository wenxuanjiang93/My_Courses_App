import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Courses from './Screens/Courses';
import AddCourse from './Screens/AddCourse';


const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Courses,
      navigationOptions: { title: 'Courses' },
    },
  }
);

const AddStack = createStackNavigator(
  {
    AddCourse: {
      screen: AddCourse,
      navigationOptions: { title: 'Add Course' },
    },
  }
);

const Tabs = createBottomTabNavigator(
  {
    Courses: HomeStack,
    Add: AddStack,
  },
  {
    initialRouteName: 'Courses',
    defaultNavigationOptions: ({ navigation }) => ({

      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName;
        if (routeName === 'Courses') {
          iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-list`;
        } else if (routeName === 'Add') {
          iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-add`;
        }

        return (
          <>
            <Ionicons name={iconName}
              size={horizontal ? 30 : 30}
              color={tintColor}
            />
          </>
        );
      },
      tabBarOptions: {
        activeTintColor: '#Cf3838',
        inactiveTintColor: '#E1E3DB',
        style: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 60,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F2F3EF'
        },
      },
    }),
  }
);

const AppContainer = createAppContainer(Tabs);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

