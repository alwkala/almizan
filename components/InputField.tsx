import React from 'react';

/**
 * Props for the InputField component.
 */
interface InputFieldProps {
  /** The text label displayed above the input field. */
  label: string;
  /** The current numerical value of the input. */
  value: number;
  /** The callback function to execute when the input value changes. */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** The icon component to be displayed inside the input field. */
  icon: React.ElementType;
  /** The unit of measurement (e.g., 'SAR', 'وحدة') to display inside the input field. */
  unit: string;
  /** Optional placeholder text */
  placeholder?: string;
  /** Optional minimum value */
  min?: number;
  /** Optional maximum value */
  max?: number;
  /** Optional step value for number input */
  step?: number;
}

/**
 * A reusable styled input field component designed for numerical inputs.
 * It includes a label, an icon, and a unit display.
 *
 * @param {InputFieldProps} props - The props for the component.
 * @returns {React.ReactElement} The rendered input field component.
 */
const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  icon: Icon,
  unit,
  placeholder = "0",
  min = 0,
  max,
  step = 1
}) => {
  return (
    <div className="group">
      <label className="block text-sm font-semibold text-dark-charcoal mb-2 transition-colors duration-200 group-focus-within:text-electric-teal">
        {label}
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 sm:ps-4">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-gray transition-colors duration-200 group-focus-within:text-electric-teal" />
        </div>
        <input
          type="number"
          value={value}
          onChange={onChange}
          className="bg-pure-white border-2 border-light-gray text-dark-charcoal text-sm rounded-xl focus:ring-2 focus:ring-electric-teal/20 focus:border-electric-teal block w-full ps-10 sm:ps-12 pe-10 sm:pe-12 p-2.5 sm:p-3 transition-all duration-200 hover:border-slate-gray focus:outline-none shadow-sm hover:shadow-md focus:shadow-lg"
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          aria-label={label}
        />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3 sm:pe-4">
          <span className="text-xs sm:text-sm font-medium text-slate-gray bg-light-gray/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputField;
