const API_URL = 'http://85.94.117.27:5000';

/** ✅ Dohvatanje svih magacina */
export const getWarehouses = async () => {
  try {
    const response = await fetch(`${API_URL}/warehouses`);
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching warehouses:', error);
    return { error: 'Failed to fetch warehouses.' };
  }
};

/** ✅ Dohvatanje svih vrsta troškova */
export const getExpenseTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/expense-types`);
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching expense types:', error);
    return { error: 'Failed to fetch expense types.' };
  }
};

/** ✅ Dohvatanje svih vrsta dokumenata */
export const getDocumentTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/document-types`);
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching document types:', error);
    return { error: 'Failed to fetch document types.' };
  }
};

/** ✅ Dohvatanje opcija za setup */
export const getSetupOptions = async () => {
  try {
    const response = await fetch(`${API_URL}/setup-options`);
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching setup options:', error);
    return { error: 'Failed to fetch setup options.' };
  }
};

/** ✅ Čuvanje podataka skeniranog QR koda u bazu */
export const saveQRCodeScan = async (userId, companyId, clientId, warehouseId, expenseTypeId, documentTypeId, setupOptionId, qrData) => {
  try {
    const response = await fetch(`${API_URL}/save-qrcode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        company_id: companyId,
        client_id: clientId,
        warehouse_id: warehouseId,
        expense_type_id: expenseTypeId,
        document_type_id: documentTypeId,
        setup_option_id: setupOptionId,
        qr_data: qrData,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Error saving QR code scan:', error);
    return { error: 'Failed to save QR code scan.' };
  }
};


// ✅ API za ažuriranje rješenja tiketa
export const updateTicketResolution = async (ticketId, resolutionComment) => {
    try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}/update-resolution`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ resolution_comment: resolutionComment }),
        });

        return await response.json();
    } catch (error) {
        console.error('❌ Error updating ticket resolution:', error);
        return { error: 'Failed to update ticket resolution.' };
    }
};

// 📌 API: Dohvatanje imena korisnika na osnovu user_id
export const getUserNameById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching username:', error);
    return { error: 'Failed to fetch username.' };
  }
};


// ✅ API za dodeljivanje tiketa korisniku
export const assignTicket = async (ticketId, userId) => {
    try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}/assign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId }),
        });

        return await response.json();
    } catch (error) {
        console.error('❌ Error assigning ticket:', error);
        return { error: 'Failed to assign ticket.' };
    }
};
// ✅ API za zatvaranje tiketa
export const closeTicket = async (ticketId) => {
    try {
        const response = await fetch(`${API_URL}/tickets/${ticketId}/close`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const textResponse = await response.text(); // Čitamo odgovor kao tekst



        if (!response.ok) {
            throw new Error(`Server error: ${response.status} - ${textResponse}`);
        }

        return JSON.parse(textResponse); // Pokušavamo parsirati odgovor samo ako je validan JSON
    } catch (error) {
        console.error('❌ Error closing ticket:', error);
        return { error: 'Failed to close ticket. Please try again.' };
    }
};



//vrste problema

export const getProblemTypes = async () => {
  try {
    const response = await fetch(`${API_URL}/problem-types`);
    return await response.json();
  } catch (error) {
    console.error('❌ Error fetching problem types:', error);
    return { error: 'Failed to fetch problem types.' };
  }
};

// ✅ Dohvatanje svih tiketa za klijenta
export const getTicketsForClient = async (clientId) => {
  try {
    const response = await fetch(`${API_URL}/clients/${clientId}/tickets`);
    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dohvatanju tiketa:', error);
    return { error: 'Failed to fetch tickets.' };
  }
};

// ✅ Dohvatanje detalja tiketa sa komentarima
export const getTicketDetails = async (ticketId) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}`);
    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dohvatanju detalja tiketa:', error);
    return { error: 'Failed to fetch ticket details.' };
  }
};

// ✅ Dodavanje novog tiketa
export const addTicket = async (userId, companyId, clientId, problemTypeId, description, image) => {
  try {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        company_id: companyId,
        client_id: clientId,
        problem_type_id: problemTypeId,
        description,
        image
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dodavanju tiketa:', error);
    return { error: 'Failed to add ticket.' };
  }
};

// ✅ Dodavanje komentara na tiket
export const addTicketComment = async (ticketId, userId, comment) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        comments: comment, // Slanje komentara
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Error adding comment:', error);
    return { error: 'Failed to add comment.' };
  }
};


// ✅ Ažuriranje statusa i rešenja tiketa
export const updateTicket = async (ticketId, assignedTo, status, resolutionComment) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        assigned_to: assignedTo,
        status,
        resolution_comment: resolutionComment
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri ažuriranju tiketa:', error);
    return { error: 'Failed to update ticket.' };
  }
};


// ✅ Dohvatanje radnih logova za korisnika
export const getUserWorkLogs = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/work-logs`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Failed to fetch work logs.');

 return data;
  } catch (error) {
    console.error('❌ Error fetching work logs:', error);
    return { error: error.message };
  }
};

