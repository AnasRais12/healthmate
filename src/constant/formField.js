// form fields
const usernameField = { label: 'Username', name: 'username', type: 'text' };
const emailField = { label: 'Email', name: 'email', type: 'email' };
const Otp = { label: 'OTP', name: 'otp', type: 'text', }
const passwordField = { label: 'Password', name: 'password', type: 'password' };
const newPasswordfield = { label: 'New Password', name: 'newPassword', type: 'password' };
const confirmPasswordfield = { label: 'Confirm Password', name: 'confirmPassword', type: 'password' };
const confirmField = { label: 'Confirm Password', name: 'confirmPassword', type: 'password', }
const fullNameField = { label: 'Full Name', name: 'full_name', type: 'text', };
const countryField = { label: 'Country', name: 'country', type: 'text', };
const cityField = { label: 'City', name: 'city', type: 'text', };
const areaField = { label: 'Area', name: 'area', type: 'select' }; // since it's a <Select>
const phoneNumberField = { label: 'Phone Number', name: 'phone_number', type: 'tel' };
const addressField = { label: 'House No.', name: 'address', type: 'text' };
const zipCodeField = { label: 'Zip Code', name: 'zip_code', type: 'text' };
const createdDate = { label: 'Date', name: 'createdDate', type: 'date' };
const bp = { label: 'BP', name: 'bp', type: 'text' };
const sugar = { label: 'Sugar', name: 'sugar', type: 'text' };
const weight = { label: 'Weight', name: 'weight', type: 'text' };
const Type = { label: 'Type', name: 'type', type: 'select' };
const reportTitle = { label: 'Report Title', name: 'reportTitle', type: 'text' };
const notes = { label: 'Notes', name: 'notes', type: 'text' };












// export
export const SignUpFields = [usernameField, emailField, passwordField];
export const LoginFields = [emailField, passwordField];
export const AddVitals = [usernameField, createdDate, bp, sugar, weight, notes];
export const AddReport = [createdDate, Type, reportTitle];

export const ForgetPasswordFields = [emailField];
export const OtpFields = [Otp];
export const resetPasswordFields = [passwordField, confirmField];
// export const userAddressFormFields = [fullNameField, countryField, cityField, areaField, phoneNumberField, addressField, zipCodeField];
// export const CardFormFields = [cardNumberField, expiryField, cvcField, cardHolderField];
export const ProfileSettings = [usernameField, emailField,];
export const ChangePasswordField = [passwordField, newPasswordfield, confirmPasswordfield];





