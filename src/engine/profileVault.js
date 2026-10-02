// Kundli Chart Vault Persistence Service
// Manages local chart profiles, category tags, search, and JSON backups

import { sampleProfiles } from './cityData.js';

const VAULT_STORAGE_KEY = 'kundli_saved_profiles';
export const VAULT_CHANGE_EVENT = 'kundli_vault_updated';

export const PROFILE_TAGS = ['All', 'Self', 'Family', 'Client', 'Match', 'Other'];

/**
 * Generate a unique ID for a saved profile
 */
export function generateProfileId() {
  return `prof_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

/**
 * Normalize and seed default profiles if storage is completely empty
 */
function getInitialSeedProfiles() {
  return sampleProfiles.map((sample, index) => ({
    id: `seed_${index + 1}`,
    name: sample.name,
    gender: sample.gender || 'male',
    dob: sample.dob,
    tob: sample.tob,
    city: sample.city,
    lat: sample.lat,
    lng: sample.lng,
    tz: sample.tz ?? 5.5,
    tag: sample.name.includes('Self') ? 'Self' : 'Other',
    notes: 'Pre-loaded sample reference profile',
    createdAt: Date.now() - (sampleProfiles.length - index) * 86400000,
    updatedAt: Date.now(),
  }));
}

/**
 * Retrieve all saved profiles from localStorage
 */
export function getSavedProfiles() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(VAULT_STORAGE_KEY);
    if (!raw) {
      const seeded = getInitialSeedProfiles();
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const seeded = getInitialSeedProfiles();
      localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to read profiles from vault:', err);
    return [];
  }
}

/**
 * Save or update a profile in the vault
 */
export function saveProfile(profileData) {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedProfiles();
    const existingIndex = profileData.id
      ? current.findIndex((p) => String(p.id) === String(profileData.id))
      : current.findIndex(
          (p) => p.name.trim().toLowerCase() === profileData.name.trim().toLowerCase()
        );

    const now = Date.now();
    let updated;

    if (existingIndex >= 0) {
      // Update existing
      const existing = current[existingIndex];
      const merged = {
        ...existing,
        ...profileData,
        id: existing.id,
        updatedAt: now,
      };
      updated = [...current];
      updated[existingIndex] = merged;
    } else {
      // Create new
      const newProfile = {
        id: profileData.id || generateProfileId(),
        name: profileData.name || 'Unnamed Chart',
        gender: profileData.gender || 'male',
        dob: profileData.dob || '1995-08-15',
        tob: profileData.tob || '08:30',
        city: profileData.city || 'Ahmedabad, Gujarat',
        lat: Number(profileData.lat) || 23.0225,
        lng: Number(profileData.lng) || 72.5714,
        tz: Number(profileData.tz) || 5.5,
        tag: profileData.tag || 'Family',
        notes: profileData.notes || '',
        createdAt: now,
        updatedAt: now,
      };
      updated = [newProfile, ...current];
    }

    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(VAULT_CHANGE_EVENT, { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to save profile to vault:', err);
    return getSavedProfiles();
  }
}

/**
 * Delete a profile by ID
 */
export function deleteProfile(profileId) {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedProfiles();
    const updated = current.filter((p) => String(p.id) !== String(profileId));
    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(VAULT_CHANGE_EVENT, { detail: updated }));
    return updated;
  } catch (err) {
    console.error('Failed to delete profile from vault:', err);
    return getSavedProfiles();
  }
}

/**
 * Export all profiles as a formatted JSON file download
 */
export function exportProfilesJson() {
  const profiles = getSavedProfiles();
  const payload = {
    app: 'kundli-software',
    version: '1.0',
    exportedAt: new Date().toISOString(),
    count: profiles.length,
    profiles,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kundli_vault_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import profiles from a JSON string
 */
export function importProfilesJson(jsonStr) {
  try {
    const data = JSON.parse(jsonStr);
    const incoming = Array.isArray(data) ? data : data.profiles;
    if (!Array.isArray(incoming)) {
      throw new Error('Invalid JSON format. Expected an array of profiles or { profiles: [...] }');
    }

    const current = getSavedProfiles();
    const currentMap = new Map(current.map((p) => [String(p.id), p]));

    let addedCount = 0;
    incoming.forEach((item) => {
      if (!item.name || !item.dob) return;
      const id = item.id || generateProfileId();
      currentMap.set(String(id), {
        id,
        name: item.name,
        gender: item.gender || 'male',
        dob: item.dob,
        tob: item.tob || '08:00',
        city: item.city || '',
        lat: Number(item.lat) || 23.0225,
        lng: Number(item.lng) || 72.5714,
        tz: Number(item.tz) || 5.5,
        tag: item.tag || 'Family',
        notes: item.notes || '',
        createdAt: item.createdAt || Date.now(),
        updatedAt: Date.now(),
      });
      addedCount++;
    });

    const merged = Array.from(currentMap.values()).sort(
      (a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)
    );

    localStorage.setItem(VAULT_STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent(VAULT_CHANGE_EVENT, { detail: merged }));
    return { success: true, count: addedCount, total: merged.length };
  } catch (err) {
    console.error('Import failed:', err);
    return { success: false, error: err.message };
  }
}
