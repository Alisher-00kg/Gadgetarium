import React, { useState } from 'react';
import { BreadCrumbs } from '../../components/UI/BreadCrumbs';
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Typography,
   styled,
} from '@mui/material';
import { Icons } from '../../assets';
import { faqs } from '../../utils/constants/faq';
const { PinkErrowUp } = Icons;

const array = [
   {
      label: 'Главная',
      href: '/',
   },
   {
      label: 'FAQ',
      href: '/faq',
   },
];

export const FaqPage = () => {
   const [expanded, setExpanded] = useState(false);

   const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   return (
      <div>
         <ContainerStyled>
            <BreadCrumbs breadcrumbs={array} />
            <p>FAQ</p>
         </ContainerStyled>
         <FaqContainerStyled>
            <div>
               <StyledContainer>
                  <TypographyFAQ>Часто задаваемые вопросы</TypographyFAQ>
                  {faqs.map(faq => (
                     <Accordion
                        key={faq.id}
                        expanded={expanded === faq.id}
                        onChange={handleChange(faq.id)}
                     >
                        <AccordionSummary
                           expandIcon={
                              <PinkErrowUp
                                 className={expanded === faq.id ? 'left' : 'up'}
                              />
                           }
                        >
                           <TypographyStyle>{faq.number}</TypographyStyle>
                           <Typography style={{ paddingLeft: '10px' }}>
                              {faq.title}
                           </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                           <Typography>{faq.description}</Typography>
                        </AccordionDetails>
                     </Accordion>
                  ))}
               </StyledContainer>
            </div>
         </FaqContainerStyled>
      </div>
   );
};

const ContainerStyled = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '30px',
   width: '80%',
   margin: '0 auto',

   '& p': {
      fontSize: '30px',
      borderBottom: '1px solid #CDCDCD',
      gap: '10px',
   },
}));
const TypographyFAQ = styled(Typography)(() => ({
   fontWeight: '700',
   fontFamily: 'inter',
   fontSize: '28px',
   textAlign: 'center',
}));
const FaqContainerStyled = styled('div')(() => ({
   width: '50%',
   margin: '0 auto',
   paddingTop: '100px',

   '& span': {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
      marginLeft: '10px',
   },

   '& button': {
      width: '40px',
      height: '40px',
      color: 'rgb(203, 17, 171)',
      backgroundColor: 'rgb(245, 222, 241)',
      borderRadius: '60%',
      border: 'rgb(245, 222, 241)',
   },
}));

const StyledContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   paddingRight: '10px',
   paddingBottom: '140px',
   ' .description': {
      textAlign: 'left',
      paddingLeft: '95px',
   },
   ' .up': {
      transform: 'rotate(90deg)',
   },
   ' .left': {
      transform: 'rotate(180deg)',
   },
}));
const TypographyStyle = styled(Typography)(() => ({
   backgroundColor: ' #eebfec',
   borderRadius: '50px',
   color: '#CB11AB',
   width: '32px',
   textAlign: 'center',
}));
