import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { Redirect, Tabs } from "expo-router";
import { useState, useContext, useEffect } from 'react'
import AuthContext from './context/AuthContext';

const Welcome = () => {

  
  const { user } = useContext(AuthContext);

  if (user) return <Redirect href="/home" />;


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="relative mt-5">
            <Text className="text-secondary text-3xl text-white font-bold text-center">On My Way</Text>
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;