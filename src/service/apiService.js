export const postApiCall = {
  authFlow: {
    signIn: `/api/v1/users/login`,
       googleLogin: `/api/v1/users/googleLogin`,
    signUp: `/api/v1/users/signup`,
    verification: `/api/v1/users/verify`,
    resend: `/api/v1/users/resend`,
    forget: `/api/v1/users/sendPasswordLink`,
    resetPassword: `/api/v1/users/resetPassword`,
    updateProfile: `/api/v1/users/updateProfile`,
    changePassword: `/api/v1/users/changePassword`,
  },
  Vitals: {
    add: '/api/addVitals'
  },
  Reports: {
    add: '/api/upload'
  },

  adminAddDetail: {
    createUser: `/api/admin/addUser`,
    updateUser: (id) => `/api/admin/updateUser/${id}`,
    deleteUser: (id) => `/api/admin/deleteUser/${id}`,
  },
  UserAddDetail: {
    createUser: `/api/loan/createLoan`,
  },
};

export const getApiCall = {
  // getAdmin api
  Vitals: {
    getAllVitals: `/api/getVitals`,
  },
  Files: {
    getAll: '/api/allFiles'
  },
  adminReadDetails: {
    getAllUser: `/api/admin/getAllUser`,
    getAllLoans: `/api/admin/getAllLoans`,
    getAllPayments: `/api/admin/getPayments`,
    getAllGuarantors: `/api/admin/guarantors`,
    getLoadDetailsId: `/api/admin/getLoanDetails`,
  },
  // this apis  user and admin both acces
  getLoanRepayDetailid: `/api/repayments/loan`,

  // getUser api
  userReadDetails: {
    getMyLoan: `/api/loan/getMyLoan`
  }
};

export const putApiCall = {
  // getAdmin api
  adminUpdateDetail: {
    updateUser: (id) => `/api/admin/updateUser/${id}`,
  },
  Vitals: {
    updateVital: '/api/updateVital'
  }
};
export const deleteApiCall = {
  // getAdmin api
  adminDeleteDetail: {
    deleteUser: (id) => `/api/admin/deleteUser/${id}`,
  },
  deleteVital: {
    deleteVitalById: `/api/deleteVital`,

  },
  Reports: {
    deleteFileById: `/api/deleteFile`,
  }
};
