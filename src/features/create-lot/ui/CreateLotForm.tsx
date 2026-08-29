
import React, { useState } from 'react';
import { Form, Select, DatePicker, Input, Checkbox, message } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
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
  brand: string;
  insuranceType: string;
  auctionType: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  obligationTerm: string;
  caseNumber: string;
  region: string;
  city: string;
  isReady: boolean;
}

export const CreateLotForm: React.FC<CreateLotFormProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm<FormValues>();

  const stepsData: StepItem[] = [
    { id: 0, label: 'Данные о лоте' },
    { id: 1, label: 'Основные данные об автомобиле' },
    { id: 2, label: 'Дополнительные характеристики' },
    { id: 3, label: 'Изображения лота' }
  ];

  const handleNextStep = async () => {
    try {
      const values = await form.validateFields();
      
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmitData(values);
      }
    } catch (error) {
      message.error('Заполните обязательные поля перед переходом!');
    }
  };

  const handleSubmitData = (finalValues: FormValues) => {
    const payload = {
      brand: finalValues.brand === 'Транспортное средство' ? 'BMW' : finalValues.brand,
      model: "X5", 
      year: 2023,
      vin: finalValues.caseNumber || "WBAJS71000XXXXXXX",
      startPrice: 30000,
      currentPrice: 30000,
      auction_type: finalValues.auctionType || "Открытый",
      endDate: finalValues.endDate ? finalValues.endDate.toISOString() : new Date().toISOString(),
      mainImage: "placeholder.jpg",
      damageImages: [],
      documents: [finalValues.insuranceType || "КАСКО.pdf"]
    };

    axios.post('http://localhost:5000/lots', payload)
      .then(() => {
        message.success('Лот успешно создан и добавлен в базу торгов!');
        if (onSuccess) onSuccess();
      })
      .catch(() => message.error('Ошибка сохранения данных на сервере.'));
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

          <Form form={form}>
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

            {currentStep > 0 && (
              <div className="p-10 text-center text-[#163C66]">
                <h3 className="text-lg font-bold mb-2">Компоненты шага {currentStep + 1} в разработке...</h3>
                <p className="text-sm opacity-80">Логика переключения стейтов работает корректно.</p>
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(prev => prev - 1)} 
                  className="mt-5 bg-white border border-[#163C66] text-[#163C66] py-2 px-5 rounded-lg cursor-pointer text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Назад
                </button>
              </div>
            )}
          </div>
          <div className="w-full xl:w-auto">
            <div className="bg-[#F2F8FF] rounded-xl p-8 px-6 min-h-[400px] box-border">
              <ul className="list-none p-0 m-0 flex flex-col gap-8">
                {stepsData.map((step) => {
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  return (
                    <li 
                      key={step.id} 
                      className="flex items-start gap-3 relative group"
                    >
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
                                {currentStep === 3 ? 'Сохранить лот ➔' : 'Далее ➔'}
              </button>
            </div>
          </div>

        </div>
      </Form>
    </div>
  );
};
