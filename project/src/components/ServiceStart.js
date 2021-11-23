import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from "styled-components";
const ServiceStart = ({history}) =>{
    return (
        <div>
            <BackButton onClick={ () => {history.goBack()} }> 👈 </BackButton><br />
            
            <button onClick={ (event) => {
                alert('검사가 완료되었습니다. 결과를 기다려 주십시오.🧐');
                history.push("/ResultPage")}}> 결과보기 </button>
        </div>
        
    );
};
const BackButton = styled.button`
    float:left;
    border: 0;
    background: white;


`;
export default ServiceStart;