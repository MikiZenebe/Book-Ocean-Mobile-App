import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {signOut} = useAuth();


  return (
    <View>
     <TouchableOpacity onPress={()=>signOut()}>
      <Text>Signout</Text>
     </TouchableOpacity>
    </View>
  );
}
