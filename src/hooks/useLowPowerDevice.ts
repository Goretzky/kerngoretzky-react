import { useState, useEffect } from 'react';

/**
 * Custom hook to detect low-powered devices based on CPU cores
 * Disables animations on devices with ≤4 CPU cores to improve performance
 * Targets devices like Raspberry Pi, older mobile devices, and budget hardware
 *
 * @returns {boolean} true if device has ≤4 CPU cores, false otherwise
 */
export const useLowPowerDevice = (): boolean => {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check if browser supports hardwareConcurrency
    if (typeof window === 'undefined' || !navigator.hardwareConcurrency) {
      // If API not supported, assume not low-power (desktop browsers)
      setIsLowPower(false);
      return;
    }

    // Devices with 4 or fewer CPU cores are considered low-power
    // This catches Raspberry Pi 400 (4 cores), older phones, budget devices
    const cpuCores = navigator.hardwareConcurrency;
    setIsLowPower(cpuCores <= 4);
  }, []);

  return isLowPower;
};
