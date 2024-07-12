import { styled } from '@mui/material';
import { Button } from '../../../UI/Button';
import Plus from '../../../../assets/icons/plus.svg?react';
import Select from '../../../UI/Select';
import { useEffect, useState } from 'react';
import { Input } from '../../../UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AddBrandSelect } from '../firstPart/AddBrandSelect';
import { AddProductCharacteristics } from './AddProductCharacteristics';
import { CategorySelect } from './CategorySelect';
import DatePicker from '../../../UI/DatePicker';
import {
   laptopCharacteristics,
   setSelectedCategory,
   smartPhoneCharacteristics,
   smartWhatchCharacteristics,
   tabletCharacteristics,
} from '../../../../store/slices/productSlice';
import {
   getCategory,
   getSubCategory,
} from '../../../../store/thunks/productThunk';
import { VariantProducts } from './VariantProducts';
import { AddPhotos } from './AddPhotos';

export const AddCategory = ({ setTab }) => {
   const { category } = useSelector(state => state.category);
   const { subCategory } = useSelector(state => state.subCategory);
   const dispatch = useDispatch();

   const [productCharacteristics, setProductCharacteristics] = useState({
      mainColour: '',
      memory: '',
      laptopmemory: '',
      ram: '',
      countSim: '',
      size: '',
      operatingSystem: '',
      tabletOperatingSystem: '',
      screenType: '',
      materialBody: '',
      connection: '',
      dumas: '',
      cpu: '',
      productCharacteristics: {},
      images: [],
      materialBracelet: '',
   });

   const [errorMessage, setErrorMessage] = useState('');
   const [products, setProducts] = useState([]);
   const [resetVariantFlag, setResetVariantFlag] = useState(false);
   const [resetPhotosFlag, setResetPhotosFlag] = useState(false);
   const [isCategoryDisabled, setIsCategoryDisabled] = useState(false);

   const handleProductsSubmit = () => {
      const newValue = {
         ...productCharacteristics,
         ...formData,
         brand,
         releaseDate,
         id: Date.now().toString(),
      };
      console.log(newValue);
      // dispatch(smartPhoneCharacteristics(newValue));
      // dispatch(smartWhatchCharacteristics(newValue));
      // dispatch(laptopCharacteristics(newValue));
      // dispatch(tabletCharacteristics(newValue));
      // setTab('2');
   };

   const clearCharacteristics = () => {
      setProductCharacteristics({
         mainColour: '',
         memory: '',
         laptopmemory: '',
         ram: '',
         countSim: '',
         size: '',
         operatingSystem: '',
         tabletOperatingSystem: '',
         materialBody: '',
         connection: '',
         dumas: '',
         cpu: '',
         productCharacteristics: {},
         images: [],
      });
   };

   useEffect(() => {
      clearCharacteristics();
   }, []);

   const [formData, setFormData] = useState({
      categories: '',
      subCategories: '',
      nameOfGadget: '',
      brand: '',
      dateOfIssue: null,
      warranty: '',
      genderWatch: '',
      waterproof: '',
      wireless: '',
      shapeBody: '',
      productCharacteristics: {},
      photos: [],
   });

   const handleInputChange = (field, value) => {
      setFormData(prevState => ({ ...prevState, [field]: value }));
   };
   const handlePhotosChange = newPhotos => {
      setFormData(prevState => ({ ...prevState, photos: newPhotos }));
   };

   const handleProductCategoryChange = event => {
      const productCategory = event.target.value;
      dispatch(setSelectedCategory(productCategory));
   };

   const handleCategoriesChange = event => {
      const newCategory = event.target.value;
      handleInputChange('categories', newCategory);
      dispatch(getSubCategory(newCategory));
   };

   const handleBrandChange = brand => {
      handleInputChange('brand', brand);
   };

   const handleReleaseDateChange = date => {
      handleInputChange('releaseDate', date.toISOString().split('T')[0]);
   };

   const handleSubCategoriesChange = event => {
      handleInputChange('subCategories', event.target.value);
   };

   const handleProductNameChange = event => {
      handleInputChange('productName', event.target.value);
   };

   const handleWarrantyChange = event => {
      handleInputChange('warranty', event.target.value);
   };
   const handleVariantChange = (variantName, value) => {
      handleInputChange(variantName, value);
   };

   const handleSubmit = () => {
      const {
         categories,
         subCategories,
         nameOfGadget: productName,
         dateOfIssue: releaseDate,
         warranty,
         brand,
         genderWatch: gender,
         waterproof,
         wireless: interfaces,
         shapeBody: caseShape,
         productCharacteristics,
         photos,
      } = formData;
      if (
         !categories ||
         !subCategories ||
         !productName ||
         !releaseDate ||
         !warranty ||
         !brand
      ) {
         setErrorMessage(
            'Пожалуйста, заполните все поля и добавьте изображения!',
         );
         return;
      }

      if (photos.length === 0) {
         setErrorMessage('Пожалуйста, добавьте фотографии продукта!');
         return;
      }

      const characteristicsIncomplete = Object.values(
         productCharacteristics,
      ).every(value => value === '');

      if (characteristicsIncomplete) {
         setErrorMessage('Пожалуйста, заполните все характеристики продукта!');
         return;
      }

      setErrorMessage('');
      const newProduct = {
         ...formData,
         ...productCharacteristics,
      };

      setProducts(prevProducts => [...prevProducts, newProduct]);

      setFormData({
         categories: '',
         subCategories: '',
         nameOfGadget: '',
         brand: '',
         dateOfIssue: null,
         warranty: '',
         genderWatch: '',
         waterproof: '',
         wireless: '',
         shapeBody: '',
         productCharacteristics: {},
         photos: [],
      });

      setResetVariantFlag(!resetVariantFlag);
      setResetPhotosFlag(!resetPhotosFlag);
   };

   const handleProductSelect = index => {
      const selectedProduct = products[index];
      setFormData(selectedProduct);
   };

   useEffect(() => {
      dispatch(getCategory());
   }, []);

   const {
      categories,
      subCategories,
      nameOfGadget: productName,
      brand,
      dateOfIssue: releaseDate,
      warranty,
      genderWatch: gender,
      waterproof,
      wireless: interfaces,
      shapeBody: caseShape,
      photos,
   } = formData;

   return (
      <Wrapper>
         <Container>
            <CategoriStyle>
               <CategorySelect
                  onChange={handleCategoriesChange}
                  onSelectChange={handleProductCategoryChange}
                  options={category}
                  value={categories}
                  label={
                     <DescriptionBlock>
                        <p>
                           Выберите категорию <em>*</em>
                        </p>
                     </DescriptionBlock>
                  }
                  selectedOption={categories}
                  disabled={isCategoryDisabled}
               />
               <SelectStyle
                  options={subCategory}
                  onChange={handleSubCategoriesChange}
                  value={subCategories}
                  label={
                     <DescriptionBlock>
                        <p>
                           Выберите подкатегорию <em>*</em>
                        </p>
                     </DescriptionBlock>
                  }
                  selectedOption={subCategories}
               />
            </CategoriStyle>
            <CategoriStyle>
               <BoxSelect>
                  <Description>
                     Бренд <em>*</em>
                  </Description>
                  <AddBrandSelect value={brand} onChange={handleBrandChange} />
               </BoxSelect>
               <InputContainer>
                  <Description htmlFor="">
                     Гарантия (месяцев) <em>*</em>
                  </Description>
                  <InputStyle
                     placeholder="Введите гарантию товара"
                     onChange={handleWarrantyChange}
                     type="number"
                     value={warranty}
                  />
               </InputContainer>
            </CategoriStyle>
            <CategoriStyle>
               <InputContainer>
                  <Description htmlFor="">
                     Название товара <em>*</em>
                  </Description>
                  <InputStyle
                     placeholder="Введите название товара"
                     onChange={handleProductNameChange}
                     value={productName}
                     type="text"
                  />
               </InputContainer>
               <InputContainer>
                  <Description htmlFor="">
                     Дата выпуска <em>*</em>
                  </Description>
                  <DatePickerBox>
                     <DatePickerStyle
                        selected={releaseDate ? new Date(releaseDate) : null}
                        onChange={handleReleaseDateChange}
                        dateFormat="yyyy-MM-dd"
                     />
                  </DatePickerBox>
               </InputContainer>
            </CategoriStyle>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
         </Container>
         <ButtonContainer>
            {products.map((product, index) => (
               <Block key={index} onClick={() => handleProductSelect(index)}>
                  Продукт {index + 1}
               </Block>
            ))}
            <ButtonStyle onClick={handleSubmit}>
               <Plus /> Добавить продукт
            </ButtonStyle>
         </ButtonContainer>
         {categories === 3 ? (
            <VariantProducts
               onChange={handleVariantChange}
               resetVariants={resetVariantFlag}
               productVariants={{ gender, waterproof, interfaces, caseShape }}
            />
         ) : null}
         <AddProductCharacteristics
            productCharacteristics={productCharacteristics}
            setProductCharacteristics={setProductCharacteristics}
            onChange={handleInputChange}
            selectedCategory={formData.categories}
            initialCharacteristics={formData.productCharacteristics}
         />
         <AddPhotos
            onPhotosChange={handlePhotosChange}
            resetPhotos={resetPhotosFlag}
            handleProductsSubmit={handleProductsSubmit}
            initialPhotos={photos}
         />
      </Wrapper>
   );
};
const Wrapper = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '40px',
}));
const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '16px',
   em: {
      color: '#F10000',
   },
}));
const SelectStyle = styled(Select)(() => ({
   width: '396px',
   height: '55px',
   fontFamily: 'Inter',
   fontWeight: '300',
}));

