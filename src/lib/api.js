// API calls to our Express/Vercel backend which connects to Neon PostgreSQL

export const submitDropyCandidateApplication = async (data) => {
  const response = await fetch('/api/dropy-candidates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to submit candidate application");
  }

  return result;
}

export const getDropyCandidates = async () => {
  const response = await fetch('/api/dropy-candidates');
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch candidate applications");
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
  console.log("Delete not implemented in API yet for ID:", id)
}
