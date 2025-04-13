import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { useRouter } from "expo-router";

import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";

const screenHeight = Dimensions.get("window").height;

export default function OnboardingStep1() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [country, setCountry] = useState<Country | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const onSelectCountry = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2 as CountryCode);
    setCountry(selectedCountry);
    setShowPicker(false);
  };

  const handleNext = () => {
    if (!country || !phone) return;
    router.push("/(protected)/onboarding/onboarding2");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          width: "100%",
          borderRadius: 10,
          padding: 30,
        }}
      >
        <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 10 }}>
          My mobile
        </Text>
        <Text style={{ fontSize: 15, color: "#555", marginBottom: 20 }}>
          Please enter your valid phone number. We will send you a 4-digit code
          to verify your account.
        </Text>

        {/* Phone Input with Country Code */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#eee",
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: 20,
            paddingVertical: 5,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              +{country?.callingCode?.[0] || "1"}
            </Text>
            <Entypo
              name="chevron-down"
              size={20}
              color="#555"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>

          <TextInput
            style={{ flex: 1, paddingVertical: 10 }}
            placeholder="331 623 8413"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#E94057",
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={handleNext}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={showPicker}
        onBackdropPress={() => setShowPicker(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            height: screenHeight * 0.5,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <CountryPicker
            countryCode={countryCode}
            withFilter
            withFlag
            withCallingCode
            // withAlphaFilter
            withCountryNameButton={false}
            withModal={false}
            onSelect={onSelectCountry}
            visible
            containerButtonStyle={{ width: "100%" }}
            translation="common"
          />
        </View>
      </Modal>
    </View>
  );
}
