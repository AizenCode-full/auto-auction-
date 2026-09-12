
import React, { useState } from 'react';
import { Form, Select, DatePicker, Input, Checkbox, message } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { uploadImages } from '../../../shared/api/uploads';
import axios from 'axios';
import dayjs from 'dayjs';

const { Option } = Select;
interface CreateLotFormProps {
  onSuccess?: () => void;
  onCancel?: () => void; 
}
interface StepItem {
  id: number;
  label: string;
}


interface FormValues {
  brand?: string;
  insuranceType?: string;
  auctionType?: string;
  startDate?: any;
  endDate?: any;
  caseNumber?: string;
  region?: string;
  city?: string;
  isReady?: boolean;

  // Поля 2 шага (Основные данные)
  vin?: string;
  frame?: string;
  vehicle_type?: string;
  brand_select?: string;
  model_select?: string;
  generation?: string;
  year_select?: string;

  // Поля 3 шага (Дополнительные данные)
  body_type?: string;
  mileage?: string;
  damage_class?: string;
  pts_type?: string;
  engine_type?: string;
  engine_volume?: string;
  engine_power?: string;
  engine_damage?: string;
  drive_type?: string;
  transmission_type?: string;
  transmission_damage?: string;
  comments?: string;

  // Чекбоксы 3 шага
  chk_stopped_registration?: boolean;
  chk_no_free_fields?: boolean;
  chk_mvd_criminalistics?: boolean;
  chk_gai_docs?: boolean;
  chk_mvd_order?: boolean;
  chk_hidden_damage?: boolean;
  chk_stock_complect?: boolean;
  chk_sk_parking?: boolean;

