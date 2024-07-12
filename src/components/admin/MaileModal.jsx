import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { BaseModal } from '../UI/BaseModal';
import { styled } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import DowlandImage from '../../assets/images/addimage.svg?react';
import { useDropzone } from 'react-dropzone';
import ErrorMessage from '../ErrorMessage';
import DatePicker from '../UI/DatePicker';
import dayjs from 'dayjs';

const MaileModal = ({ open, onClose }) => {
   const [selectedFile, setSelectedFile] = useState(null);
   const [showText, setShowText] = useState(true);

   const onDrop = useCallback(addtedFiles => {
      setSelectedFile(addtedFiles[0]);
      setShowText(false);
   }, []);
   const { getRootProps, getInputProps } = useDropzone({
      onDrop,
   });

   const {
      handleSubmit,
      control,
      watch,
      setValue,
      formState: { errors },
   } = useForm({
      defaultValues: {
         startDate: null,
         endDate: null,
      },
   });

   const startDate = watch('startDate');
   const endDate = watch('endDate');

   useEffect(() => {
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
         setValue('endDate', null);
      }
   }, [startDate, endDate, setValue]);

   const onSubmit = data => {
      const formData = {
         title: data.title,
         description: data.description,
         startDate: data.startDate,
         endDate: data.endDate,

         file: selectedFile
            ? {
                 name: selectedFile.name,
                 type: selectedFile.type,
                 size: selectedFile.size,
              }
            : null,
      };
   };

   const handleFileChange = e => {
      const file = e.target.file[0];
      setSelectedFile(file);
   };

   const dateToday = dayjs();

   return (
      <div>
         <BaseModal open={open}>
            <FormStyle onSubmit={handleSubmit(onSubmit)} action="">
               <TitLeStyle htmlFor="">Создать рассылку</TitLeStyle>
               <DawnloadImage>
                  <DowlandImage />
                  <InputDawnload {...getRootProps()}>
                     <input {...getInputProps()} onChange={handleFileChange} />
                     {showText && <p>Нажмите для добавления фотографии</p>}
                     {selectedFile && (
                        <ImageStyle src={URL.createObjectURL(selectedFile)} />
                     )}
                  </InputDawnload>
               </DawnloadImage>

               <FirstContainer>
                  <TitleContainer>
                     <label htmlFor="">
                        Название рассылки <em style={{ color: 'red' }}>*</em>
                     </label>
                     <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Описание обязательно' }}
                        render={({ field }) => (
                           <InputStyle
                              placeholder="Введите название рассылки"
                              type="text"
                              {...field}
                           />
                        )}
                     />
                     <ErrorMessage>{errors?.title?.message}</ErrorMessage>
                  </TitleContainer>
                  <TitleContainer>
                     <label htmlFor="">
                        Описание рассылки <em style={{ color: 'red' }}>*</em>
                     </label>
                     <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Описание обязательно' }}
                        render={({ field }) => (
                           <InputStyle
                              placeholder="Введите описание рассылки"
                              type="text"
                              {...field}
                           />
                        )}
                     />
                     <ErrorMessage>{errors?.description?.message}</ErrorMessage>
                  </TitleContainer>
               </FirstContainer>
               <SehondContainer>
                  <PikerStyle>
                     <label htmlFor="">
                        Дата начала акции <em style={{ color: 'red' }}>*</em>{' '}
                     </label>
                     <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: 'Дата начала обязательна' }}
                        render={({ field }) => (
                           <DateDiv>
                              <DatePicker
                                 onChange={field.onChange}
                                 selected={field.value}
                                 minDate={dateToday}
                              />
                           </DateDiv>
                        )}
                     />
                     <ErrorMessage>{errors?.startDate?.message}</ErrorMessage>
                  </PikerStyle>

                  <PikerStyle>
                     <label htmlFor="">
                        Дата окончания акции
                        <em style={{ color: 'red' }}>*</em>
                     </label>
                     <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: 'Дата окончания обязательна' }}
                        render={({ field }) => (
                           <DateDiv>
                              <DatePicker
                                 onChange={field.onChange}
                                 selected={field.value}
                                 minDate={watch('startDate')}
                                 maxDate={dayjs(
                                    new Date().setFullYear(
                                       new Date().getFullYear() + 1,
                                    ),
                                 )}
                              />
                           </DateDiv>
                        )}
                     />
                     <ErrorMessage>{errors?.endDate?.message}</ErrorMessage>
                  </PikerStyle>
               </SehondContainer>
               <ButtunContainer>
                  <StyleButton onClick={onClose}>Отменить</StyleButton>
                  <StyleButton type="submit" variant="contained">
                     отправить
                  </StyleButton>
               </ButtunContainer>
            </FormStyle>
         </BaseModal>
      </div>
   );
};

const FormStyle = styled('form')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',

   flexDirection: 'column',
}));

const TitLeStyle = styled('h4')(() => ({
   color: ' rgb(41, 41, 41)',
   fontFamily: 'Inter',
   fontSize: '24px',
   fontWeight: '500',
   lineHeight: '32px',
   padding: '40px 36px',
}));

const DawnloadImage = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: '4px',
   background: ' rgba(144, 156, 181, 0.2)',
   width: '217px',
   height: '217px',
}));

const ImageStyle = styled('img')(() => ({
   width: '217px',
   height: '217px',
}));

const InputDawnload = styled('div')(() => ({
   color: ' rgb(145, 150, 158)',
   fontFamily: 'Inter',
   fontSize: '12px',
   fontWeight: '400',
   lineHeight: '120%',
   letterSpacing: '0px',
   textAlign: 'center',
   padding: '23px 30px',
}));

const FirstContainer = styled('div')`
   display: flex;
   flex-direction: column;
   padding: 32px 32px 20px 32px;
   gap: 20px;
`;
const TitleContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',
}));

const InputStyle = styled(Input)(() => ({
   width: '480px',
   height: '35px',
   '.MuiInputBase-root': {
      background: ' none',
   },
}));

const SehondContainer = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
}));

const PikerStyle = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   width: '230px',
   height: '60px',

   '.MuiFormControl-root': {
      overflow: 'hidden',
   },
}));

const DateDiv = styled('div')(() => ({
   '.MuiInputBase-inputAdornedEnd': {
      padding: '8px 12px',
   },
}));

const ButtunContainer = styled('div')`
   display: flex;
   gap: 20px;
   padding: 40px 32px;
`;
const StyleButton = styled(Button)(() => ({
   width: '235px',
   height: '41px',
}));
export default MaileModal;