// ✅ **Dodavanje radnog vremena (Work Log)**
export const addWorkLog = async (userId, companyId, clientId, date, timeIn, timeOut, breakStart, breakEnd) => {
  try {
    const response = await fetch(`${API_URL}/work-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        company_id: companyId,
        client_id: clientId,
        work_date: date,
        check_in_time: timeIn,
        check_out_time: timeOut,
        break_start: breakStart,
        break_end: breakEnd
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dodavanju radnog vremena:', error);
    return { error: 'Failed to add work log.' };
  }
};

// ✅ **Ažuriranje radnog vremena (Work Log)**
export const updateWorkLog = async (logId, timeIn, timeOut, breakStart, breakEnd) => {
  try {
    const response = await fetch(`${API_URL}/work-log/${logId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        check_in_time: timeIn,
        check_out_time: timeOut,
        break_start: breakStart,
        break_end: breakEnd
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri ažuriranju radnog vremena:', error);
    return { error: 'Failed to update work log.' };
  }
};



// ✅ Ažuriranje taska
export const updateTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_name: task.taskName,
        date_worked: task.date,
        hours_worked: task.hours,
        minutes_worked: task.minutes,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Error updating task:', error);
    return { error: 'Failed to update task.' };
  }
};

// ✅ Resetovanje lozinke
export const resetPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/users/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword }),
    });

    return await response.json();
  } catch (error) {
    console.error('Error resetting password:', error);
    return { error: 'Failed to reset password.' };
  }
};

// ✅ Registracija korisnika
export const registerUser = async (email, password, username) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri registraciji:', error);
    return { error: 'Failed to connect to the server.' };
  }
};

// ✅ Login korisnika
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri loginu:', error);
    return { error: 'Failed to connect to the server.' };
  }
};

// ✅ Dohvatanje firmi po userId
export const getUserCompanies = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/companies/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dohvatanju firmi:', error);
    return { error: 'Failed to fetch companies.' };
  }
};

// ✅ Dohvatanje klijenata po korisniku i firmi
export const getClientsForUserAndCompany = async (userId, companyId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/clients/${companyId}`);
    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dohvatanju klijenata:', error);
    return { error: 'Failed to fetch clients.' };
  }
};

// ✅ Dohvatanje taskova na osnovu korisnika i klijenta
export const getTasksForClient = async (userId, clientId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/clients/${clientId}/tasks`);
    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dohvatanju taskova:', error);
    return { error: 'Failed to fetch tasks.' };
  }
};

// ✅ Dodavanje novog taska
export const addTask = async (userId, clientId, companyId, taskName, dateWorked, hoursWorked, minutesWorked) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        client_id: clientId,
        company_id: companyId,
        task_name: taskName,
        date_worked: dateWorked,
        hours_worked: hoursWorked,
        minutes_worked: minutesWorked
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('❌ Greška pri dodavanju taska:', error);
    return { error: 'Failed to add task.' };
  }
};