  // Финальный 4 шаг (Файл изображения)
  startPrice?: string;
  image_file?: any;
}
export const CreateLotForm: React.FC<CreateLotFormProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>('Синий');
  const [form] = Form.useForm<FormValues>();

  const stepsData: StepItem[] = [
    { id: 0, label: 'Данные о лоте' },
    { id: 1, label: 'Основные данные об автомобиле' },
    { id: 2, label: 'Дополнительные характеристики' },
    { id: 3, label: 'Изображения лота' }
  ];
  const [formDataAccumulated, setFormDataAccumulated] = useState<Partial<FormValues>>({});
  
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


  const handleNextStep = async () => {
    try {
      const currentValues = form.getFieldsValue();
      const updatedData = { ...formDataAccumulated, ...currentValues };
      setFormDataAccumulated(updatedData);

      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        
        message.loading({ content: 'Загрузка фотографий в облако ImgBB...', key: 'upload_status' });
        
        let imageUrlsString = '';
        try {
          
          const uploadedUrls = await uploadImages(selectedFiles);
          imageUrlsString = uploadedUrls.join(','); 
          message.success({ content: 'Фотографии успешно загружены в облако!', key: 'upload_status', duration: 2 });
        } catch (uploadError: any) {
          console.error(uploadError);
          message.error({ content: `Сбой ImgBB: ${uploadError.message || 'не удалось загрузить фото'}`, key: 'upload_status' });
          return; 
        }

        const payload = {
          brand: updatedData.brand_select || 'Toyota',
          model: updatedData.model_select || 'Camry',
          year: Number(updatedData.year_select || 2024),
          vin: updatedData.vin || 'БЕЗ-VIN',
          vehicle_type: updatedData.vehicle_type || 'Легковой',
          region: updatedData.region || 'Москва',
          city: updatedData.city || 'Москва',
          auction_type: updatedData.auctionType || 'Открытый',
          startPrice: updatedData.startPrice || '1500000',
          transmission: updatedData.transmission_type || 'Автомат',
          mileage_km: Number(updatedData.mileage || 0),
          engine: `${updatedData.engine_volume || '2.5'} л / ${updatedData.engine_type || 'Бензин'}`,
          seller: 'ООО Альфа Страхование',
          mainImage: imageUrlsString 
        };

        await axios.post('http://localhost:3000/lots', payload);

        message.success('Лот успешно сохранен в PostgreSQL и запущен!');
        setFormDataAccumulated({});
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      message.error('Ошибка при сохранении данных шага');
    }
  };
  return (
    <div className="max-w-[1200px] mx-auto py-6 px-10 font-sans">
      <div className="text-xs text-[#a0a6b5] mb-2">Главная • Создание лота</div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[28px] font-bold text-[#163C66] m-0">Размещение лота</h2>
        <div className="bg-white border border-[#1c426d]/15 py-1.5 px-4 rounded-md text-sm font-semibold text-[#163C66]">
          14:59:15
        </div>
      </div>

          <Form form={form}  layout="vertical" preserve={true}>
        <div className="grid grid-cols-1 xl:grid-cols-[941px_1fr] gap-6 items-start">
          <div className="bg-[#F2F8FF] rounded-xl p-8 shadow-[0px_4px_20px_rgba(111,147,107,0.1)] box-border w-full">
            {currentStep === 0 && (
              <>
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Объект торгов*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="brand" initialValue="Транспортное средство" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Транспортное средство">Транспортное средство</Option>
                        <Option value="Спецтехника">Спецтехника</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="flex w-full h-12 bg-white border border-[rgba(166,60,60,0.3)] rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[rgba(166,60,60,1)] shrink-0">
                    Вид страхования*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="insuranceType" initialValue="Не выбрано" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Не выбрано">Не выбрано</Option>
                        <Option value="КАСКО">КАСКО</Option>
                        <Option value="ОСАГО">ОСАГО</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="flex w-full h-12 bg-white border border-[rgba(166,60,60,0.3)] rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[rgba(166,60,60,1)] shrink-0">
                    Тип аукциона*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="auctionType" initialValue="Не выбрано" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Не выбрано">Не выбрано</Option>
                        <Option value="Открытый">Открытый торг</Option>
                        <Option value="Закрытый">Слепой торг</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="flex w-full h-12 bg-white border border-[rgba(166,60,60,0.3)] rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[rgba(166,60,60,1)] shrink-0">
                    Начало торгов*
                  </div>
                  <div className="flex-grow h-full [&_.ant-picker]:w-full! [&_.ant-picker]:h-full! [&_.ant-picker]:border-none! [&_.ant-picker]:bg-transparent! [&_.ant-picker]:box-shadow-none! [&_.ant-picker]:pl-4! [&_.ant-picker_input]:text-base! [&_.ant-picker_input]:font-medium! [&_.ant-picker_input]:text-[#163C66]! [&_.ant-picker]:flex! [&_.ant-picker]:items-center!">
                    <Form.Item name="startDate" initialValue={dayjs('2023-01-16T15:30:00')} noStyle>
                      <DatePicker format="DD янв. YYYY | HH:mm" showTime suffixIcon={<CalendarOutlined className="text-[#163C66]" />} />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex w-full h-12 bg-white border border-[rgba(166,60,60,0.3)] rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[rgba(166,60,60,1)] shrink-0">
                    Окончание торгов*
                  </div>
                  <div className="flex-grow h-full [&_.ant-picker]:w-full! [&_.ant-picker]:h-full! [&_.ant-picker]:border-none! [&_.ant-picker]:bg-transparent! [&_.ant-picker]:box-shadow-none! [&_.ant-picker]:pl-4! [&_.ant-picker_input]:text-base! [&_.ant-picker_input]:font-medium! [&_.ant-picker_input]:text-[#163C66]! [&_.ant-picker]:flex! [&_.ant-picker]:items-center!">
                    <Form.Item name="endDate" initialValue={dayjs('2023-01-16T15:30:00')} noStyle>
                      <DatePicker format="DD янв. YYYY | HH:mm" showTime suffixIcon={<CalendarOutlined className="text-[#163C66]" />} />
                    </Form.Item>
                  </div>
                </div>
                <div className="h-12 bg-[rgba(111,147,107,0.15)] rounded-lg flex justify-between items-center px-4 mb-3.5 text-sm">
                  <span className="text-[#163c66]/70">Продолжительность торгов</span>
                  <span className="font-semibold text-[#163C66]">1 месяц, 4 недели, 1 день, 14 часов</span>
                </div>

                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Срок обязательств по предложению*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="obligationTerm" initialValue="45" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="45">45</Option>
                        <Option value="30">30</Option>
                        <Option value="60">60</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div className="flex w-full h-12 bg-white border border-[rgba(166,60,60,0.3)] rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[rgba(166,60,60,1)] shrink-0">
                    Номер дела*
                  </div>
                  <div className="flex-grow h-full [&_input]:w-full! [&_input]:h-full! [&_input]:border-none! [&_input]:bg-transparent! [&_input]:box-shadow-none! [&_input]:pl-4! [&_input]:text-base! [&_input]:font-medium! [&_input]:text-[#163C66]! [&_input]:flex! [&_input]:items-center!">
                    <Form.Item name="caseNumber" noStyle rules={[{ required: true, message: 'Заполните поле' }]}>
                      <Input placeholder="Номер дела" />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex w-full h-12 bg-white border border-[rgba(166,60,60,0.3)] rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[rgba(166,60,60,1)] shrink-0">
                    Регион*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="region" initialValue="Не выбрано" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Не выбрано">Не выбрано</Option>
                        <Option value="Центральный">Центральный регион</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="flex w-full h-12 bg-white border border-[rgba(166,60,60,0.3)] rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[rgba(166,60,60,1)] shrink-0">
                    Город*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="city" initialValue="Не выбрано" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Не выбрано">Не выбрано</Option>
                        <Option value="Москва">Москва</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2.5 text-sm text-[#163C66]">
                  <Form.Item name="isReady" valuePropName="checked" noStyle>
                    <Checkbox defaultChecked className="accent-[#163C66]" />
                  </Form.Item>
                  <span className="font-medium">Лот готов к реализации</span>
                </div>
              </>
            )}
             
            {currentStep === 1 && (
              <>
                {/* 1. VIN номер */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    VIN номер*
                  </div>
                  <div className="flex-grow h-full [&_input]:w-full! [&_input]:h-full! [&_input]:border-none! [&_input]:bg-transparent! [&_input]:box-shadow-none! [&_input]:pl-4! [&_input]:text-base! [&_input]:font-medium! [&_input]:text-[#163C66]! [&_input]:flex! [&_input]:items-center!">
                    <Form.Item name="vin" rules={[{ required: true, message: 'Введите VIN' }]}>
                      <Input placeholder="Введите VIN номер" maxLength={17} />
                    </Form.Item>
                  </div>
                </div>

                {/* 2. Frame номер */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Frame номер
                  </div>
                  <div className="flex-grow h-full [&_input]:w-full! [&_input]:h-full! [&_input]:border-none! [&_input]:bg-transparent! [&_input]:box-shadow-none! [&_input]:pl-4! [&_input]:text-base! [&_input]:font-medium! [&_input]:text-[#163C66]! [&_input]:flex! [&_input]:items-center!">
                    <Form.Item name="frame" noStyle>
                      <Input placeholder="Для японских автомобилей (если нет VIN)" />
                    </Form.Item>
                  </div>
                </div>
               
                {/* 3. Тип авто */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Тип авто*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="vehicle_type" initialValue="Легковой" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Легковой">Легковой автомобили</Option>
                        <Option value="Внедорожник">Внедорожник / Кроссовер</Option>
                        <Option value="Коммерческий">Коммерческий транспорт</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 4. Марка авто */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Марка авто*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="brand_select" initialValue="BMW" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="BMW">BMW</Option>
                        <Option value="Mercedes-Benz">Mercedes-Benz</Option>
                        <Option value="Audi">Audi</Option>
                        <Option value="Toyota">Toyota</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 5. Модель авто */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Модель авто*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="model_select" initialValue="X5" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="X5">X5</Option>
                        <Option value="X6">X6</Option>
                        <Option value="E-Class">E-Class</Option>
                        <Option value="Camry">Camry</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 6. Поколение */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Поколение*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="generation" initialValue="G05 рестайлинг" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="G05 рестайлинг">G05 рестайлинг (2023 — н.в.)</Option>
                        <Option value="F15">F15 (2013 — 2018)</Option>
                        <Option value="E70">E70 (2006 — 2013)</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 7. Год выпуска */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-6 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Год выпуска*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="year_select" initialValue="2023" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="2024">2024</Option>
                        <Option value="2023">2023</Option>
                        <Option value="2022">2022</Option>
                        <Option value="2021">2021</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* Кнопки навигации снизу панели контента */}
                <div className="flex gap-4 mt-4">
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(prev => prev - 1)} 
                    className="bg-white border border-[#163C66] text-[#163C66] py-2.5 px-6 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Назад
                  </button>
                </div>
              </>
            )}
             {currentStep === 2 && (
              <>
                {/* 1. Кузов */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Кузов*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="body_type" initialValue="Внедорожник" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Внедорожник">Внедорожник</Option>
                        <Option value="Седан">Седан</Option>
                        <Option value="Хэтчбек">Хэтчбек</Option>
                        <Option value="Универсал">Универсал</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 2.  Выбор Цвета  */}
                <div className="flex flex-col w-full bg-white border border-[#163c66]/15 rounded-lg p-4 mb-3.5 box-border">
                  <div className="flex items-center gap-2 mb-3 text-xs text-[#8C9091]">
                    <span>Цвет:</span>
                    <span className="font-bold text-[#163C66] bg-[#F2F8FF] px-2 py-0.5 rounded text-xs border border-[#163c66]/10">
                      {selectedColor}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {[
                      { name: 'Черный', hex: '#000000' },
                      { name: 'Белый', hex: '#FFFFFF', border: true },
                      { name: 'Серый', hex: '#808080' },
                      { name: 'Синий', hex: '#0000FF' },
                      { name: 'Голубой', hex: '#00BFFF' },
                      { name: 'Красный', hex: '#FF0000' },
                      { name: 'Бордовый', hex: '#800020' },
                      { name: 'Оранжевый', hex: '#FFA500' },
                      { name: 'Желтый', hex: '#FFFF00', border: true },
                      { name: 'Зеленый', hex: '#008000' },
                      { name: 'Фиолетовый', hex: '#800080' },
                      { name: 'Коричневый', hex: '#A52A2A' },
                    ].map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        style={{ backgroundColor: color.hex }}
                        className={`w-6 h-6 rounded-full cursor-pointer relative transition-all duration-200 ${
                          color.border ? 'border border-gray-300' : ''
                        } ${
                          selectedColor === color.name 
                            ? 'scale-125 ring-2 ring-offset-2 ring-[#163C66] z-10' 
                            : 'hover:scale-110 opacity-90'
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* 3. Пробег, км */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Пробег, км*
                  </div>
                  <div className="flex-grow h-full [&_input]:w-full! [&_input]:h-full! [&_input]:border-none! [&_input]:bg-transparent! [&_input]:box-shadow-none! [&_input]:pl-4! [&_input]:text-base! [&_input]:font-medium! [&_input]:text-[#163C66]! [&_input]:flex! [&_input]:items-center!">
                    <Form.Item name="mileage" rules={[{ required: true, message: 'Введите пробег' }]}>
                      <Input placeholder="Введите точный пробег автомобиля" inputMode="numeric" pattern="[0-9]*" />
                    </Form.Item>
                  </div>
                </div>

                {/* 4. Классификация повреждений */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Классификация*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="damage_class" initialValue="Не выбрано" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Не выбрано">Не выбрано</Option>
                        <Option value="Легкие повреждения">Легкие повреждения (царапины/сколы)</Option>
                        <Option value="Средние повреждения">Средние повреждения (кузовные детали)</Option>
                        <Option value="Тяжелые повреждения">Тяжелые повреждения (геометрия/ДТП)</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 5. Паспорт (ПТС) */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Паспорт (ПТС)*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="pts_type" initialValue="Оригинал" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Оригинал">Оригинал</Option>
                        <Option value="Дубликат">Дубликат</Option>
                        <Option value="Электронный">Электронный (ЭПТС)</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* ЧЕКБОКСЫ БЛОК 1: Юридические отметки (ПТС / ГИБДД) */}
                <div className="flex flex-col gap-3 bg-white border border-[#163c66]/15 rounded-lg p-4 mb-5 text-sm text-[#163C66]">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_stopped_registration" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>Отметка о прекращении регистрации на основе Админ. регламента (ГИБДД)</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_no_free_fields" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>В ПТС нет свободных полей</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_mvd_criminalistics" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>Отметки МВД о прохождении криминалистики</span>
                  </label>
                </div>

                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Тип двигателя*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="engine_type" initialValue="Бензин" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Бензин">Бензин</Option>
                        <Option value="Дизель">Дизель</Option>
                        <Option value="Гибрид">Гибрид</Option>
                        <Option value="Электро">Электро</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 7. Объем двигателя */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Объем двигателя*
                  </div>
                  <div className="flex-grow h-full [&_input]:w-full! [&_input]:h-full! [&_input]:border-none! [&_input]:bg-transparent! [&_input]:box-shadow-none! [&_input]:pl-4! [&_input]:text-base! [&_input]:font-medium! [&_input]:text-[#163C66]! [&_input]:flex! [&_input]:items-center!">
                    <Form.Item name="engine_volume" initialValue="3.0" noStyle>
                      <Input placeholder="Например: 2.0 / 3.0 / 4.4" />
                    </Form.Item>
                  </div>
                </div>

                {/* 8. Мощность двигателя */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Мощность, л.с.*
                  </div>
                  <div className="flex-grow h-full [&_input]:w-full! [&_input]:h-full! [&_input]:border-none! [&_input]:bg-transparent! [&_input]:box-shadow-none! [&_input]:pl-4! [&_input]:text-base! [&_input]:font-medium! [&_input]:text-[#163C66]! [&_input]:flex! [&_input]:items-center!">
                    <Form.Item name="engine_power" initialValue="340" noStyle>
                      <Input placeholder="Введите мощность в л.с." inputMode="numeric" pattern="[0-9]*" />
                    </Form.Item>
                  </div>
                </div>

                {/* 9. Повреждения двигателя */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Повреждения ДВС*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="engine_damage" initialValue="Отсутствуют" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Отсутствуют">Отсутствуют</Option>
                        <Option value="Требует ремонта">Требует мелкого ремонта</Option>
                        <Option value="Не на ходу / Заклинен">Не запускается / Заклинен</Option>
                        <Option value="Частично разобран">Частично разобран</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 10. Привод */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Привод*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="drive_type" initialValue="Полный" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Полный">Полный привод (4WD)</Option>
                        <Option value="Передний">Передний привод (FWD)</Option>
                        <Option value="Задний">Задний привод (RWD)</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 11. Коробка передач */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-3.5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Коробка передач*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="transmission_type" initialValue="Автомат" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Автомат">Автомат (АКПП)</Option>
                        <Option value="Механика">Механика (МКПП)</Option>
                        <Option value="Робот">Робот (РКПП)</Option>
                        <Option value="Вариатор">Вариатор (CVT)</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                {/* 12. Повреждение КПП */}
                <div className="flex w-full h-12 bg-white border border-[#163c66]/15 rounded-lg overflow-hidden mb-5 items-center">
                  <div className="w-[180px] h-full bg-white border-r border-[#163c66]/15 flex items-center pl-4 text-xs text-[#8C9091] shrink-0">
                    Повреждения КПП*
                  </div>
                  <div className="flex-grow h-full [&_.ant-select-selector]:w-full! [&_.ant-select-selector]:h-full! [&_.ant-select-selector]:border-none! [&_.ant-select-selector]:bg-transparent! [&_.ant-select-selector]:box-shadow-none! [&_.ant-select-selector]:pl-4! [&_.ant-select-selector]:text-base! [&_.ant-select-selector]:font-medium! [&_.ant-select-selector]:text-[#163C66]! [&_.ant-select-selector]:flex! [&_.ant-select-selector]:items-center!">
                    <Form.Item name="transmission_damage" initialValue="Отсутствуют" noStyle>
                      <Select suffixIcon={null}>
                        <Option value="Отсутствуют">Отсутствуют</Option>
                        <Option value="Аварийный режим">Коробка в аварийном режиме</Option>
                        <Option value="Механический дефект">Разбит корпус / Не переключает</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

               {/* ВТОРОЙ БЛОК ЧЕКБОКСОВ */}
                <div className="flex flex-col gap-3 bg-white border border-[#163c66]/15 rounded-lg p-4 mb-5 text-sm text-[#163C66]">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_gai_docs" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>Возможно наличие справки о снятии ТС с учета и передачи ПТС в ГИБДД</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_mvd_order" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>Прекращение регистрации ТС на основании приказа МВД России</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_hidden_damage" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>Возможны скрытые механические повреждения</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_stock_complect" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>ТС (ГОТС) передается согласно штатной комплектации</span>
                  </label>
                  
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <Form.Item name="chk_sk_parking" valuePropName="checked" noStyle>
                      <Checkbox className="mt-0.5" />
                    </Form.Item>
                    <span>ГОТС на стоянке СК</span>
                  </label>
                </div>
              

                {/* Поле для комментариев  */}
                <div className="flex flex-col w-full bg-white border border-[#163c66]/15 rounded-lg p-4 mb-6 box-border">
                  <span className="block text-xs text-[#8C9091] mb-2 font-medium">Комментарий / Примечание</span>
                  <Form.Item name="comments" noStyle>
                    <Input.TextArea 
                      rows={4} 
                      placeholder="Опишите детальное состояние автомобиля, скрытые дефекты или особенности комплектации..." 
                      className="w-full border border-gray-200! rounded-lg p-2.5 text-sm text-[#163C66] outline-none resize-none focus:border-[#163C66]!"
                    />
                  </Form.Item>
                </div>

                <div className="flex gap-4 mt-2">
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(prev => prev - 1)} 
                    className="bg-white border border-[#163C66] text-[#163C66] py-2.5 px-6 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Назад
                  </button>
                </div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <div className="flex flex-col w-full bg-white border border-[#163c66]/15 rounded-lg p-6 mb-5 box-border">
                  <h3 className="text-base font-bold text-[#163C66] mb-1">Фотографии к лоту</h3>
                  <p className="text-xs text-[#8C9091] mb-4">Загрузите фотографии автомобиля. Максимальный размер файла — 5 МБ.</p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative w-[150px] h-[100px] overflow-hidden rounded-lg border border-gray-200 shadow-sm group">
                        <img src={preview} alt={`Превью ${index + 1}`} className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => {
                            setImagePreviews(prev => prev.filter((_, i) => i !== index));
                            setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                          }} 
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center border-none text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          &times;
                        </button>
                      </div>
                    ))}

                    <Form.Item name="image_file" valuePropName="file" noStyle>
                      <div className="border-2 border-dashed border-[#163c66]/20 hover:border-[#163C66] rounded-xl p-6 text-center bg-[#F2F8FF]/30 cursor-pointer transition-colors relative w-full box-border">
                        <input 
                          type="file" 
                          accept="image/*"
                          multiple 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              const filesArray = Array.from(e.target.files);
                              setSelectedFiles(prev => [...prev, ...filesArray]);
                              
                              const newPreviews = filesArray.map(file => URL.createObjectURL(file));
                              setImagePreviews(prev => [...prev, ...newPreviews]);
                              message.success(`Успешно выбрано фото: ${filesArray.length}`);
                            }
                          }}
                        />
                        <div className="text-2xl mb-1">📸</div>
                        <p className="text-sm text-[#163C66] font-medium m-0">Перетащите фотографии автомобиля</p>
                        <p className="text-xs text-[#8C9091] mt-0.5 m-0">или нажмите для выбора на компьютере</p>
                      </div>
                    </Form.Item>
                  </div>
                </div>

                <div className="flex flex-col w-full bg-white border border-[#163c66]/15 rounded-lg p-6 mb-6 box-border">
                  <h3 className="text-base font-bold text-[#163C66] mb-1">Документ к лоту</h3>
                  <p className="text-xs text-[#8C9091] mb-4">Выписка из электронного ПТС, информационные отчеты (PDF).</p>
                  
                  <div className="flex flex-col gap-3 w-full">
                    {pdfName && (
                      <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 p-2.5 rounded-lg text-xs font-medium">
                        <span>📄</span>
                        <span className="truncate flex-grow">{pdfName}</span>
                        <button type="button" onClick={() => setPdfName(null)} className="bg-transparent border-none text-green-700 font-bold cursor-pointer">&times;</button>
                      </div>
                    )}

                    <div className="border-2 border-dashed border-[#163c66]/20 hover:border-[#163C66] rounded-xl p-6 text-center bg-gray-50/50 relative">
                      <input 
                        type="file" 
                        accept=".pdf" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setPdfName(e.target.files[0].name); 
                            message.success(`Документ прикреплен`);
                          }
                        }}
                      />
                      <div className="text-2xl mb-1">📄</div>
                      <p className="text-sm text-[#163C66] font-medium m-0">Перетащите PDF документы</p>
                    </div>
                  </div>
                </div>

                <button type="button" onClick={() => setCurrentStep(prev => prev - 1)} className="bg-white border border-[#163C66] text-[#163C66] py-2.5 px-6 rounded-lg cursor-pointer text-sm font-medium">Назад</button>
              </>
            )}
          </div>

          {/* ПРАВАЯ БОКОВАЯ ПАНЕЛЬ: Статус шагов и кнопка отправки на Nest.js */}
          <div className="w-full xl:w-auto">
            <div className="bg-[#F2F8FF] rounded-xl p-8 px-6 min-h-[400px] box-border w-full xl:w-[280px]">
              <ul className="list-none p-0 m-0 flex flex-col gap-8">
                {stepsData.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <li key={step.id} className="flex items-start gap-3 relative group">
                      {step.id !== stepsData.length - 1 && (
                        <div className="absolute left-[14px] top-[30px] w-[1px] h-[34px] bg-[#163c66]/15" />
                      )}
                      <div className={`w-7 h-7 rounded-full border flex justify-center items-center text-xs font-semibold shrink-0 transition-all ${
                        isActive 
                          ? 'border-[#163C66] text-[#163C66] bg-white ring-4 ring-[#163c66]/10' 
                          : isCompleted 
                            ? 'bg-[#163C66] border-[#163C66] text-white' 
                            : 'border-[#163c66]/30 bg-white text-[#163c66]/50'
                      }`}>
                        {step.id + 1}
                      </div>
                      <div className={`text-xs leading-tight pt-1 transition-colors ${
                        isActive ? 'text-[#163C66] font-medium' : 'text-[#163c66]/40'
                      }`}>
                        {step.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="mt-10 flex justify-end w-full">
              <button 
                type="button" 
                className="w-full h-12 bg-[#163C66] text-white border-none rounded-lg text-base font-medium cursor-pointer hover:bg-[#0f2b4c] transition-colors" 
                onClick={handleNextStep}
              >
                {currentStep === 3 ? 'Запустить лот ➔' : 'Далее ➔'}
              </button>
            </div>
          </div>

        </div>
      </Form>
    </div>
  );
};


































  

             {/* {currentStep === 3 && (
              <>
                <div className="flex flex-col w-full bg-white border border-[#163c66]/15 rounded-lg p-6 mb-5 box-border">
                  <h3 className="text-base font-bold text-[#163C66] mb-1">Фотографии к лоту</h3>
                  <p className="text-xs text-[#8C9091] mb-4">Загрузите главное фото автомобиля. Максимальный размер файла — 5 МБ.</p>
                  
                  <Form.Item name="image_file" valuePropName="file" noStyle>
                    <div className="border-2 border-dashed border-[#163c66]/20 hover:border-[#163C66] rounded-xl p-8 text-center bg-[#F2F8FF]/30 cursor-pointer transition-colors relative group">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            // Сохраняем файл в инстанс формы Ant Design вручную
                            form.setFieldsValue({ image_file: e.target.files[0] });
                            message.success(`Файл ${e.target.files[0].name} успешно выбран`);
                          }
                        }}
                      />
                      <div className="text-3xl mb-2">📸</div>
                      <p className="text-sm text-[#163C66] font-medium m-0">
                        Перетащите фотографию, чтобы добавить её к лоту
                      </p>
                      <p className="text-xs text-[#8C9091] mt-1 m-0">или нажмите, чтобы выбрать на компьютере</p>
                    </div>
                  </Form.Item>
                </div>

                <div className="flex flex-col w-full bg-white border border-[#163c66]/15 rounded-lg p-6 mb-6 box-border">
                  <h3 className="text-base font-bold text-[#163C66] mb-1">Документ к лоту</h3>
                  <p className="text-xs text-[#8C9091] mb-4">Выписка из электронного ПТС, информационные отчеты (PDF).</p>
                  
                  <div className="border-2 border-dashed border-[#163c66]/20 rounded-xl p-8 text-center bg-gray-50/50 relative">
                    <input type="file" accept=".pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled />
                    <div className="text-3xl mb-2">📄</div>
                    <p className="text-sm text-[#163C66] font-medium m-0">Перетащите PDF документы, чтобы добавить их к лоту</p>
                    <p className="text-xs text-[#8C9091] mt-1 m-0">Функционал проверки документов настраивается модератором</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(prev => prev - 1)} 
                    className="bg-white border border-[#163C66] text-[#163C66] py-2.5 px-6 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Назад
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ПРАВАЯ СТОРОНА: Меню шагов и главная кнопка управления */}
          {/* <div className="w-full xl:w-auto">
            <div className="bg-[#F2F8FF] rounded-xl p-8 px-6 min-h-[400px] box-border">
              <ul className="list-none p-0 m-0 flex flex-col gap-8">
                {stepsData.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <li key={step.id} className="flex items-start gap-3 relative group">
                      {step.id !== stepsData.length - 1 && (
                        <div className="absolute left-[14px] top-[30px] w-[1px] h-[34px] bg-[#163c66]/15" />
                      )}
                      <div className={`w-7 h-7 rounded-full border flex justify-center items-center text-xs font-semibold shrink-0 transition-all ${
                        isActive 
                          ? 'border-[#163C66] text-[#163C66] bg-white ring-4 ring-[#163c66]/10' 
                          : isCompleted 
                            ? 'bg-[#163C66] border-[#163C66] text-white' 
                            : 'border-[#163c66]/30 bg-white text-[#163c66]/50'
                      }`}>
                        {step.id + 1}
                      </div>
                      <div className={`text-xs leading-tight pt-1 transition-colors ${
                        isActive ? 'text-[#163C66] font-medium' : 'text-[#163c66]/40'
                      }`}>
                        {step.label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="mt-10 flex justify-end w-full">
              <button
                type="button" 
                className="w-full h-12 bg-[#163C66] text-white border-none rounded-lg text-base font-medium cursor-pointer hover:bg-[#0f2b4c] transition-colors"
                onClick={handleNextStep}
              >
                {currentStep === 3 ? 'Запустить лот ➔' : 'Далее ➔'}
              </button>
            </div>
          </div>

        </div>
      </Form>
    </div>
  );
};
           
           */} 
         