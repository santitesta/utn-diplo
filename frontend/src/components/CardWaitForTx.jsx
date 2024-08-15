import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Card } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle  } from 'react-icons/fa';
import { useWaitForTransactionReceipt } from 'wagmi';

function CardWaitForTx({ hash, title, children, error , isPending, isConfirmed}) {
    return (
        <div style={{ position: 'relative' }}>
            {isPending && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            <Card>
                <Card.Header>{title}</Card.Header>
                <Card.Body>
                    {children}
                </Card.Body>
                {isConfirmed && (
                    <Card.Footer className="text-muted">
                        <FaCheckCircle style={{ color: 'green', marginRight: '8px' }} />
                        <span>Transaction confirmed. {hash}</span>
                    </Card.Footer>
                )}
                {error  && (
                    <Card.Footer className="text-muted">
                        <FaTimesCircle style={{ color: 'red', marginRight: '8px' }} />
                        <span>{error.shortMessage}</span>
                    </Card.Footer>
                )}
            </Card>
        </div>
    );
}

CardWaitForTx.propTypes = {
    hash: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ]),
    error: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.oneOf([null])
    ]),
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isPending: PropTypes.bool,
    isConfirmed: PropTypes.bool,
};

export default CardWaitForTx;
