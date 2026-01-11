import React from 'react';

const ProgressStepper = ({ currentStep, totalSteps, steps }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        position: 'relative'
      }}>
        {/* Progress line */}
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '0',
          right: '0',
          height: '2px',
          backgroundColor: 'var(--border-color)',
          zIndex: 0
        }}>
          <div style={{
            height: '100%',
            backgroundColor: 'var(--vibrant-green)',
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>

        {/* Step circles */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              zIndex: 1,
              flex: 1
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: isCompleted || isCurrent ? 'var(--vibrant-green)' : 'var(--bg-secondary)',
                border: `2px solid ${isCompleted || isCurrent ? 'var(--vibrant-green)' : 'var(--border-color)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isCompleted || isCurrent ? 'white' : 'var(--text-secondary)',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                marginBottom: '8px'
              }}>
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span style={{
                fontSize: '11px',
                color: isCurrent ? 'var(--vibrant-green)' : 'var(--text-secondary)',
                fontWeight: isCurrent ? '600' : '400',
                textAlign: 'center',
                maxWidth: '100px'
              }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '20px',
        color: 'var(--text-secondary)',
        fontSize: '14px'
      }}>
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ProgressStepper;
