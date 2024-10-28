import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import apiClient from '../services/apiClient';

export default function create() {

    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")

    function createTask() {
        apiClient.post('/tasks/', {
            task_name: taskName,
            description: description
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    return (
        <SafeAreaView className="bg-primary flex-1 flex px-4">
        <FormField
            title="Task name"
            value={taskName}
            handleChangeText={(e) => setTaskName(e)}
            otherStyles="mt-7"
          />
        <FormField
            title="Description"
            value={description}
            handleChangeText={(e) => setDescription(e)}
            otherStyles="mt-7"
          />
        <FormField
            title="Deadline"
            otherStyles="mt-7"
          />
        <FormField
            title="Starting Bid"
            otherStyles="mt-7"
          />
          <CustomButton
            title="Select Location"
            containerStyles="mt-7 bg-slate-800"
            textStyles="text-white"
          />
          <CustomButton
            title="Create Task"
            handlePress={createTask}
            containerStyles="mt-7"
          />
        </SafeAreaView>
      );
}