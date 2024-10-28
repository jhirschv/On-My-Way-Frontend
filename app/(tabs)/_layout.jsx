import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext';

const TabLayout = () => {

  const { user } = useContext(AuthContext);

  if (!user) return <Redirect href="/" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;