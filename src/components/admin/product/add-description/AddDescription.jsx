import React from 'react';
import { Input } from '../../../UI/Input.jsx';
import { styled } from '@mui/material';
import ReactQuill from 'react-quill';
import { Button } from '../../../UI/Button.jsx';
import { useDispatch } from 'react-redux';
import { addDescription } from '../../../../store/thunks/productsthunks.js';
import { useNavigate } from 'react-router-dom';

const AddDescription = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [description, setDescription] = React.useState('');
   const [videoUrl, setVideoUrl] = React.useState('');
   const [pdfFile, setPdfFile] = React.useState(null);

   const handleSubmit = () => {
      const productData = {
         description,
         videoUrl,
         pdf: pdfFile,
      };
      dispatch(addDescription({ productData, navigate }));
   };

   return (
      <div>
         <InputContainer>
            <Inputs>
               <label htmlFor={'video'}>Ссылка на видеообзор</label>
               <Input
                  fullWidth
                  placeholder={'Вставьте ссылку на видеообзор'}
                  onChange={e => setVideoUrl(e.target.value)}
                  value={videoUrl}
                  error={!!description}
               />
            </Inputs>
            <Inputs>
               <label htmlFor={'video'}>Ссылка на видеообзор</label>
               <Input
                  fullWidth
                  placeholder={'Вставьте документ в PDF файле'}
                  onChange={e => setPdfFile(e.target.value)}
                  value={pdfFile}
                  error={!!pdfFile}
               />
            </Inputs>
         </InputContainer>
         <ReactQuillStyle
            theme="snow"
            placeholder="Введите описание о товаре"
            value={description}
            onChange={setDescription}
            modules={{
               toolbar: [
                  ['bold', 'italic', 'underline'],
                  [{ list: 'bullet' }, { list: 'ordered' }],
               ],
            }}
         />
         <ButtonContainer>
            <Button>Отменить</Button>
            <Button variant={'contained'} onClick={handleSubmit}>
               Добавить
            </Button>
         </ButtonContainer>
      </div>
   );
};

export default AddDescription;

const InputContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   width: '800px',
   marginBottom: '16px',
   gap: '20px',

   label: {
      display: 'block',
   },
}));

const Inputs = styled('div')(() => ({
   width: '100%',
}));

const ReactQuillStyle = styled(ReactQuill)(() => ({
   width: '812px',
   height: '300px',
   borderRadius: '4px',
   margin: '0 0 80px 0',
   '.ql-formats': {
      display: 'flex',
      gap: '90px',
   },
   '.ql-toolbar.ql-snow': {
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
   '& .ql-active': {
      '.ql-stroke': {
         stroke: '#cb11ab !important',
      },
      '.ql-fill': {
         fill: '#cb11ab !important',
      },
   },
}));

const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   justifyContent: 'flex-end',
   width: '800px',
}));
