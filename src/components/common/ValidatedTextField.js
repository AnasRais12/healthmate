import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, Box, Typography, useTheme, FormControl, FormHelperText, Select, MenuItem } from '@mui/material';
import {
  CloudUpload, Visibility, VisibilityOff, CheckCircle,
  Error,
} from '@mui/icons-material';
import { AccountCircleOutlined } from '@mui/icons-material';
import { ImCross } from 'react-icons/im';
import { Controller, useWatch } from 'react-hook-form';
import { MuiOtpInput } from 'mui-one-time-password-input';

const ValidatedTextField = ({
  label,
  name,
  type = 'text',
  icon,
  register,
  errors,
  helperText,
  control,
  isValid,
  placeholder,
  options = [],
  defaultValue = "",
  fixedValue = "",
  showEndAdornment = true,
  ...props

}) => {
  const [showPassword, setShowPassword] = useState(false);
  const fieldValue = control ? useWatch({ control, name }) : "";
  const theme = useTheme()
  const isPasswordField = type === 'password';
  const isOtpField = name === 'otp' || name === 'verification';
  const isSelectField = type === 'select';
  const isImageField = type === 'file';
  const inputType = isPasswordField && !showPassword ? 'password' : 'text';

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  if (isOtpField) {
    return (
      <>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <MuiOtpInput
              {...field}
              length={6}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              TextFieldsProps={{
                type: 'number',
                inputProps: { inputMode: 'numeric' },
                sx: {
                  '& input': {
                    fontWeight: 700,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '18px',
                  },
                },
              }}
              sx={{
                justifyContent: 'center',
                gap: 1,
                mb: 1,
              }}
            />
          )}
        />
        {errors && (
          <Typography color="error" mb={2}>
            {helperText}
          </Typography>
        )}
      </>
    );
  }
  if (isImageField) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const file = field.value;
          const previewUrl =
            file instanceof File
              ? URL.createObjectURL(file)
              : typeof file === 'string'
                ? file
                : '';

          return (
            <Box mb={2}>
              {!previewUrl && (
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 4,
                    width: '100%',
                    padding: '10px 0px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: theme.palette.background.paper,
                    '&:hover': {
                      borderColor: '#999',
                    },
                  }}
                  onClick={() => document.getElementById(`file-input-${name}`)?.click()}
                >
                  <CloudUpload fontSize="large" color="action" />
                  <Typography mt={1} fontWeight={500}>
                    Upload Image
                  </Typography>

                  <input
                    id={`file-input-${name}`}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      if (selectedFile) {
                        field.onChange(selectedFile);
                      }
                    }}
                  />
                </Box>
              )}


              {previewUrl && (
                <Box mt={2} position="relative" display="inline-block">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{
                      objectFit: 'cover',
                      borderRadius: 8,
                      maxHeight: 200,
                    }}
                  />
                  <Box
                    position="absolute"
                    top={4}
                    right={4}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '50%',
                      padding: '4px',
                      cursor: 'pointer',
                      boxShadow: '0 0 5px rgba(0,0,0,0.3)',
                    }}
                    onClick={() => field.onChange(null)} // 👈 This clears the preview
                  >
                    <ImCross size={12} />
                  </Box>
                </Box>
              )}

              {errors && (
                <Typography color="error" mt={1}>
                  {helperText}
                </Typography>
              )}
            </Box>
          );
        }}
      />
    );
  }

  return (
    <FormControl fullWidth error={!!errors[name]}>
      <label className="block text-lg lg:text-sm font-medium mb-1">
        {label}
      </label>

      {/* agar select field ho */}
      {isSelectField ? (
        <Select
          displayEmpty
          fullWidth
          defaultValue=""
          {...register(name)}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: errors[name]
                ? theme.palette.error.main
                : isValid
                  ? '#4caf50'
                  : theme.palette.borderColor,
            },
          }}
        >
          <MenuItem value="">
            <em>{defaultValue ? defaultValue : `Select ${label == "Type" ? "Report" : label}`}</em>
          </MenuItem>
          {options.map((opt, idx) => (
            <MenuItem key={idx} value={JSON.stringify(opt)}>
              {opt?.name}
            </MenuItem>
          ))}
        </Select>
      ) : (
        // agar normal text/password ho
        <TextField
          placeholder={`Enter ${label == "Report Title" ? "(e.g., Blood Test Oct 2025)" : label}`}
          type={isPasswordField ? inputType : type}
          {...register(name)}
          variant="outlined"
          defaultValue={defaultValue}
          value={name === "cardNumber"
            ? formatCardNumber(fieldValue || "") : fixedValue !== undefined && fixedValue !== "" ? fixedValue : fieldValue}
          fullWidth
          sx={(theme) => ({
            '& .MuiOutlinedInput-root': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: errors[name] && showEndAdornment
                  ? theme.palette.error.main
                  : isValid && showEndAdornment
                    ? '#4caf50'
                    : theme.palette.borderColor,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: errors[name]
                  ? theme.palette.error.main
                  : isValid
                    ? '#4caf50'
                    : theme.palette.borderColor,
              },
            },
          })}
          InputProps={{
            readOnly: fixedValue !== undefined && fixedValue !== "",
            endAdornment: (
              <InputAdornment position="end">
                {showEndAdornment && (
                  <>
                    {/* Password Visibility Toggle */}
                    {isPasswordField && !errors[name] && (
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <VisibilityOff className="text-gray-500" />
                        ) : (
                          <Visibility className="text-primary" />
                        )}
                      </IconButton>
                    )}

                    {/* Error / Success Icons */}
                    {errors[name] && (
                      <span
                        style={{
                          color: '#ef4444',
                          fontSize: '1rem',
                          marginLeft: '4px',
                          fontFamily: theme?.typography?.fontFamily,
                          fontWeight: 'bold',
                        }}
                      >
                        <Error />
                      </span>
                    )}
                    {!errors[name] && fieldValue && fieldValue.trim() !== '' && (
                      <span
                        style={{
                          color: '#4caf50',
                          fontSize: '1rem',
                          marginLeft: '8px',
                          fontFamily: theme?.typography?.fontFamily,
                          fontWeight: 'bold',
                        }}
                      >
                        <CheckCircle />
                      </span>
                    )}
                  </>
                )}

              </InputAdornment>
            ),
          }}
        />
      )}

      {errors[name]?.message && (
        <FormHelperText sx={{ fontWeight: '700', marginLeft: '4px' }}>
          {errors[name]?.message?.toString()}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default ValidatedTextField;


// const ValidatedTextField = ({
//   name,
//   label,
//   type = 'text',
//   register,
//   errors,
//   isValid,
//   control,
//   options = [],
//   fixedValue = "",
//   defaultValue = "",
//   showEndAdornment = true
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const theme = useTheme()

//   const fieldValue = useWatch({ control, name }); // realtime value track karega
//   const isPasswordField = type === 'password';
//   const isSelectField = type === 'select';
//   const inputType = isPasswordField && !showPassword ? 'password' : 'text';
//   return (
//     <FormControl fullWidth error={!!errors[name]}>
//       <label className="block text-lg lg:text-sm font-medium mb-1">
//         {label}
//       </label>

//       {/* agar select field ho */}
//       {isSelectField ? (
//         <Select
//           displayEmpty
//           fullWidth
//           defaultValue=""
//           {...register(name)}
//           sx={{
//             '& .MuiOutlinedInput-notchedOutline': {
//               borderColor: errors[name]
//                 ? theme.palette.error.main
//                 : isValid
//                   ? '#4caf50'
//                   : theme.palette.borderColor,
//             },
//           }}
//         >
//           <MenuItem value="">
//             <em>{defaultValue ? defaultValue : `Select ${label}`}</em>
//           </MenuItem>
//           {options.map((opt, idx) => (
//             <MenuItem key={idx} value={JSON.stringify(opt)}>
//               {opt?.name}
//             </MenuItem>
//           ))}
//         </Select>
//       ) : (
//         // agar normal text/password ho
//         <TextField
//           placeholder={`Enter ${label}`}
//           type={isPasswordField ? inputType : type}
//           {...register(name)}
//           variant="outlined"
//           defaultValue={defaultValue}
//           value={name === "cardNumber"
//             ? formatCardNumber(fieldValue || "") : fixedValue !== undefined && fixedValue !== "" ? fixedValue : fieldValue}
//           fullWidth
//           sx={(theme) => ({
//             '& .MuiOutlinedInput-root': {
//               '& .MuiOutlinedInput-notchedOutline': {
//                 borderColor: errors[name] && showEndAdornment
//                   ? theme.palette.error.main
//                   : isValid && showEndAdornment
//                     ? '#4caf50'
//                     : theme.palette.borderColor,
//               },
//               '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                 borderColor: errors[name]
//                   ? theme.palette.error.main
//                   : isValid
//                     ? '#4caf50'
//                     : theme.palette.borderColor,
//               },
//             },
//           })}
//           InputProps={{
//             readOnly: fixedValue !== undefined && fixedValue !== "",
//             endAdornment: (
//               <InputAdornment position="end">
//                 {showEndAdornment && (
//                   <>
//                     {/* Password Visibility Toggle */}
//                     {isPasswordField && !errors[name] && (
//                       <IconButton
//                         onClick={() => setShowPassword((prev) => !prev)}
//                         edge="end"
//                         tabIndex={-1}
//                       >
//                         {showPassword ? (
//                           <VisibilityOff className="text-gray-500" />
//                         ) : (
//                           <Visibility className="text-primary" />
//                         )}
//                       </IconButton>
//                     )}

//                     {/* Error / Success Icons */}
//                     {errors[name] && (
//                       <span
//                         style={{
//                           color: '#ef4444',
//                           fontSize: '1rem',
//                           marginLeft: '4px',
//                           fontFamily: theme?.typography?.fontFamily,
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         <Error />
//                       </span>
//                     )}
//                     {!errors[name] && fieldValue && fieldValue.trim() !== '' && (
//                       <span
//                         style={{
//                           color: '#4caf50',
//                           fontSize: '1rem',
//                           marginLeft: '8px',
//                           fontFamily: theme?.typography?.fontFamily,
//                           fontWeight: 'bold',
//                         }}
//                       >
//                         <CheckCircle />
//                       </span>
//                     )}
//                   </>
//                 )}

//               </InputAdornment>
//             ),
//           }}
//         />
//       )}

//       {errors[name]?.message && (
//         <FormHelperText sx={{ fontWeight: '700', marginLeft: '4px' }}>
//           {errors[name]?.message?.toString()}
//         </FormHelperText>
//       )}
//     </FormControl>
//   );
// };

// export default ValidatedTextField;
