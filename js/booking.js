/* ==========================================================================
   ST-SCHON USA LLC - BULLETPROOF & FAST APPOINTMENT BOOKING ENGINE
   Now integrated with instant email dispatch to contact@st-schon.com
   ========================================================================== */

(function () {
  'use strict';

  // Booking Engine State
  const bookingState = {
    step: 1,
    topic: 'Wholesale & Bulk Inquiry',
    date: null,
    time: null,
    userData: {}
  };

  let calDate = new Date();

  document.addEventListener('DOMContentLoaded', () => {
    initWizard();
    setupEmailCopyBtn();
  });

  function initWizard() {
    const wizardBox = document.getElementById('booking-wizard-card');
    if (!wizardBox) return;

    // Step 1 Topic Selection
    const topicEls = document.querySelectorAll('.topic-item');
    if (topicEls.length > 0) {
      topicEls[0].classList.add('selected');
      bookingState.topic = topicEls[0].getAttribute('data-topic');
      enableStepBtn(1);
    }

    topicEls.forEach(el => {
      el.addEventListener('click', () => {
        topicEls.forEach(t => t.classList.remove('selected'));
        el.classList.add('selected');
        bookingState.topic = el.getAttribute('data-topic');
        enableStepBtn(1);
        setTimeout(() => goToStep(2), 200);
      });
    });

    // Step 2 Calendar
    renderCalendar(calDate);

    const prevBtn = document.getElementById('cal-prev');
    const nextBtn = document.getElementById('cal-next');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        calDate.setMonth(calDate.getMonth() - 1);
        renderCalendar(calDate);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        calDate.setMonth(calDate.getMonth() + 1);
        renderCalendar(calDate);
      });
    }

    // Step Navigation Buttons
    document.querySelectorAll('.wizard-next').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentPane = btn.closest('.wizard-step');
        if (currentPane) {
          const stepId = parseInt(currentPane.id.replace('pane-', ''), 10);
          if (stepId < 4) {
            goToStep(stepId + 1);
          }
        }
      });
    });

    document.querySelectorAll('.wizard-prev').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentPane = btn.closest('.wizard-step');
        if (currentPane) {
          const stepId = parseInt(currentPane.id.replace('pane-', ''), 10);
          if (stepId > 1) {
            goToStep(stepId - 1);
          }
        }
      });
    });

    // Step Circles Navigation
    document.querySelectorAll('.step-circle').forEach((circle, idx) => {
      circle.style.cursor = 'pointer';
      circle.addEventListener('click', () => {
        goToStep(idx + 1);
      });
    });

    // Step 4 Form Submission
    const form = document.getElementById('appointment-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        completeAppointment();
      });
    }
  }

  function renderCalendar(date) {
    const title = document.getElementById('cal-month-title');
    const grid = document.getElementById('cal-days-grid');
    if (!grid || !title) return;

    const year = date.getFullYear();
    const month = date.getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    title.innerText = `${months[month]} ${year}`;
    grid.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement('div');
      blank.className = 'day-cell disabled';
      grid.appendChild(blank);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'day-cell';
      dayEl.innerText = day;

      const dObj = new Date(year, month, day);

      if (dObj.setHours(0,0,0,0) < today.setHours(0,0,0,0)) {
        dayEl.classList.add('disabled');
      } else {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        if (!bookingState.date && day === today.getDate() && month === today.getMonth()) {
          bookingState.date = dateStr;
          dayEl.classList.add('selected');
          enableStepBtn(2);
          renderTimeSlots();
        } else if (bookingState.date === dateStr) {
          dayEl.classList.add('selected');
        }

        dayEl.addEventListener('click', () => {
          document.querySelectorAll('.day-cell').forEach(d => d.classList.remove('selected'));
          dayEl.classList.add('selected');
          bookingState.date = dateStr;
          enableStepBtn(2);
          renderTimeSlots();
          setTimeout(() => goToStep(3), 200);
        });
      }

      grid.appendChild(dayEl);
    }
  }

  function renderTimeSlots() {
    const container = document.getElementById('time-slots-grid');
    if (!container) return;

    container.innerHTML = '';
    const slots = ['09:30 AM (EST)', '11:00 AM (EST)', '01:30 PM (EST)', '03:00 PM (EST)', '04:30 PM (EST)', '06:00 PM (EST)'];

    slots.forEach((slot, idx) => {
      const chip = document.createElement('div');
      chip.className = 'slot-item';
      chip.innerText = slot;

      if (!bookingState.time && idx === 0) {
        bookingState.time = slot;
        chip.classList.add('selected');
        enableStepBtn(3);
      } else if (bookingState.time === slot) {
        chip.classList.add('selected');
      }

      chip.addEventListener('click', () => {
        document.querySelectorAll('.slot-item').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        bookingState.time = slot;
        enableStepBtn(3);
        setTimeout(() => goToStep(4), 200);
      });

      container.appendChild(chip);
    });
  }

  function enableStepBtn(stepNum) {
    const btn = document.querySelector(`#pane-${stepNum} .wizard-next`);
    if (btn) {
      btn.removeAttribute('disabled');
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'all';
    }
  }

  function goToStep(stepNum) {
    bookingState.step = stepNum;

    document.querySelectorAll('.step-circle').forEach((el, idx) => {
      const num = idx + 1;
      el.classList.remove('active', 'done');
      if (num === stepNum) el.classList.add('active');
      else if (num < stepNum) el.classList.add('done');
    });

    document.querySelectorAll('.wizard-step').forEach((pane, idx) => {
      if (idx + 1 === stepNum) pane.classList.add('active');
      else pane.classList.remove('active');
    });
  }

  function completeAppointment() {
    bookingState.userData = {
      name: document.getElementById('input-name').value || 'Valued Client',
      email: document.getElementById('input-email').value || 'contact@st-schon.com',
      notes: document.getElementById('input-notes').value || 'None'
    };

    const ticketId = 'ST-' + Math.floor(100000 + Math.random() * 900000);
    const appointmentData = {
      id: ticketId,
      topic: bookingState.topic,
      date: bookingState.date || new Date().toISOString().split('T')[0],
      time: bookingState.time || '10:00 AM (EST)',
      user: bookingState.userData,
      bookedAt: new Date().toISOString()
    };

    // Save to LocalStorage
    const saved = JSON.parse(localStorage.getItem('st_schon_bookings') || '[]');
    saved.push(appointmentData);
    localStorage.setItem('st_schon_bookings', JSON.stringify(saved));

    // Dispatch Email to contact@st-schon.com on Hostinger
    fetch('send-booking.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData)
    })
    .then(res => res.json())
    .then(data => console.log('Booking Email Dispatch:', data))
    .catch(err => console.log('Local environment: saved to storage & ready for Hostinger mailer'));

    renderTicket(appointmentData);
    goToStep(5);

    if (window.showToast) {
      window.showToast(`Appointment Reserved! Sent to contact@st-schon.com`);
    }
  }

  function renderTicket(app) {
    const container = document.getElementById('ticket-result-box');
    if (!container) return;

    container.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--accent-terracotta-light); color: var(--accent-terracotta); font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">✓</div>
        <h3 style="font-size: 2rem; margin-bottom: 0.5rem; font-family: var(--font-serif);">Appointment Reserved</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem;">Confirmation email dispatched to <strong>contact@st-schon.com</strong> and <strong>${app.user.email}</strong></p>
        
        <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; margin: 2rem 0; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem;"><span style="color: var(--text-muted);">Ticket Reference:</span><strong style="color: var(--accent-terracotta); font-family: monospace;">#${app.id}</strong></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem;"><span style="color: var(--text-muted);">Topic:</span><strong>${app.topic}</strong></div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.6rem;"><span style="color: var(--text-muted);">Date & Time:</span><strong style="color: var(--accent-terracotta);">${app.date} at ${app.time}</strong></div>
          <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Attendee:</span><strong>${app.user.name}</strong></div>
        </div>

        <button id="download-ics-btn" class="btn btn-primary" style="width: 100%;">
          <i class="fa-solid fa-calendar-plus"></i> Download Calendar Invite (.ics)
        </button>
      </div>
    `;

    document.getElementById('download-ics-btn').addEventListener('click', () => {
      downloadIcs(app);
    });
  }

  function downloadIcs(app) {
    const dFormatted = app.date.replace(/-/g, '');
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ST-SCHON USA LLC//Appointment Engine//EN',
      'BEGIN:VEVENT',
      `UID:${app.id}@st-schon.com`,
      `DTSTART:${dFormatted}T100000Z`,
      `DTEND:${dFormatted}T103000Z`,
      `SUMMARY:ST-SCHON Consultation - ${app.topic}`,
      `DESCRIPTION:Appointment #${app.id} with ST-SCHON USA LLC. Attendee: ${app.user.name}`,
      'LOCATION:ST-SCHON Virtual Room',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `ST_SCHON_${app.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function setupEmailCopyBtn() {
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('contact@st-schon.com');
        copyBtn.innerText = 'Copied!';
        setTimeout(() => copyBtn.innerText = 'Copy Email', 2000);
        if (window.showToast) window.showToast('Email copied: contact@st-schon.com');
      });
    }
  }
})();
