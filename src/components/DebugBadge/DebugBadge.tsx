import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLowPowerDevice } from '../../hooks/useLowPowerDevice';

/**
 * Temporary debug badge to show animation detection status
 * Displays in bottom-right corner of page
 * Shows: CPU cores detected, whether animations are disabled
 */
const DebugBadge: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const isLowPowerDevice = useLowPowerDevice();
  const cpuCores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency
    ? navigator.hardwareConcurrency
    : 'unknown';

  const disableAnimations = prefersReducedMotion || isLowPowerDevice;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        border: '2px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div style={{ marginBottom: '4px' }}>
        <strong>🔍 Debug Info</strong>
      </div>
      <div>Cores: {cpuCores}</div>
      <div>Low Power: {isLowPowerDevice ? 'YES' : 'NO'}</div>
      <div>Reduced Motion: {prefersReducedMotion ? 'YES' : 'NO'}</div>
      <div style={{
        marginTop: '4px',
        paddingTop: '4px',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
        color: disableAnimations ? '#ff6b6b' : '#51cf66'
      }}>
        Animations: {disableAnimations ? 'OFF' : 'ON'}
      </div>
    </div>
  );
};

export default DebugBadge;
