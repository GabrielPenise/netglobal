import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { BsLinkedin, BsGithub } from "react-icons/bs";



export default function Fotter() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted '>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5 p-4 '>
          <MDBRow className='mt-3'>
            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <p>
                <a >
                Gabriel Penise
                </a>
                <MDBIcon icon="envelope" className="me-3 espacio" />
                <a href="https://www.linkedin.com" className="me-2">
                 <BsLinkedin />
               </a> 
               <a href="https://github.com">
                 <BsGithub />
                 </a>
              </p>
              <p>
                <a >
                  Carmela Cacabelos
                </a>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="https://www.linkedin.com" className="me-1">
                 <BsLinkedin />
               </a>
               <a href="https://github.com">
                 <BsGithub />
                 </a>
              </p>
              <p>
                <a>
                Gerardo Burgos
                </a><MDBIcon icon="envelope" className="me-3" />
                <a href="https://www.linkedin.com" className="me-2">
                 <BsLinkedin />
               </a>
               <a href="https://github.com">
                 <BsGithub />
                 </a>
              </p>
              <p>
                <a>
               Gisela Arroyo
                </a>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="https://www.linkedin.com" className="me-2">
                 <BsLinkedin />
               </a>
               <a href="https://github.com">
                 <BsGithub />
                 </a>
              </p>
              <p>
                <a>
                Alberto Carrillo
                </a>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="https://www.linkedin.com" className="me-2">
                 <BsLinkedin />
               </a>
               <a href="https://github.com">
                 <BsGithub />
                 </a>
              </p>
            </MDBCol>
            
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.00)' }}>
        © 2022 Todos los derechos Reservados:
      </div>
    </MDBFooter>
  );
}