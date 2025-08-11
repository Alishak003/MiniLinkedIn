import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../contexts/authContext';

const LoggedinRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { fetchUserDataByUID } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/signup');
      } else {
        try {
          const result = await fetchUserDataByUID(user.uid);
          console.log("dataaa")
          if (!result?.data?.location) {
            navigate('/completeProfile');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // Optional: handle errors here
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, fetchUserDataByUID]);

  if (loading) return null; // or a spinner

  return children;
};

export default LoggedinRoute;
