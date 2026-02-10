import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const fetchEmployees = () => {
  return API.get("/employees/");
};

export const addEmployee = (data) => {
  return API.post("/employees/", data);
};

export const deleteEmployee = (employeeId) => {
  return API.delete(`/employees/${employeeId}`);
};

export const markAttendance = (data) => {
  return API.post("/attendance/", data);
};

export const fetchAttendance = (employeeId, startDate, endDate) => {
  let url = `/attendance/${employeeId}`;
  const params = [];

  if (startDate) params.push(`start_date=${startDate}`);
  if (endDate) params.push(`end_date=${endDate}`);

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  return API.get(url);
};

export const fetchAttendanceSummary = (employeeId) => {
  return API.get(`/attendance/${employeeId}/summary`);
};

export const fetchDashboardStats = () => {
  return API.get("/dashboard/");
};
