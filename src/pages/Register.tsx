import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';

// Add this mapping of states to LGAs
const stateToLGA: { [key: string]: string[] } = {
  Jigawa: [
    'Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 
    'Garki', 'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa',
    'Kaugama', 'Kazaure', 'Kiri Kasama', 'Kiyawa', 'Maigatari', 'Malam Madori',
    'Miga', 'Ringim', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'
  ],
  Kaduna: [
    'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 
    'Kachia', 'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura',
    'Kauru', 'Kubau', 'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga',
    'Soba', 'Zangon Kataf', 'Zaria'
  ],
  Kano: [
    'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta',
    'Dawakin Kudu', 'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam',
    'Gaya', 'Gezawa', 'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya',
    'Kiru', 'Kumbotso', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa',
    'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tarauni', 'Tofa',
    'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'
  ],
  Katsina: [
    'Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dan Musa',
    'Dandume', 'Danja', 'Daura', 'Dutsi', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa',
    'Jibia', 'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi', 'Kusada',
    'Mai\'Adua', 'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa',
    'Safana', 'Sandamu', 'Zango'
  ],
  Kebbi: [
    'Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza',
    'Dandi', 'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski',
    'Sakaba', 'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri', 'Zuru'
  ],
  Sokoto: [
    'Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela',
    'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North',
    'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta', 'Wamako', 'Wurno', 'Yabo'
  ],
  Zamfara: [
    'Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau',
    'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Tsafe', 'Zurmi'
  ]
};

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    stateOfOrigin: '',
    lga: '',
    address: '',
    phone: '',
    email: '',
    nin: '',
    position: '',
    qualification: '',
    institution: '',
    graduationYear: '',
    nyscStatus: '',
    agriculturalExperience: false,
    experienceDetails: '',
    ownsFarm: false,
    farmLocation: '',
    projectExperience: false,
    projectDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const generatePDF = (data: typeof formData) => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 20;

    // Add header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('BIARN 2025 REGISTRATION FORM', 105, y, { align: 'center' });
    y += lineHeight * 2;

    // Helper function to add sections
    const addSection = (title: string, content: { label: string; value: string | boolean }[]) => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(title, 20, y);
      y += lineHeight;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      content.forEach(item => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(`${item.label}: ${item.value}`, 20, y);
        y += lineHeight;
      });
      y += lineHeight;
    };

    // Add sections
    addSection('SECTION A: PERSONAL INFORMATION', [
      { label: 'Full Name', value: data.fullName },
      { label: 'Date of Birth', value: data.dateOfBirth },
      { label: 'Gender', value: data.gender },
      { label: 'State of Origin', value: data.stateOfOrigin },
      { label: 'LGA', value: data.lga },
      { label: 'Address', value: data.address },
      { label: 'Phone', value: data.phone },
      { label: 'Email', value: data.email },
      { label: 'NIN', value: data.nin },
    ]);

    addSection('SECTION B: POSITION', [
      { label: 'Position Applied For', value: data.position },
    ]);

    addSection('SECTION C: EDUCATIONAL QUALIFICATIONS', [
      { label: 'Highest Qualification', value: data.qualification },
      { label: 'Institution', value: data.institution },
      { label: 'Graduation Year', value: data.graduationYear },
      { label: 'NYSC Status', value: data.nyscStatus },
    ]);

    addSection('SECTION D: WORK EXPERIENCE & SKILLS', [
      { label: 'Agricultural Experience', value: data.agriculturalExperience ? 'Yes' : 'No' },
      { label: 'Experience Details', value: data.experienceDetails || 'N/A' },
      { label: 'Owns Farm', value: data.ownsFarm ? 'Yes' : 'No' },
      { label: 'Farm Location', value: data.farmLocation || 'N/A' },
      { label: 'Project Experience', value: data.projectExperience ? 'Yes' : 'No' },
      { label: 'Project Details', value: data.projectDetails || 'N/A' },
    ]);

    // Add declaration
    doc.addPage();
    y = 20;
    addSection('DECLARATION', [
      { 
        label: 'Statement', 
        value: 'I hereby declare that all the information provided in this application form is true and accurate.'
      },
      {
        label: 'Date',
        value: format(new Date(), 'dd/MM/yyyy')
      }
    ]);

    // Save the PDF
    doc.save(`BIARN_Registration_${data.fullName.replace(/\s+/g, '_')}.pdf`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add timestamp to the form data
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'biarn_registration'), submissionData);
      console.log('Document written with ID: ', docRef.id);

      // Generate and download PDF
      generatePDF(formData);

      setSubmitSuccess(true);
      // Reset form after successful submission
      setFormData({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        stateOfOrigin: '',
        lga: '',
        address: '',
        phone: '',
        email: '',
        nin: '',
        position: '',
        qualification: '',
        institution: '',
        graduationYear: '',
        nyscStatus: '',
        agriculturalExperience: false,
        experienceDetails: '',
        ownsFarm: false,
        farmLocation: '',
        projectExperience: false,
        projectDetails: '',
      });
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  useEffect(() => {
    // Clear LGA when state changes
    setFormData(prev => ({
      ...prev,
      lga: ''
    }));
  }, [formData.stateOfOrigin]);

  return (
    <div className="min-h-screen bg-red-950">
      {/* Hero Section */}
      <div 
        className="h-[300px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1595074475099-7576de829bdf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
<h1 className="text-2xl md:text-4xl font-bold mb-6">BIARN Beneficiary Registration Form</h1>            <p className="text-xl md:text-2xl">
              ...
            </p>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
          {/* Section A: Personal Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-red-900 border-b pb-2">Section A: Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State of Origin</label>
                <select
                  name="stateOfOrigin"
                  value={formData.stateOfOrigin}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select State</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Zamfara">Zamfara</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Local Government Area (LGA)</label>
                <select
                  name="lga"
                  value={formData.lga}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  title="Select your LGA"
                >
                  <option value="">Select LGA</option>
                  {formData.stateOfOrigin && stateToLGA[formData.stateOfOrigin]?.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Residential Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">National ID Number (NIN)</label>
                <input
                  type="text"
                  name="nin"
                  value={formData.nin}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voter's Card Number</label>
                <input
                  type="text"
                  name="votersCard"
                  value={formData.votersCard}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div> */}
            </div>
          </div>

          {/* Section B: Position */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-red-900 border-b pb-2">Section B: Select Land Size (Hectares)</h2>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Land Size (Hectares)
            </label>
            <select
              name="land_size"
              value={formData.land_size}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            >
              <option value="">Select Land Size</option>
              <option value="1">1 hectare</option>
              <option value="2">2 hectares</option>
              <option value="3">3 hectares</option>
              <option value="4">4 hectares</option>
              <option value="5">5 hectares</option>
            </select>
            <p className="mt-2 text-sm text-gray-600">
              Single-digit interest rate of 5% applies.
            </p>
          </div>

          </div>

          {/* Section C: Educational Qualifications */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-red-900 border-b pb-2">Section C: Educational Qualifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Highest Qualification in Farming</label>
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Qualification</option>
                  <option value="ssce">Secondary School Certificate (WAEC/NECO/NABTEB)</option>
                  <option value="nd">National Diploma (ND)</option>
                  <option value="hnd">Higher National Diploma (HND)</option>
                  <option value="bsc">Bachelor's Degree (B.Sc)</option>
                  <option value="msc">Master's Degree (M.Sc)</option>
                  <option value="other">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution Attended</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year of Graduation</label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">NYSC Status</label>
                <select
                  name="nyscStatus"
                  value={formData.nyscStatus}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="completed">Completed</option>
                  <option value="exempted">Exempted</option>
                  <option value="not_applicable">Not Applicable</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section D: Work Experience & Skills */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-red-900 border-b pb-2">Section D: Work Experience & Skills</h2>
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="agriculturalExperience"
                    checked={formData.agriculturalExperience}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Do you have experience in Farming?</span>
                </label>
                {formData.agriculturalExperience && (
                  <textarea
                    name="experienceDetails"
                    value={formData.experienceDetails}
                    onChange={handleChange}
                    placeholder="Please provide details of your agricultural experience"
                    className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                  ></textarea>
                )}
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="ownsFarm"
                    checked={formData.ownsFarm}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Do you own or have access to a farm?</span>
                </label>
                {formData.ownsFarm && (
                  <textarea
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleChange}
                    placeholder="Please provide location details of the farm"
                    className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                  ></textarea>
                )}
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="projectExperience"
                    checked={formData.projectExperience}
                    onChange={handleChange}
                    className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Have you supervised or worked on any farm project before?</span>
                </label>
                {formData.projectExperience && (
                  <textarea
                    name="projectDetails"
                    value={formData.projectDetails}
                    onChange={handleChange}
                    placeholder="Please provide details of the farm projects"
                    className="mt-3 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    rows={3}
                  ></textarea>
                )}
              </div>
            </div>
          </div>

          {/* Section E: Document Uploads */}
          <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-red-900 border-b pb-2">Section E: Document Uploads</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Curriculum Vitae (CV)",
          "Birth Certificate or Age Declaration",
          "Educational Certificates",
          "NYSC Discharge/Exemption Letter",
          "Local Government Indigene Certificate",
          "National ID",
          "Undertaking Letters",
          "Letter of Interest/Motivation"].map((doc, index) => (
          <div key={index} className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">{doc}</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="text-sm text-gray-500">Click to upload {doc}</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
        ))}
      </div>
      
      {/* Additional Information Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternate Issuing Authorities for the Undertaking Letters</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li><strong>a)</strong> Distinguished Senator Representing the applicant’s constituency.</li>
          <li><strong>b)</strong> Honourable Member of the House of Representatives Representing the applicant’s Local Government Area (LGA).</li>
          <li><strong>c)</strong> Federal Permanent Secretary.</li>
          <li><strong>d)</strong> Senior Director from the Federal Government.</li>
        </ul>
        <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Letter of Interest/Motivation</h3>
        <p className="text-gray-700">Explain why the applicant wants to participate and how they plan to utilize the resources.</p>
      </div>
    </div>

          {/* Section F: Declaration */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-red-900 border-b pb-2">Section F: Declaration & Signature</h2>
            <div className="space-y-6">
              <p className="text-gray-700">
                I hereby declare that all the information provided in this application form is true and accurate. 
                I understand that any false information may lead to disqualification. 
                I also agree to abide by the rules and regulations of the Barau Initiative for Agricultural Revolution 
                in Northwest Nigeria (BIARN) if selected.
              </p>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  required
                  className="h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  I agree to the declaration above
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-red-900 hover:bg-red-800'
              } text-white px-8 py-4 rounded-lg transition-colors text-lg font-semibold`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg max-w-md">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h3>
                <p className="text-gray-700 mb-6">
                  Your application has been submitted successfully. A PDF copy has been downloaded to your device.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-red-900 text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;