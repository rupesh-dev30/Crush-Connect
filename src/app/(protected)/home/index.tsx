import { View, Text, Button } from "react-native";
import React from "react";
import logout from "../../(auth)/logout";

export default function Page() {
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <View>
      <Text>home</Text>

      <Button title="LOGOUT" onPress={handleLogout} color="#E94057" />
    </View>
  );
}