const BoxSelect = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',
}));
const InputStyle = styled(Input)(() => ({
   '.MuiInputBase-root': {
      height: '55px',
      backgroundColor: '#ffffff',
      fontFamily: 'Inter',
      fontWeight: '300',
      borderColor: '#CDCDCD',
   },
}));
const DatePickerBox = styled('div')(() => ({
   fontFamily: 'Inter',
   color: 'red',
   '.MuiStack-root': {
      padding: '0',
      color: 'red',
   },
   '.MuiInputBase-input-MuiOutlinedInput-input': {
      fontFamily: 'Inter',
      color: 'red',
   },
}));
const DatePickerStyle = styled(DatePicker)(() => ({
   fontFamily: 'Inter',
   fontWeight: '400',
   '.MuiInputBase-input-MuiOutlinedInput-input': {
      fontFamily: 'Inter',
   },
}));

const InputContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '6px',
}));
const Block = styled('div')(() => ({
   width: '107px',
   height: '35px',
   borderRadius: '6px',
   border: '1px solid #91969E',
   fontFamily: 'Inter',
   fontWeight: '300',
   color: '#91969E',
   padding: '8px 12px',
}));

const ButtonStyle = styled(Button)(() => ({
   border: 'none',
   display: 'flex',
   gap: '10px',
   outline: 'none',
   textTransform: 'initial',
   fontFamily: 'Inter',
   fontWeight: '500',
}));
const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   gap: '22px',
}));
const Description = styled('label')(() => ({
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '400',
}));
const DescriptionBlock = styled('div')(() => ({
   p: {
      fontFamily: 'Inter',
      fontSize: '14px',
      fontWeight: '400',
   },
}));
const CategoriStyle = styled('div')(() => ({
   display: 'flex',
   gap: '20px',
   '.MuiFormControl-root': {
      width: '396px',
   },
   '.MuiInputBase-input-MuiOutlinedInput-input': {
      padding: '2px',
      fontFamily: 'Inter',
      fontSize: '10px',
   },
}));
