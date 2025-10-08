import React, { useEffect, useMemo, useState } from 'react';
import { Box, Card, CardContent, Typography, IconButton, Button, TextField, Stack } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Close as CloseIcon } from '@mui/icons-material';
import { deleteFollowUp, getClientById, updateFollowUp, FollowUp } from '@src/api/endpoints';
import { useNavigate } from 'react-router-dom';
import { useClientFile } from '../context/ClientFileContext';

type FollowUpPanelProps = {
  clientId: number;
  tab: 'assessment' | 'biochemical' | 'medication' | 'meal';
};

const FollowUpPanel: React.FC<FollowUpPanelProps> = ({ clientId, tab }) => {
  const [followUps, setFollowUps] = useState<FollowUp[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<FollowUp>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loadFromNavigationState } = useClientFile();

  const title = useMemo(() => {
    switch (tab) {
      case 'assessment':
        return 'Assessment Follow-ups';
      case 'biochemical':
        return 'Biochemical Follow-ups';
      case 'medication':
        return 'Medication Follow-ups';
      case 'meal':
        return 'Meal Plan Follow-ups';
      default:
        return 'Follow-ups';
    }
  }, [tab]);

  const fetchFollowUps = async () => {
    try {
      setLoading(true);
      setError(null);
      const client = await getClientById(clientId);
      const items = client.follow_ups || [];
      setFollowUps(items);
    } catch (e: any) {
      setError(e?.message || 'Failed to load follow-ups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUps();
  }, [clientId]);

  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail as { clientId?: number } | undefined;
        if (!detail || !detail.clientId || detail.clientId !== clientId) return;
        fetchFollowUps();
      } catch {}
    };
    document.addEventListener('followup:updated', handler as EventListener);
    return () => document.removeEventListener('followup:updated', handler as EventListener);
  }, [clientId]);

  // Show all follow-ups for each tab - users can edit any follow-up to add data to it
  const filtered = useMemo(() => {
    if (!Array.isArray(followUps)) return [];
    // Return all follow-ups - users can edit any follow-up to add data to it
    return followUps;
  }, [followUps, tab]);

  const beginEdit = (item: FollowUp) => {
    setEditingId(item.id);
    setEditDraft({
      notes: item.notes || '',
      status: item.status,
      weight: item.weight,
      height: item.height,
      blood_pressure: item.blood_pressure,
      temperature: item.temperature,
      date: item.date
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({});
  };

  const saveEdit = async () => {
    if (editingId == null) return;
    try {
      setLoading(true);
      const updated = await updateFollowUp(clientId, editingId, editDraft);
      setFollowUps(prev => prev.map(f => (f.id === editingId ? { ...f, ...updated } : f)));
      cancelEdit();
    } catch (e: any) {
      setError(e?.message || 'Failed to update follow-up');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      await deleteFollowUp(clientId, id);
      setFollowUps(prev => prev.filter(f => f.id !== id));
    } catch (e: any) {
      setError(e?.message || 'Failed to delete follow-up');
    } finally {
      setLoading(false);
    }
  };

  const editInForm = (item: FollowUp) => {
    console.log('✏️ Editing follow-up in form:', item);
    console.log('📋 Current tab:', tab);
    
    // Persist follow-up edit mode
    localStorage.setItem('isFollowUpMode', 'true');
    localStorage.setItem('followUpClientId', String(clientId));
    localStorage.setItem('editingFollowUpId', String(item.id));

    // Build navigation state payload similar to onboarding
    const clientSnapshot = {
      _isFollowUp: true,
      // Top-level fields to aid follow-up backfill and consistency
      name: item.name || '',
      gender: item.gender || '',
      date_of_birth: item.date_of_birth || '',
      weight: item.weight ?? null,
      height: item.height ?? null,
      physical_activity: item.physical_activity || '',
      ward_type: item.ward_type || '',
      stress_factor: item.stress_factor || '',
      feeding_type: item.feeding_type || '',
      assessment: {
        name: item.name || '',
        gender: item.gender || '',
        dateOfBirth: item.date_of_birth || '',
        weight: item.weight != null ? String(item.weight) : '',
        height: item.height != null ? String(item.height) : '',
        weightTypeSelection: '',
        physicalActivity: item.physical_activity || '',
        wardType: item.ward_type || '',
        stressFactor: item.stress_factor || '',
        feedingType: item.feeding_type || ''
      },
      biochemical: { labResults: item.lab_results || [] },
      medication: { medications: item.medications || [] },
      mealPlan: { notes: item.notes || '' },
      isComplete: item.is_finished || false
    } as any;

    console.log('📋 Loading client snapshot into form:', clientSnapshot);
    try {
      localStorage.setItem('followUpClientData', JSON.stringify(clientSnapshot));
    } catch {}
    loadFromNavigationState(clientSnapshot);
    
    // Navigate to correct tab
    const path = tab === 'biochemical' ? '/client-file/biochemical-data'
      : tab === 'medication' ? '/client-file/medication'
      : tab === 'meal' ? '/client-file/meal-plans'
      : '/client-file';
    
    console.log('🔄 Navigating to:', path);
    navigate(path);
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 1, mb: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}
        {loading && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            Loading...
          </Typography>
        )}
        {filtered.length === 0 && !loading ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            No follow-ups yet.
          </Typography>
        ) : (
          <Stack spacing={1}>
            {filtered.map(item => (
              <Box key={item.id} sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1
              }}>
                <Box sx={{ flex: 1, pr: 2 }}>
                  {editingId === item.id ? (
                    <Stack spacing={1}>
                      {tab !== 'biochemical' && (
                        <>
                          <TextField
                            size="small"
                            label="Notes"
                            value={editDraft.notes || ''}
                            onChange={e => setEditDraft(prev => ({ ...prev, notes: e.target.value }))}
                          />
                          <Stack direction="row" spacing={1}>
                            <TextField
                              size="small"
                              label="Weight (kg)"
                              type="number"
                              value={editDraft.weight ?? ''}
                              onChange={e => setEditDraft(prev => ({ ...prev, weight: e.target.value === '' ? undefined : Number(e.target.value) }))}
                            />
                            <TextField
                              size="small"
                              label="Height (cm)"
                              type="number"
                              value={editDraft.height ?? ''}
                              onChange={e => setEditDraft(prev => ({ ...prev, height: e.target.value === '' ? undefined : Number(e.target.value) }))}
                            />
                            <TextField
                              size="small"
                              label="Blood Pressure"
                              value={editDraft.blood_pressure || ''}
                              onChange={e => setEditDraft(prev => ({ ...prev, blood_pressure: e.target.value }))}
                            />
                            <TextField
                              size="small"
                              label="Temperature (°C)"
                              type="number"
                              value={editDraft.temperature ?? ''}
                              onChange={e => setEditDraft(prev => ({ ...prev, temperature: e.target.value === '' ? undefined : Number(e.target.value) }))}
                            />
                          </Stack>
                        </>
                      )}
                    </Stack>
                  ) : (
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.date ? new Date(item.date).toLocaleDateString() : '—'}
                        {item.status ? ` • ${item.status}` : ''}
                      </Typography>
                      
                      {/* Show existing data for the current tab */}
                      {tab === 'biochemical' && (
                        <Box sx={{ mt: 1 }}>
                          {Array.isArray(item.lab_results) && item.lab_results.length > 0 ? (
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                Lab Results:
                              </Typography>
                              {item.lab_results.map(lab => (
                                <Typography key={lab.id} variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                                  • {lab.test_name}: {lab.result} {lab.date ? `(${new Date(lab.date).toLocaleDateString()})` : ''}
                                </Typography>
                              ))}
                            </Box>
                          ) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                              No lab results yet - Click "Edit in form" to add
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {tab === 'medication' && (
                        <Box sx={{ mt: 1 }}>
                          {Array.isArray(item.medications) && item.medications.length > 0 ? (
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                Medications:
                              </Typography>
                              {item.medications.map(med => (
                                <Typography key={String(med.id ?? med.name)} variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                                  • {med.name}{med.dosage ? ` — ${med.dosage}` : ''}{med.notes ? ` — ${med.notes}` : ''}
                                </Typography>
                              ))}
                            </Box>
                          ) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                              No medications yet - Click "Edit in form" to add
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {tab === 'meal' && (
                        <Box sx={{ mt: 1 }}>
                          {item.notes && item.notes.trim() ? (
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                Meal Plan Notes:
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', ml: 1 }}>
                                {item.notes}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                              No meal plan notes yet - Click "Edit in form" to add
                            </Typography>
                          )}
                        </Box>
                      )}
                      
                      {tab === 'assessment' && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Assessment data: {item.name || 'Unnamed'} • {item.gender || 'Unknown'} • {item.weight ? `${item.weight}kg` : 'No weight'} • {item.height ? `${item.height}cm` : 'No height'}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
                <Box>
                  {editingId === item.id ? (
                    <>
                      <IconButton aria-label="save" onClick={saveEdit}>
                        <SaveIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="cancel" onClick={cancelEdit}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <Button 
                        size="small" 
                        sx={{ ml: 1 }} 
                        onClick={() => editInForm(item)}
                        variant={tab === 'biochemical' && (!Array.isArray(item.lab_results) || item.lab_results.length === 0) ? 'contained' : 'outlined'}
                        color={tab === 'biochemical' && (!Array.isArray(item.lab_results) || item.lab_results.length === 0) ? 'primary' : 'inherit'}
                      >
                        {tab === 'biochemical' && (!Array.isArray(item.lab_results) || item.lab_results.length === 0) 
                          ? 'Add Lab Results' 
                          : tab === 'medication' && (!Array.isArray(item.medications) || item.medications.length === 0)
                          ? 'Add Medications'
                          : tab === 'meal' && (!item.notes || !item.notes.trim())
                          ? 'Add Meal Plan'
                          : 'Edit in form'
                        }
                      </Button>
                    </>
                  ) : (
                    <>
                      <IconButton aria-label="edit" onClick={() => beginEdit(item)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => remove(item.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <Button 
                        size="small" 
                        sx={{ ml: 1 }} 
                        onClick={() => editInForm(item)}
                        variant={tab === 'biochemical' && (!Array.isArray(item.lab_results) || item.lab_results.length === 0) ? 'contained' : 'outlined'}
                        color={tab === 'biochemical' && (!Array.isArray(item.lab_results) || item.lab_results.length === 0) ? 'primary' : 'inherit'}
                      >
                        {tab === 'biochemical' && (!Array.isArray(item.lab_results) || item.lab_results.length === 0) 
                          ? 'Add Lab Results' 
                          : tab === 'medication' && (!Array.isArray(item.medications) || item.medications.length === 0)
                          ? 'Add Medications'
                          : tab === 'meal' && (!item.notes || !item.notes.trim())
                          ? 'Add Meal Plan'
                          : 'Edit in form'
                        }
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowUpPanel;


