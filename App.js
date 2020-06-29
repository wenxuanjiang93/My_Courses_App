import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Courses from './Screens/Courses';
import AddCourse from './Screens/AddCourse';
import Detail from './Screens/Detail';
import Schedule from './Screens/Schedule';


const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Courses,
      navigationOptions: { title: 'Courses' },
    },
    Detail: {
      screen: Detail,
      navigationOptions: { title: 'Detail' },
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

const TableStack = createStackNavigator(
  {
    Schedule: {
      screen: Schedule,
      navigationOptions: { title: 'Schedule' },
    }
  }
);

const Tabs = createBottomTabNavigator(
  {
    Courses: HomeStack,
    Add: AddStack,
    Schedule: TableStack,
  },
  {
    initialRouteName: 'Courses',
    defaultNavigationOptions: ({ navigation }) => ({

      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;

        let iconName;
        if (routeName === 'Courses') {
          //iconName = `ios-list`;
          iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-list`;
        } else if (routeName === 'Add') {
          //iconName = `ios-add`;
          iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-add`;
        } else if (routeName === 'Schedule') {
          //iconName = `ios-calendar`;
          iconName = `${Platform.OS === 'ios' ? 'ios' : 'md'}-calendar`;
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
          height: 45,
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

