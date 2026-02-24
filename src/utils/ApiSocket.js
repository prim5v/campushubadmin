// src/utils/ApiSocket.js

const BASE_URL = "https://campushub4293.pythonanywhere.com/";

/* ----------------------------- */
/* CSRF Token Extraction         */
/* ----------------------------- */
function getCSRFToken() {
  const match = document.cookie.match(/(^| )csrf_token=([^;]+)/);
  return match ? match[2] : null;
}

/* ----------------------------- */
/* Core Secure Request Wrapper   */
/* ----------------------------- */
async function request(method, endpoint, body = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const csrfToken = getCSRFToken();
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }

  const config = {
    method,
    headers,
    credentials: "include", // critical for HttpOnly JWT
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    // Automatic auth failure handling
    if (response.status === 401) {
      window.location.href = "/login";
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/* ----------------------------- */
/* Dashboard Endpoints           */
/* ----------------------------- */

export async function fetchDashboardOverview() {
  return request("GET", "/admin/get_dashboard_overview");
}

export async function fetchRecentActivity(limit = 10) {
  const data = await request("GET", "/admin/get_recent_system_activity");
  if (data?.activities) {
    return data.activities.slice(0, limit);
  }
  return [];
}

export async function fetchAllActivities() {
  const data = await request("GET", "/admin/get_recent_system_activity");
  return data?.activities || [];
}

/* ----------------------------- */
/* Generic Methods (Optional)    */
/* ----------------------------- */

export const Api = {
  get: (url) => request("GET", url),
  post: (url, body) => request("POST", url, body),
  put: (url, body) => request("PUT", url, body),
  delete: (url) => request("DELETE", url),
};