import { useState, useContext } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions} from "react-native";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import AuthContext from '../context/AuthContext'
import apiClient from '../services/apiClient';
import { jwtDecode } from 'jwt-decode';


const SignIn = () => {

  let {loginUser, setUser, setAuthTokens} = useContext(AuthContext)

  const handleSubmit = async () => {
    const { username, password } = form;

    if (!username || !password) {
      Alert.alert('Missing Fields', 'Please enter both username and password.');
      return;
    }
    const response = await loginUser(username, password);
  };

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to On My Way
          </Text>

          <FormField
            title="username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyles="mt-7"
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;