import React from 'react';
import { Col } from 'react-bootstrap';
import bingoBall from "../../assets/images/ball.png";

export default function BingoBall({ number }) {
  return (
    <Col
      className="d-flex justify-content-center align-items-center col-md-2 col-sm-6 col bingo-ball mt-2"
      style={{
        minWidth: '5.5rem',
        minHeight: '5.5rem',
        backgroundImage: `url(${bingoBall})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        textAlign: 'center',
      }}
    >
      <span
        className="text-black"
        style={{
          fontSize: '1.9rem',
          fontWeight: 'bold',
        }}
      >
        {number}
      </span>
    </Col>
  );
}
