import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Bookmark,
  Search,
  Plus,
  Trash2,
  Edit3,
  Download,
  Upload,
  X,
  User,
  MapPin,
  Calendar,
  Clock,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  getSavedProfiles,
  saveProfile,
  deleteProfile,
  exportProfilesJson,
  importProfilesJson,
  PROFILE_TAGS,
  VAULT_CHANGE_EVENT,
} from '../engine/profileVault.js';

export default function ProfileVaultModal({ isOpen, onClose, onSelectProfile, lang = 'gu' }) {
  const [profiles, setProfiles] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProfile, setEditingProfile] = useState(null);
  const [importStatus, setImportStatus] = useState(null);
  const fileInputRef = useRef(null);

  const refreshProfiles = () => {
    setProfiles(getSavedProfiles());
  };

  useEffect(() => {
    refreshProfiles();
    window.addEventListener(VAULT_CHANGE_EVENT, refreshProfiles);
    return () => window.removeEventListener(VAULT_CHANGE_EVENT, refreshProfiles);
  }, []);

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchesTag = selectedTag === 'All' || p.tag === selectedTag;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.city?.toLowerCase().includes(query) ||
        p.notes?.toLowerCase().includes(query);
      return matchesTag && matchesSearch;
    });
  }, [profiles, selectedTag, searchQuery]);

  if (!isOpen) return null;

  const handleStartCreate = () => {
    setEditingProfile({
      name: '',
      gender: 'male',
      dob: '1995-08-15',
      tob: '08:30',
      city: 'Ahmedabad, Gujarat',
      lat: 23.0225,
      lng: 72.5714,
      tz: 5.5,
      notes: '',
      tag: 'Family',
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProfile.name.trim()) return;

    saveProfile(editingProfile);
    setEditingProfile(null);
    refreshProfiles();
  };

  const handleDelete = (id, name) => {
    const confirmMsg =
      lang === 'gu'
        ? `શું તમે ખરેખર "${name}" ની પ્રોફાઇલ કાઢી નાખવા માંગો છો?`
        : lang === 'hi'
          ? `क्या आप सच में "${name}" का प्रोफाइल हटाना चाहते हैं?`
          : `Are you sure you want to delete profile for "${name}"?`;

    if (window.confirm(confirmMsg)) {
      deleteProfile(id);
      refreshProfiles();
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importProfilesJson(event.target.result);
      if (success) {
        setImportStatus('Profiles imported successfully');
        refreshProfiles();
      } else {
        setImportStatus('Failed to import: invalid JSON backup format');
      }
      setTimeout(() => setImportStatus(null), 4000);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-stone-900/40 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-white border border-[#dcd2c2] text-[#231f1c]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6ded2]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#faeee2] text-[#b85d19] border border-[#e8b992]/60">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-medium tracking-tight text-[#1f1a16] font-serif">
                ॥{' '}
                {lang === 'gu'
                  ? 'કુંડળી વોલ્ટ પત્રિકા સંગ્રહ'
                  : lang === 'hi'
                    ? 'कुंडली वॉल्ट संग्रह'
                    : 'Kundli vault'}{' '}
                ॥
              </h2>
              <p className="text-xs text-[#7d746a]">
                {lang === 'gu'
                  ? 'સાચવેલ જન્મપત્રિકા અને પ્રોફાઇલ્સ'
                  : lang === 'hi'
                    ? 'सहेजी गई जन्मपत्री और प्रोफाइल'
                    : 'Saved birth charts and client profiles'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportProfilesJson}
              title="Export all profiles as JSON backup"
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-[#dcd2c2] bg-[#fbf9f5] hover:bg-[#f6f1e8] text-[#575048] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#b85d19]" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Import profiles from JSON backup"
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-[#dcd2c2] bg-[#fbf9f5] hover:bg-[#f6f1e8] text-[#575048] transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[#b85d19]" />
              <span className="hidden sm:inline">Import</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImport}
              accept=".json"
              className="hidden"
            />

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-[#f6f1e8] text-[#7d746a] hover:text-[#231f1c] transition-colors cursor-pointer ml-1"
              aria-label="Close vault"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {importStatus && (
          <div className="px-5 py-2 text-xs bg-[#faeee2] border-b border-[#e8b992]/60 text-[#9c4b0f] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}

        {/* Content Area */}
        {editingProfile ? (
          /* Profile Create/Edit Form */
          <form onSubmit={handleSaveEdit} className="p-5 overflow-y-auto space-y-4 text-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#e6ded2]">
              <h3 className="font-medium text-base text-[#b85d19]">
                {editingProfile.id ? 'Edit profile' : 'Create new profile'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="text-xs text-[#7d746a] hover:text-[#231f1c] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#575048] mb-1">Full name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9185]" />
                  <input
                    type="text"
                    required
                    value={editingProfile.name}
                    onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575048] mb-1">Gender</label>
                <select
                  value={editingProfile.gender}
                  onChange={(e) => setEditingProfile({ ...editingProfile, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575048] mb-1">
                  Date of birth
                </label>
                <input
                  type="date"
                  required
                  value={editingProfile.dob}
                  onChange={(e) => setEditingProfile({ ...editingProfile, dob: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575048] mb-1">
                  Time of birth
                </label>
                <input
                  type="time"
                  required
                  value={editingProfile.tob}
                  onChange={(e) => setEditingProfile({ ...editingProfile, tob: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#575048] mb-1">Birth city</label>
                <input
                  type="text"
                  required
                  value={editingProfile.city}
                  onChange={(e) => setEditingProfile({ ...editingProfile, city: e.target.value })}
                  placeholder="e.g. Surat, Gujarat"
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575048] mb-1">
                  Category tag
                </label>
                <select
                  value={editingProfile.tag}
                  onChange={(e) => setEditingProfile({ ...editingProfile, tag: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden"
                >
                  <option value="Self">Self</option>
                  <option value="Family">Family</option>
                  <option value="Client">Client</option>
                  <option value="Match">Match</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575048] mb-1">
                  Timezone (hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={editingProfile.tz}
                  onChange={(e) =>
                    setEditingProfile({
                      ...editingProfile,
                      tz: parseFloat(e.target.value) || 5.5,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#575048] mb-1">
                  Notes (optional)
                </label>
                <textarea
                  rows={2}
                  value={editingProfile.notes || ''}
                  onChange={(e) => setEditingProfile({ ...editingProfile, notes: e.target.value })}
                  placeholder="Consultation notes, gotra, specific queries..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#e6ded2]">
              <button
                type="button"
                onClick={() => setEditingProfile(null)}
                className="px-4 py-2 rounded-lg border border-[#dcd2c2] text-[#575048] hover:bg-[#f6f1e8] cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#b85d19] hover:bg-[#9c4b0f] text-white font-medium cursor-pointer text-xs transition-colors"
              >
                Save profile
              </button>
            </div>
          </form>
        ) : (
          /* Profile List View */
          <div className="flex flex-col flex-1 min-h-0">
            {/* Search & Filter Bar */}
            <div className="p-4 border-b border-[#e6ded2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9185]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, city, or notes..."
                  className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-[#fbf9f5] border border-[#dcd2c2] text-[#231f1c] focus:border-[#b85d19] focus:outline-hidden"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9b9185] hover:text-[#231f1c]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleStartCreate}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faeee2] hover:bg-[#f3d7bf] text-[#b85d19] border border-[#e8b992]/60 text-xs font-medium transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New profile</span>
              </button>
            </div>

            {/* Tag Filter Pills */}
            <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-[#e6ded2] bg-[#fbf9f5]">
              {PROFILE_TAGS.map((tag) => {
                const isSelected = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#b85d19] text-white font-medium'
                        : 'text-[#575048] hover:bg-[#ede5d7]'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
              <span className="ml-auto text-[11px] text-[#9b9185] font-mono shrink-0">
                {filteredProfiles.length} saved
              </span>
            </div>

            {/* Profiles Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 max-h-[55vh]">
              {filteredProfiles.length === 0 ? (
                <div className="text-center py-12 text-[#7d746a] space-y-2">
                  <Bookmark className="w-8 h-8 mx-auto text-[#dcd2c2]" />
                  <p className="text-sm font-medium">No saved profiles found</p>
                  <p className="text-xs text-[#9b9185]">
                    {searchQuery
                      ? 'Try clearing your search query'
                      : 'Create a profile or save one from the birth details form'}
                  </p>
                </div>
              ) : (
                filteredProfiles.map((p) => {
                  return (
                    <div
                      key={p.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-[#e6ded2] hover:border-[#b85d19]/40 bg-white hover:bg-[#faf6ef] transition-all gap-3 shadow-xs"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm text-[#231f1c] tracking-tight">
                            {p.name}
                          </span>
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-[#faeee2] text-[#9c4b0f] border border-[#e8b992]/60">
                            {p.tag || 'Family'}
                          </span>
                          <span className="text-[11px] text-[#7d746a] capitalize">
                            ({p.gender || 'male'})
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-[#575048] flex-wrap">
                          <span className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3 h-3 text-[#b85d19]" />
                            {p.dob}
                          </span>
                          <span className="flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3 text-[#b85d19]" />
                            {p.tob}
                          </span>
                          <span className="flex items-center gap-1 truncate max-w-[200px]">
                            <MapPin className="w-3 h-3 text-[#b85d19] shrink-0" />
                            {p.city}
                          </span>
                        </div>

                        {p.notes && (
                          <p className="text-[11px] text-[#7d746a] italic line-clamp-1 mt-0.5">
                            "{p.notes}"
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectProfile(p);
                            onClose();
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#b85d19] hover:bg-[#9c4b0f] text-white font-medium text-xs transition-colors cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Load chart</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingProfile(p)}
                          title="Edit profile details"
                          className="p-1.5 rounded-lg text-[#7d746a] hover:text-[#231f1c] hover:bg-[#f6f1e8] transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(p.id, p.name)}
                          title="Delete profile"
                          className="p-1.5 rounded-lg text-[#7d746a] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
