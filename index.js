// index.js

// Wait until the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {

  // ======================
  // 1. Navigation Dropdown
  // ======================
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseover', function() {
      this.querySelector('.dropdown-menu').style.display = 'block';
    });
    
    dropdown.addEventListener('mouseout', function() {
      this.querySelector('.dropdown-menu').style.display = 'none';
    });
  });

  // ======================
  // 2. Prayer Times
  // ======================
  function fetchPrayerTimes() {
    // Coordinates for Cherwan, Kangan (approximate)
    const latitude = 34.3167;
    const longitude = 74.9719;
    
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    fetch(`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=2`)
      .then(response => response.json())
      .then(data => {
        const today = data.data[day - 1];
        document.getElementById('fajr').textContent = today.timings.Fajr;
        document.getElementById('dhuhr').textContent = today.timings.Dhuhr;
        document.getElementById('asr').textContent = today.timings.Asr;
        document.getElementById('maghrib').textContent = today.timings.Maghrib;
        document.getElementById('isha').textContent = today.timings.Isha;
      })
      .catch(error => {
        console.error('Error fetching prayer times:', error);
      });
  }
  fetchPrayerTimes();

  // ======================
  // 3. Islamic Calendar
  // ======================
  const calendar = document.getElementById('calendar');
  const monthYear = document.getElementById('currentMonthYear');
  let currentDate = new HijriDate();

  function updateCalendar() {
    calendar.innerHTML = '';
    monthYear.textContent = `${currentDate.getMonthName()} ${currentDate.getFullYear()} AH`;

    // Create calendar days
    for (let day = 1; day <= currentDate.daysInMonth(); day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      dayElement.textContent = day;
      
      // Add click event for event popup
      dayElement.addEventListener('click', function() {
        showEventPopup(day);
      });
      
      calendar.appendChild(dayElement);
    }
  }

  document.getElementById('prevMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
  });

  updateCalendar();

  // ======================
  // 4. Gallery Lightbox
  // ======================
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      lightbox.style.display = 'block';
      lightboxImg.src = this.querySelector('img').src;
      lightboxCaption.textContent = this.querySelector('p').textContent;
    });
  });

  document.querySelector('.lightbox .close').addEventListener('click', function() {
    lightbox.style.display = 'none';
  });

  // ======================
  // 5. Contact Form
  // ======================
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (
      document.getElementById('name').value &&
      document.getElementById('email').value &&
      document.getElementById('message').value
    ) {
      alert('Thank you for your message! We will respond shortly.');
      this.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });

  // ======================
  // 6. Copy Bank Account
  // ======================
  window.copyAccountNumber = function() {
    const accountNumber = this.previousElementSibling.textContent;
    navigator.clipboard.writeText(accountNumber)
      .then(() => alert('Account number copied to clipboard!'))
      .catch(err => console.error('Could not copy text:', err));
  };

  // ======================
  // 7. Ramadan Dates
  // ======================
  document.getElementById('ramadanStart').textContent = 'March 11, 2024';
  document.getElementById('eidFitr').textContent = 'April 10, 2024';

});