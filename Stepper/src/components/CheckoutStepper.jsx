import React, { useEffect, useRef, useState } from "react";

const CheckoutStepper = ({ steps = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margin, setMargin] = useState({ marginLeft: 0, marginRight: 0 });

  const stepRef = useRef([]);

  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0]?.offsetWidth / 2 || 0,
      marginRight: stepRef.current[steps.length - 1]?.offsetWidth / 2 || 0,
    });
  }, [stepRef, steps.length]);

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (steps.length - 1)) * 100;
  };

  const ActiveComponent = steps[currentStep - 1]?.Component;

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === steps.length) {
        setIsCompleted(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  return (
    isCompleted ? (
      <h1> Happy Shopping 🥰 </h1>
      
    ) :
    (
    <div>
      <h2> Checkout</h2>
      <div className='stepper'>
        {steps.map((step, index) => {
          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className={`step ${currentStep > index + 1 || isCompleted ? "completed" : ""
                } ${currentStep === index + 1 ? "active" : ""} `}
            >
              <div className='step-number'>{index + 1}</div>
              <div className='step-name'>{step?.name}
              
              </div>
            </div>
          );
        })}

        <div
          className='progress-bar'
          style={{
            width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
            marginLeft: margin.marginLeft,
            marginRight: margin.marginRight,
          }}
        >
          <div
            className='progress'
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>
      <h3>
        <ActiveComponent />
      </h3>
      {!isCompleted && (
        <button className='btn' onClick={handleNext}>
          {currentStep === steps.length ? "Finished" : "Next"}
        </button>
      )}
    </div>
    )
  );
};

export default CheckoutStepper;
