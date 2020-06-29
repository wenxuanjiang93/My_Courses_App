import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ScrollView, Button, TextInput, FlatList } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import styled from 'styled-components/native';
// import AsyncStorage from '@react-native-community/async-storage';
import { useAsyncStorage } from '@react-native-community/async-storage';

const ScrollWrapper = styled(ScrollView)`
  margin-vertical: 5%;
`;

const FormWrapper = styled(View)`
  margin-horizontal: 10%;
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

  const [courseList, setList] = useState([])
  const { getItem, setItem } = useAsyncStorage('CourseList');

  const getData = async () => {
    const item = await getItem();
    setList(JSON.parse(item) || courseList);
  };

  const storeData = async newList => {
    await setItem(JSON.stringify(newList)).then(Alert.alert("Course Added"));
  };

  useEffect(() => {
    getData();
  }, []);

  const addCourseToList = (course) => {
    setList(courseList.concat(course))
    storeData(courseList)
  }

  // const storeData = async (value) => {
  //   try {
  //     await AsyncStorage.setItem('CourseList', JSON.stringify(value))
  //     Alert.alert("Course Added")
  //   } catch (e) {
  //     Alert.alert("Error")
  //   }
  // }


  return (
    <View>
      <AddCourseForm addCourseToList={addCourseToList} />
    </View>
  );
}

function AddCourseForm({ addCourseToList }) {

  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [instructor, setProf] = useState("");
  const [location, setLoc] = useState("");
  const [day, setDay] = useState([]);
  const [startTimeHr, setStartHr] = useState(0);
  const [startTimeMin, setStartMin] = useState(0);
  const [endTimeHr, setEndHr] = useState(0);
  const [endTimeMin, setEndMin] = useState(0);

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

    addCourseToList(course)
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
            items={[{ id: "1", name: "MON" }, { id: "2", name: "TUE" }, { id: "3", name: "WED" }, { id: "4", name: "THU" }, { id: "5", name: "FRI" }]}
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
            <TextInput
              style={{ borderColor: 'black', borderWidth: 1, width: 100 }}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setStartHr(parseInt(text))}
            />
            <TextInput
              style={{ borderColor: 'black', borderWidth: 1, width: 100 }}
              keyboardType="numeric"
              maxLength={2}
              onChangeText={text => setStartMin(parseInt(text))}
            />
          </View>
        </InputWrapper>

        <InputWrapper>
          <LabelText>End time:</LabelText>
          <TextInput
            style={{ borderColor: 'black', borderWidth: 1, width: 100 }}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={text => setEndHr(parseInt(text))}
          />
          <TextInput
            style={{ borderColor: 'black', borderWidth: 1, width: 100 }}
            keyboardType="numeric"
            maxLength={2}
            onChangeText={text => setEndMin(parseInt(text))}
          />
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

