import { getItemWithExpireTime, setItemWithExpireTime } from '@utils/storage';
import { Server } from './setting';
import { LoginReturnType } from './type';

export const login = async (code: string) => {
  try {
    const result = await Server.post<LoginReturnType>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/accounts/kakao/callback/`,
      { code }
    );
    setItemWithExpireTime('access', result.data.access_token);
    setItemWithExpireTime('refresh', result.data.refresh_token);
    return result.data;
  } catch (error: any) {
    if (error.response.status === 401) {
      const result = await getRefresh();
      if (result) {
        error.config.headers.Authorization = result.data.access_token;
        await Server.post(error.config.url, error.config);
      }
    }
  }
};

// 만료된 액세스 토큰 갱신
export const getRefresh = async () => {
  const accessToken = getItemWithExpireTime('access');
  const refreshToken = getItemWithExpireTime('refresh');
  const headers = { Authorization: `Bearer ${accessToken}` };
  // TODO: return 값으로 받아온 access token 으로 재요청
  try {
    return await Server.post('/refresh/', { refresh_token: refreshToken }, { headers });
  } catch (error) {
    console.log('액세스 토큰 갱신 실패: ', error);
  }
};

export const logout = async () => {
  const refreshToken = getItemWithExpireTime('refresh');
  try {
    localStorage.clear();
    return await Server.post('/logout/', {
      refresh_token: refreshToken
    });
  } catch (error) {
    console.log('로그아웃 에러:', error);
  }
};
