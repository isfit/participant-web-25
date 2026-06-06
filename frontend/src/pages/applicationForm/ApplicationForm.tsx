import React, { useState, useEffect } from 'react';
import { Button } from '@radix-ui/themes';
import Header from '../../components/Header/Header';
import './ApplicationForm.css';
import { IApplicationForm } from '../../types/types';
import { apply } from '../../api/application';
import { Navigate } from 'react-router-dom';
import { getContinentFromNationality } from './nationality';
import { countryCodes } from './countryCodes.ts';
import {
  personalDetails,
  themeSection,
  financialSupportSection,
  consentSection,
} from './sections';
import getSummary from '../../utils/summary.tsx';
import CustomToast from './toast';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthenticationContext.tsx';

const steps = [
  'Personal Details',
  'Theme',
  'Financial Support',
  'Consent',
  'Summary',
];

interface FormField {
  label: string;
  labelElement?: JSX.Element;
  name: keyof IApplicationForm;
  type: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

const ApplicationForm: React.FC = () => {
  const { user } = useAuth();

  const [formValues, setFormValues] = useState<IApplicationForm>(() => {
    const savedForm = localStorage.getItem('applicationForm');
    return savedForm
      ? JSON.parse(savedForm)
      : {
          fullName: '',
          email: user?.email || '',
          phoneNumber: '',
          dateOfBirth: '',
          gender: '',
          nationality: '',
          continent: '',
          residenceCountry: '',
          isStudent: false,
          studyField: '',
          university: '',
          universityWebsite: '',
          how: '',
          studentCertificate: undefined,
          isEnglishSpeaker: false,
          applyingAs: '',
          themeCWThoughts: '',
          countryCW: '',
          contribution: '',
          financialSupportReason: '',
          fullOrPartialFunding: '',
          dependents: 0,
          familyIncome: '',
          countryTravelingFrom: '',
          otherFundingInfo: '',
          canParticipate: '',
          consentVisa: '',
          consentFlight: false,
          consentNorwegianLaw: false,
          consentReturn: false,
          consentPersonalDetails: false,
          consentAttendance: false,
          consentMedia: '',
        };
  });
  const [redirect, setRedirect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(['']);
  const [toastTitle, setToastTitle] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      setFormValues((prevState) => ({
        ...prevState,
        dateOfBirth: `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`,
      }));
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from(
    {
      length:
        selectedMonth && selectedYear
          ? daysInMonth(parseInt(selectedMonth), parseInt(selectedYear))
          : 31,
    },
    (_, i) => i + 1,
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  useEffect(() => {
    localStorage.setItem('applicationForm', JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    if (!visitedSteps.includes(currentStep)) {
      setVisitedSteps([...visitedSteps, currentStep]);
    }
  }, [currentStep, visitedSteps]);

  useEffect(() => {
    if (user?.email) {
      setFormValues((prevState) => ({
        ...prevState,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    setFormValues((prevState) => {
      const updatedValues = {
        ...prevState,
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
      };

      // Update the continent field based on the selected nationality
      if (name === 'nationality') {
        const continent = getContinentFromNationality(value);
        updatedValues['continent'] = continent;
      }

      return updatedValues;
    });

    // Handling the "dependents" field
    if (name === 'dependents') {
      const numericValue = parseInt(value, 10);
      if (numericValue < 0) {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: 0,
        }));
        return;
      }
    }

    // Updating text areas with word limit constraints
    if (type === 'textarea') {
      const wordCount = value.trim().split(/\s+/).length;
      if (
        ((name === 'themeCWThoughts' || name === 'otherFundingInfo' || name === 'how') &&
          wordCount <= 100) ||
        ((name === 'countryCW' ||
          name === 'contribution' ||
          name === 'financialSupportReason') &&
          wordCount <= 300)
      ) {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
      }));
    }

    // Separate state update for nationality/continent logic
    if (name === 'nationality') {
      const continent = getContinentFromNationality(value);
      setFormValues((prevState) => ({
        ...prevState,
        continent,
      }));
    }
  };

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'countryCode') {
      setCountryCode(value);

      setFormValues((prevState) => ({
        ...prevState,
        phoneNumber: `${value}${prevState.phoneNumber.replace(countryCode, '')}`,
      }));
    }

    if (name === 'phoneNumber') {
      setFormValues((prevState) => ({
        ...prevState,
        phoneNumber: `${countryCode}${value.replace(countryCode, '')}`,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const file = e.target.files?.[0];

    if (file) {
      if (!['application/pdf'].includes(file.type)) {
        alert('File must be a PDF.');
        e.target.value = '';
        return;
      }
      if (file.size > 1.8 * 1024 * 1024) {
        // 1.8 MB limit
        alert('File size exceeds 1.8 MB');
        e.target.value = '';
        return;
      }
    }

    setFormValues((prevState) => ({
      ...prevState,
      [name]: file || undefined,
    }));
  };

  const validateStep = () => {
    const currentFields = getCurrentFields();
    const stepErrors: string[] = [];
    currentFields.forEach((field) => {
      if (field.required && !formValues[field.name]) {
        stepErrors.push(field.label);
      }
    });

    if (stepErrors.length > 0) {
      setToastTitle('Missing Required Fields');
      setToastMessage(stepErrors);
      setToastOpen(true);
      return false;
    }
    setToastOpen(false);
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (visitedSteps.includes(index)) {
      setCurrentStep(index);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      return;
    }

    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (key === 'studentCertificate' && value) {
        formData.append(key, value as File);
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await apply(formData);
      if (response.status === 201) {
        setSubmitted(true);
        localStorage.removeItem('applicationForm');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  if (redirect) {
    return <Navigate to="/homepage" />;
  }

  const summarySection: Array<{
    label: string;
    name: keyof IApplicationForm;
    type: string;
    placeholder?: string;
    required?: boolean;
  }> = [
    { label: 'Summary', name: 'summary', type: 'summary' },
    {
      label: 'I agree that this information is correct.',
      name: 'summaryCheck',
      type: 'checkbox',
      required: true,
    },
  ];

  const renderInput = ({
    label,
    labelElement,
    name,
    type,
    options,
    placeholder,
    required,
  }: FormField) => {
    if (name === 'dateOfBirth') {
      return (
        <label key={name} className="formSection">
          <p>{label}</p>
          <div className="dobContainer">
            <select
              name="day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              required
              className="dobInput"
            >
              <option value="" disabled>
                Day
              </option>
              {days.map((day) => (
                <option key={day} value={String(day)}>
                  {day}
                </option>
              ))}
            </select>
            <select
              name="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              required
              className="dobInput"
            >
              <option value="" disabled>
                Month
              </option>
              {months.map((month) => (
                <option key={month} value={String(month).padStart(2, '0')}>
                  {new Date(0, month - 1).toLocaleString('default', {
                    month: 'long',
                  })}
                </option>
              ))}
            </select>
            <select
              name="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              required
              className="dobInput"
            >
              <option value="" disabled>
                Year
              </option>
              {years.map((year) => (
                <option key={year} value={String(year)}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </label>
      );
    }
    if (name === 'continent') {
      const nationality = formValues['nationality'];
      const continent = getContinentFromNationality(nationality);
      return (
        <label key={name} className="formSection">
          <p>{label}</p>
          <input
            type={type}
            name={name}
            value={continent}
            onChange={handleChange}
            className="formInput"
            required={required}
            placeholder={placeholder}
            disabled
          />
        </label>
      );
    }

    if (name === 'phoneNumber') {
      return (
        <label key={name} className="formSection">
          <p>{label}</p>
          <div className="phoneInputContainer">
            <select
              name="countryCode"
              value={countryCode}
              onChange={handlePhoneNumberChange}
              className="countryCodeSelect formInput"
            >
              <option value="" disabled>
                Select an option
              </option>
              {countryCodes.map((country) => (
                <option
                  key={`${country.name}-${country.code}`} // Ensure uniqueness
                  value={country.code}
                >
                  {country.name} ({country.code})
                </option>
              ))}
            </select>
            <input
              type="text"
              name={name}
              value={formValues[name].replace(countryCode, '')}
              onChange={handlePhoneNumberChange}
              className="formInput phoneNumberInput"
              required={required}
              placeholder={placeholder}
            />
          </div>
        </label>
      );
    }

    if (type === 'checkbox') {
      return (
        <label key={name} className="formSection">
          <div className="checkboxContainer">
            <input
              type="checkbox"
              name={name}
              checked={Boolean(formValues[name])}
              onChange={handleChange}
              className="checkboxInput"
              required={required}
            />
            <span className="checkboxLabel">{labelElement || label}</span>
          </div>
        </label>
      );
    }

    if (type === 'textarea') {
      return (
        <label key={name} className="formSection">
          <p>{label}</p>
          <textarea
            name={name}
            value={formValues[name] as string}
            onChange={handleChange}
            className="formInput"
            required={required}
            placeholder={placeholder}
          />
        </label>
      );
    }

    if (type === 'summary') {
      return getSummary();
    }

    return (
      <label key={name} className="formSection">
        <p>{labelElement || label}</p>
        {type === 'textarea' && (
          <textarea
            name={name}
            value={formValues[name] as string}
            onChange={handleChange}
            className="formInput"
            required={required}
            placeholder={placeholder}
          />
        )}
        {type === 'file' && (
          <div className="fileInputContainer">
            <label className="customFileInputLabel">
              <div className="customFileInputText">Choose File</div>
              <input
                type="file"
                name={name}
                onChange={handleFileChange}
                className="fileInput"
                required={required}
                accept=".pdf"
              />
            </label>
            {formValues[name] && formValues[name] instanceof File && (
              <div className="fileInfo">
                <p>
                  Uploaded file: {(formValues[name] as unknown as File).name}
                </p>
              </div>
            )}
          </div>
        )}
        {type === 'select' && (
          <select
            name={name}
            value={formValues[name] as string}
            onChange={handleChange}
            className="formInput"
            required={required}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        {type !== 'textarea' &&
          type !== 'file' &&
          type !== 'select' &&
          type !== 'checkbox' && (
            <input
              type={type}
              name={name}
              value={formValues[name] as string | number | undefined}
              onChange={handleChange}
              className="formInput"
              required={required}
              placeholder={placeholder}
            />
          )}
      </label>
    );
  };

  const getCurrentFields = () => {
    switch (currentStep) {
      case 0:
        return personalDetails;
      case 1:
        return themeSection;
      case 2:
        return financialSupportSection;
      case 3:
        return consentSection;
      case 4:
        return summarySection;
      default:
        return [];
    }
  };

  const renderStep = () => {
    return getCurrentFields().map(renderInput);
  };

  return (
    <div className="applicationFormContainer">
      <Header linkTo="/homepage" />

      {submitted ? (
        <div className="outerContainer">
          <h1 className="applicationSectionHeader">Application submitted</h1>
          <p>Thank you for applying to ISFiT!</p>
          <div className="navigationButtons">
            <Button type="button" onClick={() => setRedirect(true)}>
              Back to Homepage
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="outerContainer">
            <h1 className="applicationSectionHeader">
              Welcome to the ISFiT 2027 Participant Application!
            </h1>
            <p>
              Welcome to the ISFiT 2027 Participant Application! ISFiT, the
              world’s largest international student festival, is held biennially
              in Trondheim, Norway, during the spring semester. Since its
              inception in 1990, ISFiT has brought together students from
              diverse national and cultural backgrounds, fostering dialogue and
              connection through stimulating discussions on important global
              issues. Each festival centers around a unique theme, and for 2027,
              we will be exploring the theme of CHANGING WINDS. In a world of
              mass political upheaval, climate change, and a shifting global
              order, old truths are no longer certain. We invite you to join us
              in Trondheim for this exciting event, where students from across
              the globe will gather to engage, learn, and inspire one another
              as we discuss the state of our world and this fragile present.
            </p>
            <p>
              ​We are currently accepting participant applications, and you can
              apply up until August 2nd!
            </p>
            <p>
              As a participant, you will be part of a community of international
              students passionate about creating positive change in the world.
              You will have the opportunity to engage in thought-provoking
              workshops, attend insightful debates, and participate in dynamic
              cultural exchange activities. Being a participant means more than
              just attending events and concerts — it means actively
              contributing your ideas, experiences, and perspectives to the
              discussions and debates that shape our understanding of the theme
              of CHANGING WINDS.{' '}
            </p>
            <p>
              We in ISFiT will provide food and accomodation while you are here,
              and you may also apply for additional funds if you need so to
              attend the festival.
            </p>
            <p>
              So what are you waiting for? Apply! Do you have any questions?
              Please check the Frequently Asked Questions
              <Link to="/faq" className="emailLink">
                (FAQ)
              </Link>
              section to see if your question has already been answered, or ask
              us at this information-email:
              <a href="mailto:questions@isfit.no" className="emailLink">
                questions@isfit.no
              </a>
              !
            </p>
            {/* <p>
              If you are having trouble applying through this website, you can
              alternatively apply through this{' '}
              <a
                href="https://forms.gle/DFatZ3yqWkdDsuYt6"
                className="footerEmailLink"
                target="_blank"
              >
                Google Form
              </a>
              !
            </p> */}
          </div>
          <div className="progressOverview">
            {steps.map((step, index) => (
              <span key={index}>
                <span
                  className={`progressStep ${
                    index === currentStep ? 'currentStep' : ''
                  } ${visitedSteps.includes(index) ? 'clickableStep' : ''}`}
                  onClick={() => handleStepClick(index)}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <span className="separator"> &gt; </span>
                )}
              </span>
            ))}
          </div>
          <form id="applicationContainer">
            <div className="outerContainerSection">
              <h1 className="applicationSectionHeader">{steps[currentStep]}</h1>
              {renderStep()}
            </div>
          </form>
          <div className="navigationButtons">
            {currentStep > 0 && (
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit}>
                Apply
              </Button>
            )}
          </div>
          <CustomToast
            open={toastOpen}
            setOpen={setToastOpen}
            title={toastTitle}
            message={toastMessage}
          />
        </>
      )}
    </div>
  );
};

export default ApplicationForm;
