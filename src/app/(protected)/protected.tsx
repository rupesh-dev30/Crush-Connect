import { View, Button, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import logout from '../(auth)/logout';

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false); // Optionally remove this if logout redirects immediately
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#E94057" />
      ) : (
        <Button title="LOGOUT" onPress={handleLogout} color="#E94057" />
      )}
    </View>
  );
}
