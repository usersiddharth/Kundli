import React, { useState, useRef, useEffect } from 'react';
import { cityData, sampleProfiles } from '../engine/cityData.js';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Sparkles,
  Search,
  ChevronDown,
  Bookmark,
  Trash2,
  CheckCircle2,
  X,
} from 'lucide-react';

export default function ProfileForm({ formData, setFormData, onSubmit, t }) {
  const [searchQuery, setSearchQuery] = useState(formData.city || '');
  const [isOpen, setIsOpen] = useState(false);
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [savedMsg, setSavedMsg] = useState(false);
  const dropdownRef = useRef(null);

  // Load saved profiles from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('kundli_saved_profiles');
      if (stored) {
        setSavedProfiles(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Sync searchQuery when formData.city changes
  useEffect(() => {
    setSearchQuery(formData.city || '');
  }, [formData.city]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = cityData.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectCity = (cityObj) => {
    setSearchQuery(cityObj.name);
    setFormData((prev) => ({
      ...prev,
      city: cityObj.name,
      lat: cityObj.lat,
      lng: cityObj.lng,
      tz: cityObj.tz,
    }));
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    setFormData((prev) => ({ ...prev, city: val }));
    setIsOpen(true);

    const exact = cityData.find((c) => c.name.toLowerCase() === val.toLowerCase());
    if (exact) {
      setFormData((prev) => ({
        ...prev,
        city: exact.name,
        lat: exact.lat,
        lng: exact.lng,
        tz: exact.tz,
      }));
    }
  };

  const loadProfile = (profile) => {
    setSearchQuery(profile.city);
    setFormData({
      name: profile.name,
      gender: profile.gender || 'male',
      dob: profile.dob,
      tob: profile.tob,
      city: profile.city,
      lat: profile.lat,
      lng: profile.lng,
      tz: profile.tz,
    });
  };

  const handleSaveProfile = () => {
    if (!formData.name) return;
    const newProfile = { ...formData, id: Date.now() };
    const updated = [newProfile, ...savedProfiles.filter((p) => p.name !== formData.name)];
    setSavedProfiles(updated);
    localStorage.setItem('kundli_saved_profiles', JSON.stringify(updated));
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleDeleteProfile = (id, e) => {
    e.stopPropagation();
    const updated = savedProfiles.filter((p) => p.id !== id);
    setSavedProfiles(updated);
    localStorage.setItem('kundli_saved_profiles', JSON.stringify(updated));
  };

  return (
    <div className="rounded-xl glass-panel p-4 sm:p-6 shadow-sm space-y-5 sm:space-y-6">
      {/* Top Header & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-[#e6dfd3]/80 pb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-medium text-[#2c2825] font-serif">
            {t.tabBirthDetails}
          </h2>
          <p className="text-xs text-[#736a60]">
            Enter exact birth parameters for precise planetary positions
          </p>
        </div>

        {/* Sample Profile Presets (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs font-medium text-[#736a60] flex items-center gap-1 shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-[#b85d19]" /> {t.sampleProfiles}:
          </span>
          {sampleProfiles.map((sp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadProfile(sp)}
              className="shrink-0 rounded-lg glass-card px-2.5 py-1.5 text-xs font-medium text-[#544d44] transition hover:bg-[#2c2825] hover:text-[#f4ebd9] active:scale-95 shadow-2xs"
            >
              {sp.name}
            </button>
          ))}
        </div>
      </div>

      {/* Saved Custom Profiles Bar */}
      {savedProfiles.length > 0 && (
        <div className="rounded-lg glass-pill p-3">
          <span className="text-xs font-semibold text-[#544d44] flex items-center gap-1.5 mb-2">
            <Bookmark className="h-3.5 w-3.5 text-[#b85d19]" aria-hidden="true" /> {t.savedProfiles}
            :
          </span>
          <div className="flex flex-wrap gap-2">
            {savedProfiles.map((p) => (
              <div
                key={p.id}
                role="button"
                tabIndex={0}
                onClick={() => loadProfile(p)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    loadProfile(p);
                    e.preventDefault();
                  }
                }}
                className="group flex items-center gap-2 rounded-lg glass-card px-3 py-1 text-xs font-medium text-[#2c2825] hover:border-[#b85d19] cursor-pointer transition shadow-2xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19]"
              >
                <span>
                  {p.name} ({p.city ? p.city.split(',')[0] : ''})
                </span>
                <button
                  type="button"
                  onClick={(e) => handleDeleteProfile(p.id, e)}
                  aria-label={`Delete saved profile for ${p.name}`}
                  className="text-[#a89f91] hover:text-[#802020] transition focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#802020] rounded"
                  title="Delete saved profile"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Name */}
          <div>
            <label
              htmlFor="form-name-input"
              className="mb-1 block text-xs font-medium text-[#544d44] flex items-center gap-1"
            >
              <User className="h-3.5 w-3.5 text-[#736a60]" aria-hidden="true" /> {t.name}
            </label>
            <input
              id="form-name-input"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg glass-input px-3.5 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19]"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="form-gender-select"
              className="mb-1 block text-xs font-medium text-[#544d44]"
            >
              {t.gender}
            </label>
            <select
              id="form-gender-select"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full rounded-lg glass-input px-3.5 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19]"
            >
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label
              htmlFor="form-dob-input"
              className="mb-1 block text-xs font-medium text-[#544d44] flex items-center gap-1"
            >
              <Calendar className="h-3.5 w-3.5 text-[#736a60]" aria-hidden="true" /> {t.dob}
            </label>
            <input
              id="form-dob-input"
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full rounded-lg glass-input px-3.5 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19] font-mono"
              required
            />
          </div>

          {/* TOB */}
          <div>
            <label
              htmlFor="form-tob-input"
              className="mb-1 block text-xs font-medium text-[#544d44] flex items-center gap-1"
            >
              <Clock className="h-3.5 w-3.5 text-[#736a60]" aria-hidden="true" /> {t.tob}
            </label>
            <input
              id="form-tob-input"
              type="time"
              value={formData.tob}
              onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
              className="w-full rounded-lg glass-input px-3.5 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19] font-mono"
              required
            />
          </div>

          {/* Searchable City Selection */}
          <div className="relative" ref={dropdownRef}>
            <label
              htmlFor="form-city-input"
              className="mb-1 block text-xs font-medium text-[#544d44] flex items-center gap-1"
            >
              <MapPin className="h-3.5 w-3.5 text-[#736a60]" aria-hidden="true" /> {t.city}
            </label>

            <div className="relative">
              <input
                id="form-city-input"
                type="text"
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-controls="city-dropdown-list"
                aria-autocomplete="list"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder="Search city (e.g. Surat, Vyara, Udhna)..."
                className="w-full rounded-lg glass-input pl-9 pr-8 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19]"
                required
              />
              <Search
                className="absolute left-3 top-2.5 h-4 w-4 text-[#736a60]"
                aria-hidden="true"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setFormData((prev) => ({
                      ...prev,
                      city: '',
                      lat: null,
                      lng: null,
                    }));
                    setIsOpen(false);
                  }}
                  title="Clear City"
                  aria-label="Clear City"
                  className="absolute right-2.5 top-2.5 h-5 w-5 flex items-center justify-center rounded-full text-[#736a60] hover:text-[#2c2825] hover:bg-[#e6dfd3] transition cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : (
                <ChevronDown
                  className="absolute right-3 top-2.5 h-4 w-4 text-[#736a60] pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Dropdown Suggestions List */}
            {isOpen && searchQuery.length > 0 && (
              <div
                id="city-dropdown-list"
                role="listbox"
                aria-label="City suggestions"
                className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg glass-panel py-1 shadow-lg divide-y divide-[#e6dfd3]/50"
              >
                {filteredCities.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="option"
                    aria-selected={searchQuery.toLowerCase() === c.name.toLowerCase()}
                    onClick={() => selectCity(c)}
                    className="flex w-full items-center justify-between px-3.5 py-2 text-left text-xs hover:bg-[#2c2825] hover:text-[#f4ebd9] transition focus:bg-[#2c2825] focus:text-[#f4ebd9] focus:outline-hidden cursor-pointer"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="font-mono text-[10px] text-[#736a60] group-hover:text-[#f4ebd9]">
                      {c.lat.toFixed(2)}°N, {c.lng.toFixed(2)}°E
                    </span>
                  </button>
                ))}

                {/* Custom Unlisted Place Confirmation */}
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      city: searchQuery,
                      lat: prev.lat || 23.0225,
                      lng: prev.lng || 72.5714,
                      tz: prev.tz || 5.5,
                    }));
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3.5 py-2 text-left text-xs bg-[#e6dfd3]/40 hover:bg-[#2c2825] hover:text-[#f4ebd9] transition font-medium text-[#b85d19] cursor-pointer"
                >
                  <span className="truncate">➕ કસ્ટમ સ્થળ વાપરો: "{searchQuery}"</span>
                  <span className="text-[10px] shrink-0 ml-2">Use Custom</span>
                </button>
              </div>
            )}
          </div>

          {/* Timezone */}
          <div>
            <label
              htmlFor="form-tz-input"
              className="mb-1 block text-xs font-medium text-[#544d44]"
            >
              {t.timezone}
            </label>
            <input
              id="form-tz-input"
              type="number"
              step="0.5"
              value={formData.tz}
              onChange={(e) => setFormData({ ...formData, tz: parseFloat(e.target.value) || 5.5 })}
              className="w-full rounded-lg glass-input px-3.5 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19] font-mono"
              required
            />
          </div>
        </div>

        {/* Lat & Long Coordinates */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="form-lat-input"
              className="mb-1 block text-xs font-medium text-[#544d44]"
            >
              {t.latitude}
            </label>
            <input
              id="form-lat-input"
              type="number"
              step="0.0001"
              value={formData.lat}
              onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-lg glass-input px-3.5 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19] font-mono"
              required
            />
          </div>

          <div>
            <label
              htmlFor="form-lng-input"
              className="mb-1 block text-xs font-medium text-[#544d44]"
            >
              {t.longitude}
            </label>
            <input
              id="form-lng-input"
              type="number"
              step="0.0001"
              value={formData.lng}
              onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })}
              className="w-full rounded-lg glass-input px-3.5 py-2 text-sm text-[#2c2825] focus:outline-hidden focus:ring-2 focus:ring-[#b85d19] font-mono"
              required
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-lg glass-button-dark px-6 py-2.5 text-base font-medium text-[#f4ebd9] shadow-sm transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19]"
          >
            {t.calculateKundli}
          </button>

          <button
            type="button"
            onClick={handleSaveProfile}
            className="flex items-center gap-1.5 rounded-lg glass-card px-4 py-2.5 text-sm font-medium text-[#544d44] hover:bg-white/90 transition shadow-xs focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b85d19]"
          >
            <Bookmark className="h-4 w-4 text-[#b85d19]" aria-hidden="true" />
            <span>{t.saveProfile}</span>
          </button>
        </div>

        {savedMsg && (
          <div className="flex items-center gap-2 rounded-lg glass-badge-success p-3 text-xs font-medium animate-fadeIn">
            <CheckCircle2 className="h-4 w-4" />
            <span>{t.profileSavedMsg}</span>
          </div>
        )}
      </form>
    </div>
  );
}
