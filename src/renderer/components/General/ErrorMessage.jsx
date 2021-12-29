import React from 'react';
import styled from 'styled-components';
import { Toast } from 'react-bootstrap';

export const CustomToast = styled(Toast)`
  position: fixed;
  right: 0;
  z-index: 6;
`;

export default function ErrorMessage({ error, setError }) {
  return (
    <CustomToast
      onClose={() => setError(null)}
      className="d-inline-block m-1"
      bg="danger"
    >
      <Toast.Header>
        <strong className="me-auto">{error.name}</strong>
      </Toast.Header>
      <Toast.Body>{error.message}</Toast.Body>
    </CustomToast>
  );
}
