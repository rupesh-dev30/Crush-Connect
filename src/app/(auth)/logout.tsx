import { supabase } from "../../lib/supabase";
import { router } from "expo-router";

export default async function logout() {
  await supabase.auth.signOut();
  router.replace("/");
}
