import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ScrollView, Button, TextInput, FlatList } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';


const ScrollWrapper = styled(ScrollView)`
  background-color: #fff;
`;

const FormWrapper = styled(View)`

  margin: 10%;
  background-color: #fff;
  align-items: stretch;
  justify-content: center;
`;

const InputWrapper = styled(View)`
  margin-bottom: 2%;
  background-color: #fff;
  align-items: stretch;
  justify-content: center;
`;

const LabelText = styled(Text)`
  margin-bottom: 1%;
`;

const InputBox = styled(TextInput)`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 15px;
`;

export default function AddCourse({ navigation }) {

  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [instructor, setProf] = useState("");
  const [location, setLoc] = useState("");
  const [day, setDay] = useState([]);
  const [startTimeHr, setStartHr] = useState("");
  const [startTimeMin, setStartMin] = useState("");
  const [endTimeHr, setEndHr] = useState("");
  const [endTimeMin, setEndMin] = useState("");

  const [courseList, setList] = useState([])

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('CourseList', JSON.stringify(courseList))
      alert('Have to press add course twice then reload the home page to see change')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  const getData = async () => {
    try {
      const courseList = await AsyncStorage.getItem('CourseList')
      if (courseList !== null) {
        setList(JSON.parse(courseList))
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleForm = () => {
    const course = {
      id: id,
      title: title,
      location: location,
      instructor: instructor,
      day: day,
      startTimeHr: startTimeHr,
      startTimeMin: startTimeMin,
      endTimeHr: endTimeHr,
      endTimeMin: endTimeMin,
      selected: true,
    }

    setList(courseList.concat(course))
    storeData(courseList)
  }

  return (
    <ScrollWrapper>
      <FormWrapper>
        <InputWrapper>
          <LabelText>Course ID:</LabelText>
          <InputBox
            maxLength={10}
            onChangeText={text => setID(text)}
          />
        </InputWrapper>

        <InputWrapper>
          <LabelText>Course Title:</LabelText>
          <InputBox
            onChangeText={text => setTitle(text)}
          />
        </InputWrapper>

        <InputWrapper>
          <LabelText>Instructor:</LabelText>
          <InputBox
            onChangeText={text => setProf(text)}
          />
        </InputWrapper>

        <InputWrapper>
          <LabelText>Location:</LabelText>
          <InputBox
            onChangeText={text => setLoc(text)}
          />
        </InputWrapper>

        <InputWrapper>
          <LabelText>Day:</LabelText>
          <MultiSelect
            hideTags
            items={[{ id: "MON", name: "MON" }, { id: "TUE", name: "TUE" }, { id: "WED", name: "WED" }, { id: "THU", name: "THU" }, { id: "FRI", name: "FRI" }]}
            uniqueKey="id"
            selectedItems={day}
            onSelectedItemsChange={(selectedDays) => setDay(selectedDays)}
            submitButtonColor="blue"
            submitButtonText="Add days"
          />
        </InputWrapper>

        <InputWrapper>
          <LabelText>Start time:</LabelText>
          <View style={{ flexDirection: 'row' }}>
            <InputBox
              style={{ width: 50 }}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setStartHr(text)}
            />
            <Text style={{ fontSize: 30 }}> : </Text>
            <InputBox
              style={{ width: 50 }}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setStartMin(text)}
            />
          </View>
        </InputWrapper>

        <InputWrapper>
          <LabelText>End time:</LabelText>
          <View style={{ flexDirection: 'row' }}>
            <InputBox
              style={{ width: 50 }}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setEndHr(text)}
            />
            <Text style={{ fontSize: 30 }}> : </Text>
            <InputBox
              style={{ width: 50 }}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setEndMin(text)}
            />
          </View>
        </InputWrapper>

        <InputWrapper>
          <Button
            title="Add course"
            onPress={handleForm}
          />
        </InputWrapper>
      </FormWrapper>
    </ScrollWrapper>
  );
}

