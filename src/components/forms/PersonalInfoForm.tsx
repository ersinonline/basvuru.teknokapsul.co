import React from 'react';

interface PersonalInfoFormProps {
  name: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  name,
  email,
  phone,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Kişisel Bilgiler</h3>
      <div className="space-y-4">
        <input
          type="text"
          required
          placeholder="İsim Soyisim"
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#ffb700] focus:ring-2 focus:ring-[#ffb700] focus:ring-opacity-50 transition-colors"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
        />
        <input
          type="tel"
          required
          placeholder="Telefon Numarası"
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#ffb700] focus:ring-2 focus:ring-[#ffb700] focus:ring-opacity-50 transition-colors"
          value={phone}
          onChange={(e) => onChange('phone', e.target.value)}
        />
        <input
          type="email"
          required
          placeholder="E-posta Adresi"
          className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#ffb700] focus:ring-2 focus:ring-[#ffb700] focus:ring-opacity-50 transition-colors"
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
        />
      </div>
    </div>
  );
};