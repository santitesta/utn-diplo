import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
function PersonalizedDialog({ title, children, primaryAction, secondaryAction, primaryLabel,handleClose,handleShow, secondaryLabel, showDialog,  buttonIcon: ButtonIcon,isLoading}) {

  const handlePrimaryAction = () => {
    if (primaryAction) primaryAction();
    //handleClose();
  };
  const handleSecondaryAction = () => {
    if (secondaryAction) secondaryAction();
    handleClose();
  };

  return (
    <>
        {/* Si no paso el icono, no se visualiza el boton */}
        <Button variant="dark" size="sm" className="p-2" onClick={handleShow} hidden={ButtonIcon?false:true}>
          {ButtonIcon && <ButtonIcon />}
        </Button>
        
          <Modal show={showDialog} size="lg" contentClassName="bg-dark text-light" onHide={handleClose} animation={false}>
          <div style={{ position: 'relative' }}>
            {isLoading && (
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
              <Modal.Header closeButton>
                  <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body >
                  {children}
              </Modal.Body>
              <Modal.Footer>
                  {secondaryLabel && (
                      <Button variant="secondary" onClick={handleSecondaryAction}>
                      {secondaryLabel}
                      </Button>
                  )}
                  <Button variant="primary" onClick={handlePrimaryAction}>
                      {primaryLabel}
                  </Button>
              </Modal.Footer>
              </div>
          </Modal>
        
    </>
  );
}

export default PersonalizedDialog;
