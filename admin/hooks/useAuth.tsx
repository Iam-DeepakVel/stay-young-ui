import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export interface User {
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/user/current-user`,
          {
            headers: { Authorization: `Bearer ${Cookies.get("access_token")}` },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }

      setLoading(false);
    };

    fetchCurrentUser();
  }, []);

  return { user, loading };
}
