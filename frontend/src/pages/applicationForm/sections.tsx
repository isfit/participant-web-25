import { IApplicationForm } from "../../types/types";
import { nationalities, nations } from "./nationality";
import { Information } from '@carbon/icons-react'; 

interface FormField {
  label: string;
  labelElement?: JSX.Element;
  name: keyof IApplicationForm;
  type: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export const personalDetails: FormField[] = [
  {
    label: 'Full Name (as per passport)',
    name: 'fullName',
    type: 'text',
    placeholder: 'John Doe',
    required: true,
  },
  {
    label: 'Phonenumber (with landcode)',
    name: 'phoneNumber',
    type: 'text',
    placeholder: '123 45 678',
    required: true,
  },
  {
    label: 'Date of Birth',
    name: 'dateOfBirth',
    type: 'date',
    placeholder: 'YYYY-MM-DD',
    required: true,
  },
  {
    label: 'Gender',
    name: 'gender',
    type: 'select',
    options: ['Male', 'Female', 'Other'],
    required: true,
  },
  {
    label: 'Nationality',
    name: 'nationality',
    type: 'select',
    options: nationalities,
    required: true,
  },
  {
    label: 'Continent of Nationality',
    name: 'continent',
    type: 'text',
    placeholder: '',
    required: true,
  },
  {
    label: 'Country of Residence',
    name: 'residenceCountry',
    type: 'select',
    options: nations,
    required: true,
  },
  {
    label:
      'By checking this box, I confirm I am a student throughout the academic year 2026-2027',
    name: 'isStudent',
    type: 'checkbox',
    required: true,
  },
  {
    label: 'What do you study?',
    name: 'studyField',
    type: 'text',
    placeholder: 'ex. Infomatics',
    required: true,
  },
  {
    label: 'Name of your University/Institute',
    name: 'university',
    type: 'text',
    placeholder: 'ex. Norwegian University of Science and Technology',
    required: true,
  },
  {
    label: 'Your University/Institute website address (optional)',
    name: 'universityWebsite',
    type: 'text',
    placeholder: 'ex. https://youruniversity.edu',
  },
    {
    label: 'Where did you first hear about ISFiT27? (Through friends, social media, ambassadors etc.)',
    name: 'how',
    type: 'text',
    placeholder: 'I heard about ISFiT27 through...',
  },
  {
    labelElement: (
      <>
      <span className="info-icon">
          <Information />
          <span className="tooltip-text infoStudentCertificate">
            The student certificate must confirm your student status for the
            academic year 2026-27 and must bear the official stamp/electronic
            signature of the institute/university. If the certificate is not
            in English, please upload an unofficial English translation of it.
            Please upload as a pdf that is easily readable.
          </span>
        </span>
        Please upload your student certificate as a PDF
      </>
    ),
    label: 'Please upload your student certificate',
    name: 'studentCertificate',
    type: 'file',
    required: true,
  },
  {
    label:
      'By checking this box, I confirm I am able to communicate in English',
    name: 'isEnglishSpeaker',
    type: 'checkbox',
    required: true,
  },
  {
    labelElement: (
      <>
      <span className="info-icon">
          <Information />
          <span className="tooltip-text infoApplyingAs">
            SOrCE (as a delegate selected by your own festival - already
            selected)
            <br />
            If you are not already selected, choose regular participant
          </span>
        </span>
        I am applying as
      </>
    ),
    label: 'I am applying as',
    name: 'applyingAs',
    type: 'select',
    options: ['SOrCE', 'Regular participant'],
    required: true,
  },
];


  export const themeSection: FormField[] = [
    {
      label:
      "Every time ISFiT is arranged, we explore a new theme that affects students across the globe. The theme for ISFiT27 is 'Changing Winds'. When considering the theme of 'Changing Winds' for ISFiT27, what comes to your mind first? (This could be politica, technological, environmental, social or something else.) (max 100 words) ",
      name: 'themeCWThoughts',
      type: 'textarea',
      placeholder: 'When I think of Changing Winds I think of ...',
      required: true,
    },
    {
      label:
      "Reflecting on your country or community, can you point to a specific change or turning point of significance? How has it unfolded, and what has it meant for you and/or the people around you? (max 300 words)",      
      name: 'countryCW',
      type: 'textarea',
      placeholder:
        "When reflecting on my country's context ...",
      required: true,
    },
    {
      label:
        'How do you see youself contributing to the dialogue and activities surrounding this theme during ISFiT27? Is there a change you wish to make, either on a local or global scale? (max 300 words)',
      name: 'contribution',
      type: 'textarea',
      placeholder: 'My contribution to ISFiT27 is ...',
      required: true,
    },
  ];

