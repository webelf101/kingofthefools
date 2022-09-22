import React from 'react';

import styled from 'styled-components';

const ButtonWrapper = styled.button`
    border: none;
    outline: none;
    padding: 12px 18px;
    border-radius: 8px;
    background: #405cf5;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
`

const Button = ({ onClick = () => {}, children }) => (
    <ButtonWrapper onClick={(e) => onClick()}>{children}</ButtonWrapper>
)

export default Button;
