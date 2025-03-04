const API_URL = 'http://85.94.117.27:5000';

export const updateTask = async (task) => {
  try {
    const response = await fetch(`http://85.94.117.27:5000/tasks/${task.id}`, {
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

// ✅ Dohvatanje firmi na osnovu userId
export const getUserCompanies = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/user/companies/${userId}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Failed to fetch companies.');

    return data;
  } catch (error) {
    console.error('❌ Greška pri dohvatanju firmi:', error);
    return { error: error.message };
  }
};

// ✅ Dohvatanje klijenata po korisniku i firmi
export const getClientsForUserAndCompany = async (userId, companyId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/clients/${companyId}`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Failed to fetch clients.');

    return data;
  } catch (error) {
    console.error('❌ Greška pri dohvatanju klijenata:', error);
    return { error: error.message };
  }
};

// ✅ Dohvatanje taskova na osnovu korisnika i klijenta
export const getTasksForClient = async (userId, clientId) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}/clients/${clientId}/tasks`);
    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Failed to fetch tasks.');

    return data;
  } catch (error) {
    console.error('❌ Greška pri dohvatanju taskova:', error);
    return { error: error.message };
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

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || 'Failed to add task.');

    return data;
  } catch (error) {
    console.error('❌ Greška pri dodavanju taska:', error);
    return { error: error.message };
  }
};
