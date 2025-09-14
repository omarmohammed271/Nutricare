import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@src/states";
import { AuthService } from "@src/services";
import { useSnackbar } from "notistack";

export default function useLogout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { removeSession } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const logout = async () => {
    setLoading(true);
    
    try {
      // Call logout API (this may fail due to missing auth header but we continue)
      await AuthService.logout();
      enqueueSnackbar("Logged out successfully!", { variant: "success" });
    } catch (error: any) {
      console.warn('Logout API failed (expected if no auth):', error);
      // Still proceed with local logout even if API fails
    } finally {
      // Always clear local session regardless of API response
      removeSession();
      
      // Navigate to login page
      navigate("auth/login2", { replace: true });
      setLoading(false);
    }
  };

  return { logout, loading };
}
