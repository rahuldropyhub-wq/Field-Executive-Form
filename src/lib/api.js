// API calls to our Express/Vercel backend which connects to Neon PostgreSQL

export const submitApplication = async (data) => {
  const response = await fetch('/api/candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit application");
  }

  return result;
}

export const getCandidates = async () => {
  const response = await fetch('/api/candidates');
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch candidates");
  }

  return result;
}

export const submitTideApplication = async (data) => {
  const response = await fetch('/api/tide-candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit application");
  }

  return result;
}

export const getTideCandidates = async () => {
  const response = await fetch('/api/tide-candidates');
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch candidates");
  }

  return result;
}

export const loginAdmin = async (email, password) => {
  const response = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Login failed");
  }

  return result;
}

// Optionally implement delete if needed later
export const deleteCandidate = async (id) => {
  // Mocked for now since backend doesn't have a DELETE route yet
  console.log("Delete not implemented in API yet for ID:", id);
}
