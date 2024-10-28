import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary flex-1 flex px-4">
      <CustomButton
            title="Create New Task"
            handlePress={() => router.push("/")}
            containerStyles="w-full mt-7"
          />
      {/* <CustomButton
            title="Index"
            handlePress={() => router.push("/")}
            containerStyles="w-full mt-7"
          /> */}

    </SafeAreaView>
  );
};

export default Home;