import { router, useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

const logout = async () => {
  await supabase.auth.signOut();
  router.replace("/"); // or redirect to login
};
