export function getSummary() {
  const savedForm = localStorage.getItem('applicationForm');

  if (!savedForm) {
    return <div>No application data found.</div>;
  }

  const formValues = JSON.parse(savedForm);

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th colSpan={2}>
              <strong>Personal Details</strong>
            </th>
          </tr>
        </thead>
        <tbody>
        <tr>
            <td>
              <strong>Your name:</strong>
            </td>
            <td>{formValues.fullName || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Your phone number:</strong>
            </td>
            <td>{formValues.phoneNumber || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Date of Birth:</strong>
            </td>
            <td>{formValues.dateOfBirth || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Gender:</strong>
            </td>
            <td>{formValues.gender || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Nationality:</strong>
            </td>
            <td>{formValues.nationality || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Continent of Nationality:</strong>
            </td>
            <td>{formValues.continent || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Country of Residence:</strong>
            </td>
            <td>{formValues.residenceCountry || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Are you a student?:</strong>
            </td>
            <td>{formValues.isStudent ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>
              <strong>Field of Study:</strong>
            </td>
            <td>{formValues.studyField || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>University/Institute:</strong>
            </td>
            <td>{formValues.university || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>University Website:</strong>
            </td>
            <td>{formValues.universityWebsite || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Heard via</strong>
            </td>
            <td>
              <strong>{formValues.how || 'N/A'}</strong>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Student Certificate Uploaded:</strong>
            </td>
            <td>{formValues.studentCertificate ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>
              <strong>English Speaker:</strong>
            </td>
            <td>{formValues.isEnglishSpeaker ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>
              <strong>Applying As:</strong>
            </td>
            <td>{formValues.applyingAs || 'N/A'}</td>
          </tr>
          <tr>
            <th colSpan={2}>
              <strong>Theme</strong>
            </th>
          </tr>
          <tr>
            <td>
              <strong>Thoughts on Changing Winds Theme:</strong>
            </td>
            <td>{formValues.themeCWThoughts || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Connection of Changing Winds to Your Country:</strong>
            </td>
            <td>{formValues.countryCW || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Motivation for Attending ISFiT27:</strong>
            </td>
            <td>{formValues.motivation || 'N/A'}</td>
          </tr>
          <tr>
            <th colSpan={2}>
              <strong>Financial Support</strong>
            </th>
          </tr>
          <tr>
            <td>
              <strong>Reason for Financial Support:</strong>
            </td>
            <td>{formValues.financialSupportReason || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Amount Requested:</strong>
            </td>
            <td>{formValues.fullOrPartialFunding || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Number of Dependents:</strong>
            </td>
            <td>{formValues.dependents || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Family Income:</strong>
            </td>
            <td>{formValues.familyIncome || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Participation Condition:</strong>
            </td>
            <td>{formValues.canParticipate || 'N/A'}</td>
          </tr>
          <tr>
            <td>
              <strong>Country traveling from:</strong>
            </td>
            <td>{formValues.countryTravelingFrom}</td>
          </tr>
          <tr>
            <td>
              <strong>otherFundingInfo</strong>
            </td>
            <td>{formValues.otherFundingInfo}</td>
          </tr>

          <tr>
            <th colSpan={2}>
              <strong>Consent</strong>
            </th>
          </tr>
          <tr>
            <td>
              <strong>Consent for Visa Application:</strong>
            </td>
            <td>{formValues.consentVisa}</td>
          </tr>
          <tr>
            <td>
              <strong>Consent for Booking Flight:</strong>
            </td>
            <td>{formValues.consentFlight ? 'Yes' : 'No'}</td>
          </tr>

          <tr>
            <td>
              <strong>Consent for complying to the Norwegian law:</strong>
            </td>
            <td>{formValues.consentNorwegianLaw ? 'Yes' : 'No'}</td>
          </tr>

          <tr>
            <td>
              <strong>Consent for Returning home after festival:</strong>
            </td>
            <td>{formValues.consentReturn ? 'Yes' : 'No'}</td>
          </tr>

          <tr>
            <td>
              <strong>Consent for Personal Details:</strong>
            </td>
            <td>{formValues.consentPersonalDetails ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>
              <strong>Consent for Attendance:</strong>
            </td>
            <td>{formValues.consentAttendance ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>
              <strong>Consent for Media Use:</strong>
            </td>
            <td>{formValues.consentMedia}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default getSummary;
