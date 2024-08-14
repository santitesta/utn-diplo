import React, { useState, useEffect } from 'react';
import { styled } from '@stitches/react';
import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types'; // Importa PropTypes

// Importa la fuente de Google Fonts si es necesario
const AppContainer = styled('div', {
  // Estilos del contenedor principal si es necesario
});

const Container = styled('div', {
  display: 'flex',
  gap: 10,
  position: 'relative',
});

const Box = styled('div', {
  position: 'relative',
  height: 100,
  width: 100,
});

// Estilos adaptados del CSS proporcionado
const PozoText = styled('div', {
  position: 'absolute',
  top: '-30px', // Ajusta según sea necesario
  left: '-20px', // Ajusta según sea necesario
  fontSize: '35px',
  textShadow: '0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000',
  color: '#fff6a9',
  fontFamily: 'Sacramento, cursive',
  textAlign: 'center',
  animation: 'blink 6s infinite',
  '@webkitAnimation': 'blink 6s infinite',
  zIndex: 2, // Asegura que el texto esté sobre los números del jackpot
});

const SharedStyles = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Helvetica',
  fontWeight: 800,
  backfaceVisibility: 'hidden',
  fontSize: '2rem',
};

const FrontBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: '#6cab64',
  zIndex: 1, // Asegura que los números estén detrás del texto
});

const BackBox = styled(animated.div, {
  ...SharedStyles,
  backgroundColor: '#6cab64',
  border: 'solid 2px #6cab64',
  color: '#fafafa',
  zIndex: 1, // Asegura que los números estén detrás del texto
});

const formatNumber = (num) => num.toString().padStart(7, '0').split('');

const getRandomNumbers = (count, max) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max));
  }
  numbers.add(max)
  return Array.from(numbers).sort((a, b) => a - b);
};

const LotteryJackpot = ({ className ,pozo }) => {
  const [numbers, setNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const generatedNumbers = getRandomNumbers(10, pozo * 1000000000); // ETH to Gwei conversion
    setNumbers(generatedNumbers);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex < generatedNumbers.length - 1) {
          return prevIndex + 1;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 400); // Actualiza cada medio segundo

    return () => clearInterval(interval);
  }, [pozo]);

  useEffect(() => {
    if (numbers.length > 0) {
      setCurrentValue(numbers[currentIndex]);
    }
  }, [currentIndex, numbers]);

  const digits = formatNumber(currentValue);

  return (
    <AppContainer className={className}>
      <Container className="lottery-container">
        {digits.map((digit, i) => (
          <DigitBox className="lottery-numbers" key={i} value={parseInt(digit, 10)} />
        ))}
        <PozoText className="lottery-title">Pozo del Proximo Sorteo (GWEI):</PozoText>
      </Container>
    </AppContainer>
  );
};

// Definición de PropTypes para LotteryJackpot
LotteryJackpot.propTypes = {
  className: PropTypes.string,
};

const DigitBox = ({ className, value }) => {
  const { rotateX } = useSpring({
    from: { rotateX: 0 },
    to: { rotateX: 180 },
    reset: true,
    reverse: value % 2 === 0,
    config: { tension: 120, friction: 14 },
  });

  return (
    <Box className={className}>
      <FrontBox
        style={{
          transform: rotateX.to((val) => `perspective(600px) rotateX(${val}deg)`),
          transformStyle: 'preserve-3d',
        }}
      >
        {value}
      </FrontBox>
      <BackBox
        style={{
          transform: rotateX.to((val) => `perspective(600px) rotateX(${180 - val}deg)`),
          transformStyle: 'preserve-3d',
        }}
      >
        {value}
      </BackBox>
    </Box>
  );
};

// Definición de PropTypes para DigitBox
DigitBox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default LotteryJackpot;
