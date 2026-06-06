import { supabase } from "./supabase.js"

const MOCK_DELAY = 1000

// Helper to simulate network delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Local storage key for mock data
const MOCK_STORAGE_KEY = "mock_candidates"

const getMockData = () => {
  const data = localStorage.getItem(MOCK_STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveMockData = (data) => {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(data))
}

export const submitApplication = async (data) => {
  if (supabase) {
    const { data: result, error } = await supabase
      .from("candidates")
      .insert([data])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        throw new Error("Application with this email or mobile number already exists.")
      }
      throw new Error(error.message)
    }

    return result
  } else {
    // Mock implementation
    await delay(MOCK_DELAY)
    const existing = getMockData()
    if (existing.some((c) => c.email === data.email || c.mobile_number === data.mobile_number)) {
      throw new Error("Application with this email or mobile number already exists.")
    }

    const newCandidate = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    saveMockData([...existing, newCandidate])
    return newCandidate
  }
}

export const getCandidates = async () => {
  if (supabase) {
    const { data, error } = await supabase
      .from("candidates")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw new Error(error.message)
    return data
  } else {
    // Mock implementation
    await delay(MOCK_DELAY)
    const data = getMockData()
    return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }
}

export const deleteCandidate = async (id) => {
  if (supabase) {
    const { error } = await supabase.from("candidates").delete().eq("id", id)
    if (error) throw new Error(error.message)
  } else {
    // Mock implementation
    await delay(MOCK_DELAY)
    const existing = getMockData()
    saveMockData(existing.filter((c) => c.id !== id))
  }
}
