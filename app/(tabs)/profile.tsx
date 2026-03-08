import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const Profile = () => {
  return (
    <View
      className="bg-primary flex-1
  flex-col justify-center items-center gap-5"
    >
      <Image source={icons.person} className="size-10" tintColor="#fff" />
      <Text className="text-white font-bold text-2xl">Profile</Text>
    </View>
  );
};

export default Profile;