  export const financialSupportSection: FormField[] = [
    {
      labelElement: (
        <>
          ISFiT seeks to bring together students from around the globe, and we
          are committed to making the journey to Trondheim accessible for those
          who may not otherwise afford it. To support this, we offer full or
          partial funding to selected students. However, we encourage you to
          thoughtfully consider your financial need before applying, so that we
          can assist those who need it most. Why do you think that you should be
          considered for financial support to attend ISFiT27?{' '}
          <span className="info-icon">
            <Information />
            <span className="tooltip-text">
              Why do you believe you should receive financial assistance over
              other applicants? How would receiving this funding impact your
              ability to attend ISFiT and contribute to its goals?
            </span>
          </span>
        </>
      ),
      label:
        'ISFiT seeks to bring together students from around the globe, and we are committed to making the journey to Trondheim accessible for those who may not otherwise afford it. To support this, we offer full or partial funding to selected students. However, we encourage you to thoughtfully consider your financial need before applying, so that we can assist those who need it most. Why do you think that you should be considered for financial support to attend ISFiT27?',
      name: 'financialSupportReason',
      type: 'textarea',
      placeholder:
        'I should be considered to get financial support because ...',
    },
    {
      label: 'Are you applying for full or partial funding?',
      name: 'fullOrPartialFunding',
      type: 'select',
      options: ['Full funding', 'Partial funding', 'No funding'],
    },
    {
      label:
        'How many people do you financially support (e.g., children, spouse, elderly parents)?',
      name: 'dependents',
      type: 'number',
      placeholder: 'Number of dependents',
    },
    {
      label: 'What is your family´s monthly income? (approximately in Euros)',
      name: 'familyIncome',
      type: 'text',
      placeholder: '',
    },
    {
      label: 'I can participate in ISFiT27',
      name: 'canParticipate',
      type: 'select',
      options: [
        'without any financial support',
        'if I get partial financial support',
        'if I get full financial support',
      ],
    },
    {
      label: 'What country will you be traveling to Trondheim from?',
      name: 'countryTravelingFrom',
      type: 'text',
      placeholder: 'ex. India',
    },
    {
      label:
        'Is there any other information you would like us to consider when reviewing your application for travel funds?',
      name: 'otherFundingInfo',
      type: 'textarea',
      placeholder: '...',
    },
  ];

  export const consentSection: FormField[] = [
    {
      label: 'I have to apply for a visa if I get accepted as a participant',
      name: 'consentVisa',
      type: 'select',
      options: [
        'Yes',
        'No',
      ],
      required: true,
    },
    {
      label:
        'I am aware that I have to book a flight to Norway on my own even if I get financial support',
      name: 'consentFlight',
      type: 'checkbox',
      required: true,
    },
    {
      label:
        'I agree to comply with Norwegian law and to conduct myself with respect and decency during my stay in Trondheim.',
      name: 'consentNorwegianLaw',
      type: 'checkbox',
      required: true,
    },
    {
      label:
        'I agree that I will return to my country of residence after the festival has ended.',
      name: 'consentReturn',
      type: 'checkbox',
      required: true,
    },
    {
      label:
        'I agree that ISFiT can keep my personal details to be used later in the festival',
      name: 'consentPersonalDetails',
      type: 'checkbox',
      required: true,
    },
    {
      label:
        'I am aware that a participation certificate will be given only if I attend all days of the workshop and mandatory events',
      name: 'consentAttendance',
      type: 'checkbox',
      required: true,
    },
    {
      label:
        'I agree that ISFiT can share pictures and videos of me taken during the festival on social media',
      name: 'consentMedia',
      type: 'select',
      options: [
        'Yes',
        'No',
        'Only in group photos'
      ],
    },
  ];