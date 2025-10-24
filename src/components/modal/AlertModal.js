'use client';
import Swal from 'sweetalert2';
export default function AlertModal({
  icon = 'success',
  title,
  text,
  buttonText = 'OK',
  infoButtonText = 'No Cancel',
}) {
  const buttonColor =
    icon === 'error' || icon === 'info'
      ? 'bg-[#ed1010] hover:bg-red-700'
      : icon === 'success'
        ? 'bg-black hover:bg-gray-800'
        : '';
  const checkInfo =
    icon === 'info'
      ? 'flex border-[#999999] bg-white text-black border-2'
      : 'hidden';

  return Swal.fire({
    html: `
    <div class="swal-container">
      <h2 class="swal-title">${title}</h2>
      ${text ? `<p class="swal-text">${text}</p>` : ''}
      <button id="main-btn" class="main text-white py-2 sm:py-3 w-full rounded-md text-lg font-medium ${buttonColor}">
        ${buttonText}
      </button>
      <button class="${checkInfo} text-black flex justify-center items-center py-2 sm:py-3 mt-3 sm:mt-6 w-full rounded-lg text-lg font-normal">
        ${infoButtonText}
      </button>
    </div>
  `,
    icon,
    didOpen: () => {
      const icon = document.querySelector('.swal2-icon.swal2-info'); // <-- Sirf 'info' icon target karega
      if (icon) {
        icon.innerHTML = `<div style="font-size:40px; font-weight:bold;color:#ed1010">!</div>`;
      }

      const mainBtn = document.getElementById('main-btn');
      if (mainBtn) {
        console.log(buttonText, `which ${buttonText} clicked`);

        mainBtn.addEventListener('click', () => {
          if (buttonText === 'Close' || buttonText === 'No Cancel' || 'OK') {
            Swal.close();
          }
          if (buttonText === 'Login') {
            window.location.href = '/signin'; // ya Next.js router push bhi kar sakte ho
          }
        });
      }
    },
    background: '#fff',
    showConfirmButton: false,
    customClass: {
      popup: 'no-default-padding ',
    },
  });
}

// Swal.fire({
//   html: `
//     <div class="swal-container">
//       <div class="swal-icon">
//         <svg viewBox="0 0 24 24" width="80" height="80">
//           <circle cx="12" cy="12" r="10" fill="#4BB543"/>
//           <path d="M7 12l3 3 6-6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
//         </svg>
//       </div>
//       <h2 class="swal-title">Password Changed!</h2>
//       <p class="swal-text">You can now use your new password to login to your account.</p>
//       <button class="swal-button" onclick="Swal.close()">Login</button>
//     </div>
//   `,
//   showConfirmButton: false,
//   background: '#fff',
//   customClass: {
//     popup: 'no-default-padding'
//   }
// });
