import { Server } from './setting';
import { LoginReturnType } from './type';

export const login = async (code: string) => {
  try {
    const result = await Server.post<LoginReturnType>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/accounts/kakao/callback/`,
      { code }
    );
    console.log('accessToken 발급 성공: ', result);
    localStorage.setItem('access', result.data.access_token);
    localStorage.setItem('refresh', result.data.refresh_token);
    return result.data;
  } catch (error: any) {
    console.log('getKakaoAccessToken 에러: ', error);
    if (error.response.status === 401) {
      const result = await getRefresh();
      console.log('에러시 재발급: ', result);
      if (result) {
        error.config.headers.Authorization = result.data.access_token;
        await Server.post(error.config.url, error.config);
      }
    }
  }
};

// 만료된 액세스 토큰 갱신
export const getRefresh = async () => {
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const headers = { Authorization: `Bearer ${accessToken}` };
  // TODO: return 값으로 받아온 access token 으로 재요청
  try {
    return await Server.post('/refresh', { refresh_token: refreshToken }, { headers });
  } catch (error) {
    console.log('액세스 토큰 갱신 실패: ', error);
  }
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refresh');
  try {
    localStorage.clear();
    return await Server.post('/logout', {
      refresh_token: refreshToken
    });
  } catch (error) {
    console.log('로그아웃 에러:', error);
  }
};
