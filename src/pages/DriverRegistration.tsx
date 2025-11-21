import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useForm } from 'react';
import { toast } from 'sonner';

// Define form step interfaces
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationalId: string;
}

interface VehicleInfo {
  vehicleType: string;
  licensePlate: string;
  make: string;
  model: string;
  year: string;
  capacity: string;
}

interface DocumentInfo {
  driverLicense: boolean;
  vehicleRegistration: boolean;
  insurance: boolean;
  taxCompliance: boolean;
  backgroundCheck: boolean;
}

interface ExperienceInfo {
  yearsOfExperience: string;
  previousCompany: string;
  serviceAreas: string;
  availabilityType: string;
  additionalInfo: string;
}

// Main component
const DriverRegistrationForm = () => {
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  // Form data state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationalId: '',
  });

  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo>({
    vehicleType: '',
    licensePlate: '',
    make: '',
    model: '',
    year: '',
    capacity: '',
  });

  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>({
    driverLicense: false,
    vehicleRegistration: false,
    insurance: false,
    taxCompliance: false,
    backgroundCheck: false,
  });

  const [experienceInfo, setExperienceInfo] = useState<ExperienceInfo>({
    yearsOfExperience: '',
    previousCompany: '',
    serviceAreas: '',
    availabilityType: '',
    additionalInfo: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculate progress
  const formStep = currentPage / totalPages;
  const progress = formStep * 33.33;

  // Validate current page
  const validatePage = () => {
    if (currentPage === 1) {
      return (
        personalInfo.firstName.trim() !== '' &&
        personalInfo.lastName.trim() !== '' &&
        personalInfo.email.trim() !== '' &&
        personalInfo.phone.trim() !== '' &&
        personalInfo.nationalId.trim() !== ''
      );
    } else if (currentPage === 2) {
      return (
        vehicleInfo.vehicleType.trim() !== '' &&
        vehicleInfo.licensePlate.trim() !== '' &&
        vehicleInfo.make.trim() !== '' &&
        vehicleInfo.model.trim() !== ''
      );
    } else if (currentPage === 3) {
      return (
        documentInfo.driverLicense &&
        documentInfo.vehicleRegistration &&
        documentInfo.insurance
      );
    } else if (currentPage === 4) {
      return (
        experienceInfo.yearsOfExperience.trim() !== '' &&
        experienceInfo.serviceAreas.trim() !== '' &&
        experienceInfo.availabilityType.trim() !== ''
      );
    }
    return false;
  };

  // Handle next page
  const handleNext = () => {
    if (validatePage() && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (validatePage()) {
        try {
          const response = await fetch('http://localhost:3001/api/driver-registration', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              personalInfo,
              vehicleInfo,
              documentInfo,
              experienceInfo,
            }),
          });

          if (response.ok) {
            setFormSubmitted(true);
          } else {
            const errorData = await response.json();
            toast.error(`Error: ${errorData.error || 'Something went wrong'}`);
          }
        } catch (error) {
          console.error('Error submitting driver registration:', error);
          toast.error('Failed to submit driver registration. Please try again.');
        }
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-[#292536] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo and Header */}
        <div className="flex justify-center mb-6">
          <div className="text-white text-center">
            <a href="/">
              <h1 className="text-3xl font-bold text-[#9581e6] mb-2">Mizigo Africa</h1></a>
            <p className="text-gray-300">Driver Registration</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress
            value={formStep * 33.33}
            className="w-full bg-gray-200"
          />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Personal Info</span>
            <span>Vehicle Details</span>
            <span>Documents</span>
            <span>Experience</span>
          </div>
        </div>

        {/* Registration Form */}
        {!formSubmitted ? (
          <Card className="bg-gray-900 border-gray-800 text-white shadow-lg">
            <CardHeader className="border-b border-gray-800 bg-gradient-to-r from-[#9581e6]/10 to-transparent">
              <CardTitle className="text-[#9581e6]">
                {currentPage === 1 && "Personal Information"}
                {currentPage === 2 && "Vehicle Details"}
                {currentPage === 3 && "Document Verification"}
                {currentPage === 4 && "Experience & Availability"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {currentPage === 1 && "Please provide your personal details"}
                {currentPage === 2 && "Tell us about your vehicle"}
                {currentPage === 3 && "Upload required documents for verification"}
                {currentPage === 4 && "Share your driving experience and availability"}
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="pt-6">
                {/* Page 1: Personal Information */}
                {currentPage === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-300">First Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          value={personalInfo.firstName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-300">Last Name <span className="text-red-500">*</span></Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Phone Number <span className="text-red-500">*</span></Label>
                      <Input
                        id="phone"
                        placeholder="+254 7XX XXX XXX"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth" className="text-gray-300">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={personalInfo.dateOfBirth}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nationalId" className="text-gray-300">National ID <span className="text-red-500">*</span></Label>
                        <Input
                          id="nationalId"
                          placeholder="Enter your ID number"
                          value={personalInfo.nationalId}
                          onChange={(e) => setPersonalInfo({ ...personalInfo, nationalId: e.target.value })}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 2: Vehicle Details */}
                {currentPage === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType" className="text-gray-300">Vehicle Type <span className="text-red-500">*</span></Label>
                      <Select
                        value={vehicleInfo.vehicleType}
                        onValueChange={(value) => setVehicleInfo({ ...vehicleInfo, vehicleType: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="pickup">Pickup Truck</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="motorcycle">Motorcycle</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="licensePlate" className="text-gray-300">License Plate <span className="text-red-500">*</span></Label>
                      <Input
                        id="licensePlate"
                        placeholder="e.g., KBX 123A"
                        value={vehicleInfo.licensePlate}
                        onChange={(e) => setVehicleInfo({ ...vehicleInfo, licensePlate: e.target.value })}
                        required
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="make" className="text-gray-300">Make <span className="text-red-500">*</span></Label>
                        <Input
                          id="make"
                          placeholder="e.g., Toyota"
                          value={vehicleInfo.make}
                          onChange={(e) => setVehicleInfo({ ...vehicleInfo, make: e.target.value })}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model" className="text-gray-300">Model <span className="text-red-500">*</span></Label>
                        <Input
                          id="model"
                          placeholder="e.g., Hilux"
                          value={vehicleInfo.model}
                          onChange={(e) => setVehicleInfo({ ...vehicleInfo, model: e.target.value })}
                          required
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-gray-300">Year</Label>
                        <Input
                          id="year"
                          placeholder="e.g., 2020"
                          value={vehicleInfo.year}
                          onChange={(e) => setVehicleInfo({ ...vehicleInfo, year: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-gray-300">Cargo Capacity</Label>
                        <Input
                          id="capacity"
                          placeholder="e.g., 2 tons"
                          value={vehicleInfo.capacity}
                          onChange={(e) => setVehicleInfo({ ...vehicleInfo, capacity: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 3: Documents */}
                {currentPage === 3 && (
                  <div className="space-y-6">
                    <Alert className="bg-[#9581e6]/10 border-[#9581e6]/20 text-[#9581e6]">
                      <AlertDescription>
                        Please confirm you have the following documents ready for upload. You'll be prompted to upload them after registration.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="driverLicense"
                          checked={documentInfo.driverLicense}
                          onCheckedChange={(checked) =>
                            setDocumentInfo({ ...documentInfo, driverLicense: checked as boolean })
                          }
                          className="border-[#9581e6] data-[state=checked]:bg-[#9581e6]"
                        />
                        <Label htmlFor="driverLicense" className="text-gray-300">
                          Valid Driver's License <span className="text-red-500">*</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vehicleRegistration"
                          checked={documentInfo.vehicleRegistration}
                          onCheckedChange={(checked) =>
                            setDocumentInfo({ ...documentInfo, vehicleRegistration: checked as boolean })
                          }
                          className="border-[#9581e6] data-[state=checked]:bg-[#9581e6]"
                        />
                        <Label htmlFor="vehicleRegistration" className="text-gray-300">
                          Vehicle Registration Certificate <span className="text-red-500">*</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="insurance"
                          checked={documentInfo.insurance}
                          onCheckedChange={(checked) =>
                            setDocumentInfo({ ...documentInfo, insurance: checked as boolean })
                          }
                          className="border-[#9581e6] data-[state=checked]:bg-[#9581e6]"
                        />
                        <Label htmlFor="insurance" className="text-gray-300">
                          Insurance Certificate <span className="text-red-500">*</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="taxCompliance"
                          checked={documentInfo.taxCompliance}
                          onCheckedChange={(checked) =>
                            setDocumentInfo({ ...documentInfo, taxCompliance: checked as boolean })
                          }
                          className="border-[#9581e6] data-[state=checked]:bg-[#9581e6]"
                        />
                        <Label htmlFor="taxCompliance" className="text-gray-300">
                          Tax Compliance Certificate
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="backgroundCheck"
                          checked={documentInfo.backgroundCheck}
                          onCheckedChange={(checked) =>
                            setDocumentInfo({ ...documentInfo, backgroundCheck: checked as boolean })
                          }
                          className="border-[#9581e6] data-[state=checked]:bg-[#9581e6]"
                        />
                        <Label htmlFor="backgroundCheck" className="text-gray-300">
                          Agree to Background Check
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Page 4: Experience & Availability */}
                {currentPage === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="yearsOfExperience" className="text-gray-300">Years of Experience <span className="text-red-500">*</span></Label>
                        <Select
                          value={experienceInfo.yearsOfExperience}
                          onValueChange={(value) => setExperienceInfo({ ...experienceInfo, yearsOfExperience: value })}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="0-1">Less than 1 year</SelectItem>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10+">More than 10 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="previousCompany" className="text-gray-300">Previous Company (if any)</Label>
                        <Input
                          id="previousCompany"
                          placeholder="Enter company name"
                          value={experienceInfo.previousCompany}
                          onChange={(e) => setExperienceInfo({ ...experienceInfo, previousCompany: e.target.value })}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceAreas" className="text-gray-300">Service Areas <span className="text-red-500">*</span></Label>
                      <Select
                        value={experienceInfo.serviceAreas}
                        onValueChange={(value) => setExperienceInfo({ ...experienceInfo, serviceAreas: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select service area" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="nairobi">Nairobi Metropolitan</SelectItem>
                          <SelectItem value="mombasa">Mombasa County</SelectItem>
                          <SelectItem value="kisumu">Kisumu County</SelectItem>
                          <SelectItem value="nakuru">Nakuru County</SelectItem>
                          <SelectItem value="national">National - Long Distance</SelectItem>
                          <SelectItem value="eastAfrica">East Africa Regional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availabilityType" className="text-gray-300">Availability <span className="text-red-500">*</span></Label>
                      <Select
                        value={experienceInfo.availabilityType}
                        onValueChange={(value) => setExperienceInfo({ ...experienceInfo, availabilityType: value })}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          <SelectItem value="fulltime">Full-time</SelectItem>
                          <SelectItem value="parttime">Part-time</SelectItem>
                          <SelectItem value="weekends">Weekends only</SelectItem>
                          <SelectItem value="evenings">Evenings only</SelectItem>
                          <SelectItem value="oncall">On-call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo" className="text-gray-300">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        placeholder="Any additional information you'd like to share"
                        value={experienceInfo.additionalInfo}
                        onChange={(e) => setExperienceInfo({ ...experienceInfo, additionalInfo: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white min-h-20"
                      />
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between border-t border-gray-800 pt-6">
                <Button
                  type="button"
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={currentPage === 1}
                  className="bg-transparent border-gray-700 text-white hover:bg-gray-800"
                >
                  Previous
                </Button>

                {currentPage < totalPages ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!validatePage()}
                    className="bg-[#9581e6] hover:bg-[#8672cf] text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!validatePage()}
                    className="bg-[#9581e6] hover:bg-[#8672cf] text-white"
                  >
                    Submit Application
                  </Button>
                )}
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="bg-gray-900 border-gray-800 text-white shadow-lg p-6">
            <div className="text-center space-y-4">
              
              <h2 className="text-2xl font-bold text-[#9581e6]">Registration Successful!</h2>
              <p className="text-gray-400">
                Thank you for registering as a driver with Mizigo Africa. Our team will review your application and contact you in 2-3 business days.
              </p>
              
              
                
                
                  Return to Homepage
                
              </div>
            
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>© 2025 Mizigo Africa. All rights reserved.</p>
          <p className="mt-1">Need help? Contact our support team at <a href="mailto:info@mizigoafrica.com"><span className="text-[#9581e6]">info@mizigoafrica.com</span></a></p>
        </div>
      </div>
    </div>
  );
};

export default DriverRegistrationForm;