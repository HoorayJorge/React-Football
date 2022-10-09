import React from 'react';
import { CCard, CCardFooter, CCardBody, CButton } from '@coreui/react';
import Marquee from "react-fast-marquee";

export default function CryptoCard() {
    return (
        <CCard  textColor="white" className={`center border-top-secondary border-top-3`}>

            <CCardBody>
                <CButton className='d-grid gap-2 col-6 mx-auto' href="#" color='secondary' variant='outline'>Back to the Top</CButton>
            </CCardBody>

            <CCardFooter className="text-medium-emphasis" color='white' textColor='blue'>
                <Marquee style={{color: 'grey'}} pauseOnHove='true'>
                    <span>
                    ETH: 0x215Fd72fd68A6De8E73D0820548574E9014eBacF - 
                    GRLC: MTCHG5zDvRM8tk82JV4VsZhQnSiz1W3tYR - 
                    ZIL: zil1g99dn7uzhfw6el372cc073v3gppdaxhvlwvs3p - 
                    BTC: bc1q36cfwydts99ece9ju5ne0zhusyy4kl3lphfvtn - 
                    LTC: ltc1q4zgfkmef25ds6mfwk8slx3f8scd0dumc9cjh42 - 
                    </span>
                </Marquee>
            </CCardFooter>

        </CCard>
    );
}