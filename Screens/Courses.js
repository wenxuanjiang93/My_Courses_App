import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
// import data from '../assets/data';
import { useAsyncStorage } from '@react-native-community/async-storage';

export default function Courses({ navigation }) {

  const [data, setData] = useState([]);
  const { getItem, setItem } = useAsyncStorage('CourseList');

  const getData = async () => {
    const item = await getItem();
    setData(JSON.parse(item) || data);
  };

  const writeItemToStorage = async newList => {
    await setItem(JSON.stringify(newList));
    setData(newList);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <CourseList data={data} />
  );
}


function Item({ course }) {
  return (
    <View>
      <Text>{course.id} - {course.title}</Text>
      <Text>Instructor: {course.instructor} </Text>
      <Text>Location: {course.location} </Text>
    </View>
  );
}

function CourseList({ data }) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) =>
        <Item course={item} />
      }
      keyExtractor={course => course.id}
    />
  )
}