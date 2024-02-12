import BadgeSection from '@mypage/BadgeSection';
import MypageHeader from '@mypage/MypageHeader';
import ProfileSection from '@mypage/ProfileSection';
import WishPlaceSection from '@mypage/WishPlaceSection';

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
