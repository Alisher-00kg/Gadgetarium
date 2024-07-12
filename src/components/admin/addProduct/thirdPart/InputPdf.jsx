import { InputAdornment, styled } from '@mui/material';
import { Input } from '../../../UI/Input';
import InstallIcon from '../../../../assets/icons/installIcon.svg?react';
import { useDropzone } from 'react-dropzone';
import { notify } from '../../../main/SnackBar';
export const InputPdf = ({ onPdfFileChange, pdfFileName }) => {
   const handlePdfFileChange = event => {
      const file = event.target.files[0];
      if (file) {
         if (file.name.endsWith('.pdf') || file.type === 'application/pdf') {
            onPdfFileChange(file);
         } else {
            notify('Пожалуйста, загрузите только файлы в формате PDF');
         }
      }
   };

   const onDrop = acceptedFiles => {
      if (acceptedFiles.length > 0) {
         const file = acceptedFiles[0];
         if (file.name.endsWith('.pdf') || file.type === 'application/pdf') {
            onPdfFileChange(file);
         } else {
            notify('Пожалуйста, загрузите только файлы в формате PDF');
         }
      }
   };

   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: ['.pdf', 'application/pdf'],
   });

   return (
      <div>
         <LabelStyle htmlFor="Загрузите документ PDF">
            Загрузите документ PDF <em style={{ color: 'red' }}>*</em>
            <div {...getRootProps()}>
               <input {...getInputProps()} onChange={handlePdfFileChange} />
               <InputStyle
                  id="Загрузите документ PDF"
                  placeholder="Вставьте документ в PDF файле"
                  name="pdf"
                  type="text"
                  value={pdfFileName}
                  onChange={handlePdfFileChange}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <InstallIcon style={{ cursor: 'pointer' }} />
                        </InputAdornment>
                     ),
                  }}
               />
            </div>
         </LabelStyle>
      </div>
   );
};
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      width: '396px',
      fontFamily: 'Inter',
      fontWeight: '300',
      color: '#91969E',
      background: '#ffffff',
      marginTop: '4px',
   },
}));

const LabelStyle = styled('label')(() => ({
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
   color: '#384255',
}));
