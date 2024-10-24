import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import './LotteryJackpot.css'; // Importa el archivo CSS

const LotteryJackpot = ({ className, pozo }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    setCurrentValue(pozo);
  }, [pozo]);

  const digits = formatNumber(currentValue);

  return (
    <div className={`app-container ${className}`}>
      <div className="lottery-container">
        {digits.map((digit, i) => {
          const parsedDigit = isNaN(parseInt(digit, 10)) ? digit : parseInt(digit, 10);
          
          // Si el dígito es 0 y es el último dígito, no renderiza nada
          if (parsedDigit === 0 && i === digits.length - 1) {
            return null;
          }

          return (
            <DigitBox
              key={i}
              value={parsedDigit}
            />
          );
        })}
        {window.SYMBOL.split('').map((char, index) => (
          <DigitBox key={index} value={char} className="gold" />
        ))}
        <div className="lottery-title">Pozo en Juego:</div>
      </div>
    </div>
  );
};

LotteryJackpot.propTypes = {
  className: PropTypes.string,
  pozo: PropTypes.number.isRequired,
};

const DigitBox = ({ value , className = '' }) => {
  const { rotateX } = useSpring({
    from: { rotateX: 0 },
    to: { rotateX: 180 },
    reset: true,
    reverse: value % 2 === 0,
    config: { tension: 120, friction: 14 },
  });

  return (
    <div className="box">
      <animated.div
        className={`front-box ${className}`}
        style={{
          transform: rotateX.to((val) => `perspective(600px) rotateX(${val}deg)`),
        }}
      >
        {value}
      </animated.div>
      <animated.div
        className={`back-box ${className}`}
        style={{
          transform: rotateX.to((val) => `perspective(600px) rotateX(${180 - val}deg)`),
        }}
      >
        {value}
      </animated.div>
    </div>
  );
};

DigitBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const formatNumber = (num) => {
  const [integerPart, decimalPart] = num.toFixed(2).split('.');
  return `${parseInt(integerPart, 10)}.${decimalPart}`.split('');
};

export default LotteryJackpot;