"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import cursifyLight from '../../assets/cursify-light.png';
import cursifyDark from '../../assets/cursify-dark.png';
import { useTheme } from '@/providers/theme-provider';

const Logo = () => {
  const { theme, systemTheme } = useTheme();

  // Get the current theme accounting for system preference
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Logo animation variants
  const logoVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  // Determine which logo to use
  const getLogo = () => {
    try {
      return currentTheme === 'dark' ? cursifyLight : cursifyDark;
    } catch (error) {
      console.error('Error loading logo:', error);
      // Return a simple text fallback if images fail to load
      return null;
    }
  };

  return (
    <Link to="/" className="relative block w-36 h-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={logoVariants}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          {getLogo() ? (
            <img
              src={getLogo()}
              alt="Cursify Logo"
              className="w-full h-full object-contain"
              onError={(e) => {
                console.error('Error loading logo:', e);
                // Add a CSS class for text fallback
                e.currentTarget.classList.add('hidden');
                e.currentTarget.parentElement?.classList.add('logo-fallback');
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl font-bold">
              Cursify
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Link>
  );
};

export default Logo;