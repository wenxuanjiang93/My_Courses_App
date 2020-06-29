import React, { useState, useEffect } from 'react';
import { Text, View, Button, FlatList } from 'react-native';
// import data from '../assets/data';
import { useAsyncStorage } from '@react-native-community/async-storage';
import styled from 'styled-components/native';


const ListWrapper = styled(FlatList)`
  margin-vertical: 5%;
`;

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
    <View style={{ margin: 20 }}>
      <Text>{course.id} - {course.title}</Text>
      <Text>Instructor: {course.instructor} </Text>
      <Text>Location: {course.location} </Text>
      <Text>Days: {course.day.map((d) => d + " ")} </Text>
      <Text>Start Time: {course.startTimeHr} : {course.startTimeMin} </Text>
      <Text>End Time: {course.endTimeHr} : {course.endTimeMin} </Text>

    </View>
  );
}

function CourseList({ data }) {
  return (
    <ListWrapper
      data={data}
      renderItem={({ item }) =>
        <Item course={item} />
      }
      keyExtractor={course => course.id}
    />
  )
}