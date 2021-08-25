import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function usePermissions() {
  const permissions = useSelector(state => state.authReducer?.permissions);
  const userInfo = useSelector(state => state.authReducer?.userInfo?.fullInfo);
  const [isSuperAdmin, setIsSuperAdmin] = useState();

  useEffect(() => {
    setIsSuperAdmin(userInfo.role === 'admin');
  }, [userInfo]);

  return { permissions, isSuperAdmin };
}
