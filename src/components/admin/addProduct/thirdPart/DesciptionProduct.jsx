import { useEffect, useState } from 'react';
import { InstallVideo } from './InstallVideo';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@mui/material';
import { Button } from '../../../UI/Button';
import { InputPdf } from './InputPdf';
import { notify } from '../../../main/SnackBar';

export const DesciptionProduct = ({ installProductData }) => {
   const [text, setText] = useState('');
   const [videoLink, setVideoLink] = useState('');
   const [pdfFile, setPdfFile] = useState(null);
   const [pdfFileName, setPdfFileName] = useState('');

   const handleVideoLinkChange = link => {
      setVideoLink(link);
   };

   const handlePdfFileChange = file => {
      setPdfFile(file);
      setPdfFileName(file ? file.name : '');
   };

   const handleDescriptionChange = () => {
      if (!text || !videoLink || !pdfFile || !pdfFileName) {
         notify('Пожалуйста заполните все поля!');
      }
      const productDescription = {
         videoLink,
         pdfFile,
         description: text,
         installProductData,
      };

      setText('');
      setVideoLink('');
      setPdfFile(null);
      setPdfFileName('');
   };

   return (
      <Wrapper>
         <FormBox>
            <InstallVideo
               onVideoLinkChange={handleVideoLinkChange}
               videoLink={videoLink}
            />
            <InputPdf
               onPdfFileChange={handlePdfFileChange}
               pdfFileName={pdfFileName}
            />
         </FormBox>
         <Box>
            <div>
               <p>
                  Описание <em style={{ color: 'red' }}>*</em>
               </p>
               <ReactQuillStyle
                  theme="snow"
                  placeholder="Введите описание о товаре"
                  value={text}
                  onChange={setText}
                  modules={{
                     toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ list: 'bullet' }, { list: 'ordered' }],
                     ],
                  }}
               />
            </div>
         </Box>
         <ButtonBox>
            <ButtonStyle>Отменить</ButtonStyle>
            <ButtonStyle variant="contained" onClick={handleDescriptionChange}>
               Добавить
            </ButtonStyle>
         </ButtonBox>
      </Wrapper>
   );
};

const ReactQuillStyle = styled(ReactQuill)(() => ({
   width: '812px',
   height: '355px',
   borderRadius: '4px',
   '.ql-formats': {
      display: 'flex',
      gap: '90px',
   },
   '.ql-toolbar.ql-snow': {
      border: '1px solid #cdcdcd',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      paddingLeft: '50px',
      display: 'flex',
   },
   '.ql-container.ql-snow': {
      border: '1px solid #cdcdcd',
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
   },
   '.ql-blank::before': {
      fontStyle: 'inherit',
   },
}));
const Box = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
   p: {
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: '400',
      paddingBottom: '8px',
   },
}));
const ButtonStyle = styled(Button)(() => ({
   width: '126px',
   textTransform: 'capitalize',
   fontFamily: 'Inter',
   fontWeight: '600',
}));
const ButtonBox = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   gap: '20px',
}));
const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '80px',
}));
const FormBox = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));
