import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 1, x: 0, y: 0 },
  enter: { opacity: 0, x: 0, y: 0 }
};
const PageLayout = ({ children }: any) => {
  return (
    <motion.main
      variants={variants} // Pass the variant object into Framer Motion
      initial='hidden' // Set the initial state to variants.hidden
      animate='enter' // Animated state to variants.enter
      transition={{ ease: 'easeIn', duration: 0.5, delay: 1 }} // Set the transition to linear
      className=''
      style={{ width: 'inherit', height: 'inherit' }}
    >
      {children}
    </motion.main>
  );
};

export default PageLayout;
