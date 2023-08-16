import ProfileSection from '@mypage/ProfileSection';
import BadgeSection from '@mypage/BadgeSection';
import WishPlaceSection from '@mypage/WishPlaceSection';
import MypageHeader from '@mypage/MypageHeader';

const Mypage = () => {
  return (
    <div>
      <MypageHeader />
      <ProfileSection />
      <BadgeSection />
      <WishPlaceSection />
    </div>
  );
};

export default Mypage;
