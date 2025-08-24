Here's the big one! 📁💪

## **Next File: src/components/PeerBillingTracker.js**

1. Click **"Add file" → "Create new file"**
2. In the filename box, type: `src/components/PeerBillingTracker.js`
3. Copy and paste this **ENTIRE** content (it's very long):

```javascript
import React, { useState, useEffect } from 'react';
import { PlusCircle, Users, DollarSign, AlertTriangle, Download, Calendar, Search, Edit2, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

const PeerBillingTracker = () => {
  const [clients, setClients] = useState([]);
  const [peers, setPeers] = useState([]);
  const [currentWeek, setCurrentWeek] = useState('2025-08-23');
  const [showAddClient, setShowAddClient] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [showAddPeer, setShowAddPeer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPayer, setFilterPayer] = useState('');
  const [filterCompliance, setFilterCompliance] = useState('');
  const [filterPeer, setFilterPeer] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showCashFlowModal, setShowCashFlowModal] = useState(false);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);

  // Constants
  const SESSION_RATE = 155;
  const REQUIRED_SESSIONS = 2;
  const REIMBURSEMENT_WEEKS = 3;

  const PAYERS = [
    'Alliance', 'Trillium', 'BCBS NC', 'NC Healthy Blue', 
    'Vaya', 'AmeriHealth', 'Carolina Complete Health', 'UHC Comm. Plan'
  ];

  // Load peers from localStorage
  useEffect(() => {
    const savedPeers = localStorage.getItem('peer_specialists');
    if (savedPeers) {
      setPeers(JSON.parse(savedPeers));
    } else {
      // Start with empty peer list - user will add their own
      setPeers([]);
    }
  }, []);

  // Save peers to localStorage
  useEffect(() => {
    if (peers.length >= 0) {
      localStorage.setItem('peer_specialists', JSON.stringify(peers));
    }
  }, [peers]);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`billing_data_${currentWeek}`);
    if (savedData) {
      setClients(JSON.parse(savedData));
    } else {
      // Initialize with your complete 68-client roster - no peer assignments initially
      const sampleData = [
        { id: 1, name: "Yulasey Martinez", age: 40, memberId: "950697986N", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Ready for peer assignment" },
        { id: 2, name: "Trevarius Eaddy", age: 24, memberId: "946752554M", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Young client, needs peer assignment" },
        { id: 3, name: "Travis Jones", age: 43, memberId: "948885383M", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 4, name: "Timothy Poole", age: 64, memberId: "945361296L", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 5, name: "Tatayanna Dail", age: 27, memberId: "945684232L", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Has childcare needs, needs peer assignment" },
        { id: 6, name: "Sherita Dash", age: 55, memberId: "256292701A", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 7, name: "Sheldon Hayward", age: 32, memberId: "945903504N", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Work schedule varies, needs peer assignment" },
        { id: 8, name: "Shanaisa Webb", age: 25, memberId: "946212486S", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Young adult, needs peer assignment" },
        { id: 9, name: "Shacora Parker", age: 29, memberId: "944959314L", payer: "NC Healthy Blue", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Transportation dependent, needs peer assignment" },
        { id: 10, name: "Serenna Robinson", age: 27, memberId: "953270294Q", payer: "Vaya", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment and ongoing support" },
        { id: 11, name: "Sade Knox", age: 36, memberId: "246267204E", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 12, name: "Rodney Jones Sr", age: 59, memberId: "947122412S", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 13, name: "Precious Dowdy", age: 26, memberId: "945945794L", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Motivated client, needs peer assignment" },
        { id: 14, name: "Patrick Maloney", age: 53, memberId: "94418300M", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 15, name: "Resa Washington", age: 31, memberId: "900952451P", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Family obligations, needs peer assignment" },
        { id: 16, name: "Natasha Stanley", age: 33, memberId: "948053325L", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 17, name: "Nadiyah Mcgriff", age: 48, memberId: "946171307K", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Medical appointments, needs peer assignment" },
        { id: 18, name: "Michael Russell", age: 63, memberId: "944730414L", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 19, name: "Me'Chelle Sellers", age: 22, memberId: "947166676R", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Young client, needs peer assignment" },
        { id: 20, name: "Mckinnon Hancock", age: 29, memberId: "901528138Q", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 21, name: "Mattie Suitt", age: 34, memberId: "900333094S", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 22, name: "Matthew Parker", age: 25, memberId: "947369557S", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Young adult, needs peer assignment" },
        { id: 23, name: "Lottie Becraft", age: 25, memberId: "946422004K", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 24, name: "Lorraine James", age: 61, memberId: "901560710T", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 25, name: "Lindel Wynn", age: 46, memberId: "901273364M", payer: "NC Healthy Blue", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Health challenges, needs peer assignment" },
        { id: 26, name: "Lenore Jones", age: 45, memberId: "952411012L", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 27, name: "Lekia Woodard", age: 34, memberId: "900318887O", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 28, name: "Lecian Deberry", age: 64, memberId: "948939756N", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 29, name: "Latoya Lucas", age: 42, memberId: "948858185T", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 30, name: "Lashonda Johnson", age: 36, memberId: "948820702R", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Childcare needs, needs peer assignment" },
        { id: 31, name: "Kyeshia Williams", age: 31, memberId: "946682062L", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 32, name: "Kenneth Charles Wilson", age: 59, memberId: "944919217L", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 33, name: "Kemp Nichols", age: 33, memberId: "945824895R", payer: "NC Healthy Blue", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 34, name: "Kelly Gibson", age: 54, memberId: "947999430P", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Work schedule challenges, needs peer assignment" },
        { id: 35, name: "Katara Haynes", age: 44, memberId: "945031195L", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Family obligations, needs peer assignment" },
        { id: 36, name: "Karmen Austin", age: 19, memberId: "958351724L", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Youngest client, needs peer assignment" },
        { id: 37, name: "Kamaria Harper", age: 33, memberId: "900608215P", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 38, name: "Joseph Patterson", age: 61, memberId: "947769105O", payer: "Vaya", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 39, name: "Jessica Tickles", age: 36, memberId: "947268277O", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Family crises, needs peer assignment" },
        { id: 40, name: "Jerry Williams", age: 60, memberId: "952640998L", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Health appointments, needs peer assignment" },
        { id: 41, name: "Jazmine Gonzalez", age: 22, memberId: "953286842T", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Young client, needs peer assignment" },
        { id: 42, name: "Jayla Davis", age: 21, memberId: "949800562L", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "College schedule, needs peer assignment" },
        { id: 43, name: "Jaquanzie Hilton", age: 29, memberId: "944945172T", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 44, name: "Jaliyah Newsome", age: 23, memberId: "947675016M", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Monitor attendance, needs peer assignment" },
        { id: 45, name: "Iran El Bey", age: 43, memberId: "957805764O", payer: "NC Healthy Blue", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Work obligations, needs peer assignment" },
        { id: 46, name: "India Person", age: 24, memberId: "946711588N", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Young adult, needs peer assignment" },
        { id: 47, name: "Eugine Williams", age: 54, memberId: "945577771L", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 48, name: "Erica Lucas", age: 48, memberId: "949103113T", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 49, name: "Edward Hamilton", age: 45, memberId: "948922335M", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 50, name: "Dustin Oakley", age: 30, memberId: "901343086O", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Work conflicts, needs peer assignment" },
        { id: 51, name: "David Taborn", age: 36, memberId: "949363940L", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 52, name: "Daminon Cotton", age: 25, memberId: "946391987M", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Young client, needs peer assignment" },
        { id: 53, name: "Damari Harper", age: 35, memberId: "900359419S", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 54, name: "Coyderra Williams", age: 37, memberId: "949374456Q", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Medical emergencies, needs peer assignment" },
        { id: 55, name: "Charles Williams", age: 60, memberId: "944903212M", payer: "NC Healthy Blue", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, needs peer assignment" },
        { id: 56, name: "Catrina Battle", age: 42, memberId: "949277808O", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 57, name: "Carl Faison", age: 42, memberId: "948919716P", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Family obligations, needs peer assignment" },
        { id: 58, name: "Capricia Clark", age: 52, memberId: "956185394T", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 59, name: "Bryan Champion", age: 36, memberId: "947115317O", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Work schedule variable, needs peer assignment" },
        { id: 60, name: "Brittani Bunch", age: 31, memberId: "901178516T", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 61, name: "Brian Berg", age: 55, memberId: "948271461K", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Monitor health status, needs peer assignment" },
        { id: 62, name: "Braxton Hockaday", age: 33, memberId: "900526016P", payer: "Carolina Complete Health", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs ongoing support and peer assignment" },
        { id: 63, name: "Brandon Wilson", age: 39, memberId: "948598741M", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" },
        { id: 64, name: "Brandon Hassell", age: 38, memberId: "948834054L", payer: "Alliance", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Transportation challenges, needs peer assignment" },
        { id: 65, name: "Asia Blount", age: 29, memberId: "901538556O", payer: "BCBS NC", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Strong goals focus, needs peer assignment" },
        { id: 66, name: "Ashley Hilton", age: 32, memberId: "900956829Q", payer: "AmeriHealth", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Family crises, needs peer assignment" },
        { id: 67, name: "Arthur Carr", age: 62, memberId: "945359788L", payer: "NC Healthy Blue", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Senior client, mobility issues, needs peer assignment" },
        { id: 68, name: "Angelica Jones", age: 37, memberId: "128225902E", payer: "NC Healthy Blue", servicingPeer: "", sessionsThisWeek: 0, lastSessionDate: "", notes: "Needs peer assignment" }
      ];
      setClients(sampleData);
    }
  }, [currentWeek]);

  // Save data to localStorage
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem(`billing_data_${currentWeek}`, JSON.stringify(clients));
    }
  }, [clients, currentWeek]);

  // Helper functions
  const getComplianceStatus = (sessions) => {
    if (sessions >= REQUIRED_SESSIONS) return 'Compliant';
    if (sessions === 1) return 'Partial';
    return 'Non-Compliant';
  };

  const getPreviousWeekRevenue = (weeksBack) => {
    try {
      const pastDate = new Date(currentWeek);
      pastDate.setDate(pastDate.getDate() - (weeksBack * 7));
      const weekKey = pastDate.toISOString().split('T')[0];
      const weekData = localStorage.getItem(`billing_data_${weekKey}`);
      
      if (weekData) {
        const weekClients = JSON.parse(weekData);
        return weekClients.reduce((sum, c) => sum + (c.sessionsThisWeek * SESSION_RATE), 0);
      }
      return 0;
    } catch (error) {
      console.error('Error calculating previous week revenue:', error);
      return 0;
    }
  };

  const getPreviousWeekSessions = (weeksBack) => {
    try {
      const pastDate = new Date(currentWeek);
      pastDate.setDate(pastDate.getDate() - (weeksBack * 7));
      const weekKey = pastDate.toISOString().split('T')[0];
      const weekData = localStorage.getItem(`billing_data_${weekKey}`);
      
      if (weekData) {
        const weekClients = JSON.parse(weekData);
        return weekClients.reduce((sum, c) => sum + c.sessionsThisWeek, 0);
      }
      return 0;
    } catch (error) {
      console.error('Error calculating previous week sessions:', error);
      return 0;
    }
  };

  const calculatePaymentDue = () => {
    return getPreviousWeekRevenue(3);
  };

  // Reset week data - Fixed implementation
  const resetWeekData = () => {
    const resetClients = clients.map(client => ({
      ...client,
      sessionsThisWeek: 0,
      lastSessionDate: '',
      notes: client.notes.includes('Week reset') ? client.notes : `${client.notes} - Week reset on ${new Date().toLocaleDateString()}`
    }));
    setClients(resetClients);
    setShowResetConfirm(false);
  };

  // Add peer with better error handling
  const addPeer = (peerName) => {
    if (peerName && peerName.trim() && !peers.includes(peerName.trim())) {
      setPeers(prev => [...prev, peerName.trim()]);
      setShowAddPeer(false);
      return true;
    }
    return false;
  };

  const removePeer = (peerName) => {
    if (window.confirm(`Are you sure you want to remove ${peerName}? This will unassign them from all clients.`)) {
      setPeers(peers.filter(p => p !== peerName));
      // Unassign this peer from all clients
      setClients(clients.map(c => 
        c.servicingPeer === peerName 
          ? { ...c, servicingPeer: '', notes: c.notes + ' - Peer reassignment needed' }
          : c
      ));
    }
  };

  // Calculate revenue metrics
  const calculateMetrics = () => {
    const totalClients = clients.length;
    const compliantClients = clients.filter(c => c.sessionsThisWeek >= REQUIRED_SESSIONS).length;
    const partialClients = clients.filter(c => c.sessionsThisWeek === 1).length;
    const nonCompliantClients = clients.filter(c => c.sessionsThisWeek === 0).length;
    
    const actualSessions = clients.reduce((sum, c) => sum + c.sessionsThisWeek, 0);
    const potentialSessions = totalClients * REQUIRED_SESSIONS;
    const missedSessions = potentialSessions - actualSessions;
    
    const actualRevenue = actualSessions * SESSION_RATE;
    const potentialRevenue = potentialSessions * SESSION_RATE;
    const revenueAtRisk = missedSessions * SESSION_RATE;
    
    const complianceRate = totalClients > 0 ? (compliantClients / totalClients * 100).toFixed(1) : 0;
    const achievementRate = potentialSessions > 0 ? (actualSessions / potentialSessions * 100).toFixed(1) : 0;

    return {
      totalClients,
      compliantClients,
      partialClients,
      nonCompliantClients,
      actualSessions,
      potentialSessions,
      missedSessions,
      actualRevenue,
      potentialRevenue,
      revenueAtRisk,
      complianceRate,
      achievementRate
    };
  };

  const metrics = calculateMetrics();

  // Filter clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.memberId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayer = !filterPayer || client.payer === filterPayer;
    const matchesPeer = !filterPeer || client.servicingPeer === filterPeer;
    const matchesCompliance = !filterCompliance || getComplianceStatus(client.sessionsThisWeek) === filterCompliance;
    
    return matchesSearch && matchesPayer && matchesPeer && matchesCompliance;
  });

  // Client operations
  const addClient = (clientData) => {
    const newClient = {
      id: Date.now(),
      ...clientData,
      sessionsThisWeek: 0,
      lastSessionDate: '',
      notes: ''
    };
    setClients([...clients, newClient]);
    setShowAddClient(false);
  };

  const updateClient = (id, updates) => {
    setClients(clients.map(c => c.id === id ? { ...c, ...updates } : c));
    setEditingClient(null);
  };

  const deleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvData = [
      ['Week', currentWeek],
      [''],
      ['REVENUE SUMMARY'],
      ['Total Clients', metrics.totalClients],
      ['Actual Sessions', metrics.actualSessions],
      ['Potential Sessions', metrics.potentialSessions],
      ['Missed Sessions', metrics.missedSessions],
      ['Actual Revenue', `$${metrics.actualRevenue.toLocaleString()}`],
      ['Potential Revenue', `$${metrics.potentialRevenue.toLocaleString()}`],
      ['Revenue at Risk', `$${metrics.revenueAtRisk.toLocaleString()}`],
      ['Compliance Rate', `${metrics.complianceRate}%`],
      ['Achievement Rate', `${metrics.achievementRate}%`],
      [''],
      ['CLIENT DETAILS'],
      ['Name', 'Age', 'Member ID', 'Payer', 'Servicing Peer', 'Sessions', 'Status', 'Last Session', 'Notes'],
      ...clients.map(c => [
        c.name, c.age, c.memberId, c.payer, c.servicingPeer,
        c.sessionsThisWeek, getComplianceStatus(c.sessionsThisWeek),
        c.lastSessionDate, c.notes
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `billing_report_${currentWeek}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const ClientForm = ({ client, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: client?.name || '',
      age: client?.age || '',
      memberId: client?.memberId || '',
      payer: client?.payer || PAYERS[0],
      servicingPeer: client?.servicingPeer || (peers.length > 0 ? peers[0] : ''),
      sessionsThisWeek: client?.sessionsThisWeek || 0,
      lastSessionDate: client?.lastSessionDate || '',
      notes: client?.notes || ''
    });

    const handleSubmit = () => {
      if (!formData.name.trim() || !formData.memberId.trim()) {
        alert('Please fill in required fields (Name and Member ID)');
        return;
      }
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {client ? 'Edit Client' : 'Add New Client'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Member ID *</label>
              <input
                type="text"
                required
                value={formData.memberId}
                onChange={(e) => setFormData({...formData, memberId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 123456789A"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Payer</label>
                <select
                  value={formData.payer}
                  onChange={(e) => setFormData({...formData, payer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {PAYERS.map(payer => (
                    <option key={payer} value={payer}>{payer}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Servicing Peer</label>
                <select
                  value={formData.servicingPeer}
                  onChange={(e) => setFormData({...formData, servicingPeer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No Peer Assigned</option>
                  {peers.map(peer => (
                    <option key={peer} value={peer}>{peer}</option>
                  ))}
                </select>
                {peers.length === 0 && (
                  <p className="text-sm text-red-600 mt-1">No peers available. Add peer specialists first.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sessions This Week</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.sessionsThisWeek}
                  onChange={(e) => setFormData({...formData, sessionsThisWeek: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Session Date</label>
                <input
                  type="date"
                  value={formData.lastSessionDate}
                  onChange={(e) => setFormData({...formData, lastSessionDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                rows="3"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any additional notes..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {client ? 'Update Client' : 'Add Client'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusIcon = (sessions) => {
    if (sessions >= REQUIRED_SESSIONS) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (sessions === 1) return <Clock className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const getStatusBadge = (sessions) => {
    const status = getComplianceStatus(sessions);
    if (status === 'Compliant') return 'bg-green-100 text-green-800 border border-green-200';
    if (status === 'Partial') return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    return 'bg-red-100 text-red-800 border border-red-200';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b-2 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Life Abundantly LLC</h1>
                  <p className="text-blue-600 font-medium">Peer Billing Compliance Tracker</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm ml-16">Healthcare Revenue Protection & Compliance Monitoring</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg border">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input
                  type="date"
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-sm"
                />
              </div>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                Reset Week
              </button>
              <button
                onClick={() => setShowCashFlowModal(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
              >
                Cash Flow
              </button>
              <button
                onClick={() => setShowBulkUpdateModal(true)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium"
              >
                Quick Update
              </button>
              <button
                onClick={exportToCSV}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.totalClients}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-l-4 border-green-500 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Compliance Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.complianceRate}%</p>
                <p className="text-green-600 text-xs mt-1">{metrics.compliantClients}/{metrics.totalClients} clients</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-l-4 border-purple-500 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Current Week Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${metrics.actualRevenue.toLocaleString()}</p>
                <p className="text-purple-600 text-xs mt-1">{metrics.actualSessions} sessions</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-l-4 border-orange-500 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Payment Due This Week</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${calculatePaymentDue().toLocaleString()}</p>
                <p className="text-orange-600 text-xs mt-1">From 3 weeks ago</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border-l-4 border-red-500 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Revenue at Risk</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">${metrics.revenueAtRisk.toLocaleString()}</p>
                <p className="text-red-600 text-xs mt-1">{metrics.missedSessions} missed sessions</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* 3-Week Reimbursement Pipeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            3-Week Reimbursement Pipeline
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-blue-800">Week 1 (Current)</h3>
                  <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">ACTIVE</div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">${metrics.actualRevenue.toLocaleString()}</div>
                <div className="text-sm text-blue-600 mb-3">{metrics.actualSessions} sessions completed</div>
                <div className="text-xs text-gray-600">
                  <strong>Payment Expected:</strong><br />
                  {new Date(new Date(currentWeek).getTime() + (21 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                </div>
                <div className="mt-4 bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.achievementRate}%` }}
                  ></div>
                </div>
                <div className="text-xs text-blue-600 mt-1">{metrics.achievementRate}% of potential</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-6 border-2 border-yellow-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-yellow-800">Week 2 (Previous)</h3>
                  <div className="bg-yellow-600 text-white px-2 py-1 rounded text-xs font-medium">PENDING</div>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mb-2">${getPreviousWeekRevenue(1).toLocaleString()}</div>
                <div className="text-sm text-yellow-600 mb-3">{getPreviousWeekSessions(1)} sessions</div>
                <div className="text-xs text-gray-600">
                  <strong>Payment Expected:</strong><br />
                  {new Date(new Date(currentWeek).getTime() + (14 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                </div>
                <div className="mt-4 bg-yellow-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getPreviousWeekRevenue(1) > 0 ? (getPreviousWeekSessions(1) / (metrics.totalClients * 2) * 100) : 0}%` }}
                  ></div>
                </div>
                <div className="text-xs text-yellow-600 mt-1">2 weeks until payment</div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-green-800">Week 3 (Payment Due)</h3>
                  <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">DUE NOW</div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">${getPreviousWeekRevenue(2).toLocaleString()}</div>
                <div className="text-sm text-green-600 mb-3">{getPreviousWeekSessions(2)} sessions</div>
                <div className="text-xs text-gray-600">
                  <strong>Payment Expected:</strong><br />
                  This week (3 weeks completed)
                </div>
                <div className="mt-4 bg-green-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full w-full"></div>
                </div>
                <div className="text-xs text-green-600 mt-1">Ready for reimbursement</div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">${(metrics.actualRevenue + getPreviousWeekRevenue(1) + getPreviousWeekRevenue(2)).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total 3-Week Pipeline</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">${getPreviousWeekRevenue(2).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Cash Coming This Week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">${Math.round((metrics.actualRevenue + getPreviousWeekRevenue(1) + getPreviousWeekRevenue(2)) / 3).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Average Weekly Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Peer Management Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Peer Specialist Management ({peers.length} active)
            </h2>
            <button
              onClick={() => setShowAddPeer(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Peer</span>
            </button>
          </div>

          {peers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {peers.map((peer) => {
                const clientCount = clients.filter(c => c.servicingPeer === peer).length;
                return (
                  <div key={peer} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{peer}</h3>
                        <p className="text-sm text-gray-600">{clientCount} clients assigned</p>
                      </div>
                      <button
                        onClick={() => removePeer(peer)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Remove Peer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
              <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-yellow-800 mb-2">No Peer Specialists Added</h3>
              <p className="text-yellow-700 mb-4">Add your peer support specialists to assign them to clients</p>
              <button
                onClick={() => setShowAddPeer(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Add Your First Peer
              </button>
            </div>
          )}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Client Management
            </h2>
            <button
              onClick={() => setShowAddClient(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm font-medium"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Client</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <select
              value={filterPayer}
              onChange={(e) => setFilterPayer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Payers</option>
              {PAYERS.map(payer => (
                <option key={payer} value={payer}>{payer}</option>
              ))}
            </select>

            <select
              value={filterPeer}
              onChange={(e) => setFilterPeer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Peers</option>
              <option value="">Unassigned</option>
              {peers.map(peer => (
                <option key={peer} value={peer}>{peer}</option>
              ))}
            </select>

            <select
              value={filterCompliance}
              onChange={(e) => setFilterCompliance(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">All Status</option>
              <option value="Compliant">Compliant</option>
              <option value="Partial">Partial</option>
              <option value="Non-Compliant">Non-Compliant</option>
            </select>
          </div>
        </div>

        {/* Client Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Session</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(client.sessionsThisWeek)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(client.sessionsThisWeek)}`}>
                          {getComplianceStatus(client.sessionsThisWeek)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">Age: {client.age} • ID: {client.memberId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.payer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {client.servicingPeer || <span className="text-red-500 italic">Unassigned</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-bold text-gray-900">{client.sessionsThisWeek}/2</div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              client.sessionsThisWeek >= 2 ? 'bg-green-500' : 
                              client.sessionsThisWeek === 1 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(client.sessionsThisWeek / 2) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">${(client.sessionsThisWeek * SESSION_RATE).toLocaleString()}</div>
                      <div className="text-xs text-gray-500">of ${(REQUIRED_SESSIONS * SESSION_RATE).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {client.lastSessionDate || 'No sessions'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setEditingClient(client)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit Client"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteClient(client.id)}
                          className="text-red-600
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Peer Modal */}
      {showAddPeer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Add Peer Specialist</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Peer Name</label>
              <input
                type="text"
                placeholder="Enter peer specialist name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addPeer(e.target.value);
                    e.target.value = '';
                  }
                }}
                id="peerNameInput"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddPeer(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById('peerNameInput');
                  if (input.value.trim()) {
                    addPeer(input.value);
                    input.value = '';
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Peer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAddClient && (
        <ClientForm
          onSave={addClient}
          onCancel={() => setShowAddClient(false)}
        />
      )}

      {editingClient && (
        <ClientForm
          client={editingClient}
          onSave={(updates) => updateClient(editingClient.id, updates)}
          onCancel={() => setEditingClient(null)}
        />
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Reset Week Data</h3>
            <p className="text-gray-600 mb-6">
              This will reset all client session counts to 0 for a fresh week. 
              Current data will be saved in the weekly history. Are you sure?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={resetWeekData}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Reset Week
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cash Flow Modal */}
      {showCashFlowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">3-Week Cash Flow Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Week 1 (Current)</h4>
                <div className="text-2xl font-bold text-blue-600">${metrics.actualRevenue.toLocaleString()}</div>
                <div className="text-sm text-blue-600">{metrics.actualSessions} sessions</div>
                <div className="text-xs text-gray-500 mt-2">
                  Payment due: {new Date(new Date(currentWeek).getTime() + (21 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Week 2 Pipeline</h4>
                <div className="text-2xl font-bold text-green-600">${getPreviousWeekRevenue(1).toLocaleString()}</div>
                <div className="text-sm text-green-600">{getPreviousWeekSessions(1)} sessions</div>
                <div className="text-xs text-gray-500 mt-2">
                  Payment due: {new Date(new Date(currentWeek).getTime() + (14 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Week 3 Pipeline</h4>
                <div className="text-2xl font-bold text-purple-600">${getPreviousWeekRevenue(2).toLocaleString()}</div>
                <div className="text-sm text-purple-600">{getPreviousWeekSessions(2)} sessions</div>
                <div className="text-xs text-gray-500 mt-2">
                  Payment due: This week
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-800 mb-4">Reimbursement Schedule</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Expected payment this week:</span>
                  <span className="font-bold text-green-600">${getPreviousWeekRevenue(2).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected payment next week:</span>
                  <span className="font-bold">${getPreviousWeekRevenue(1).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Expected payment in 3 weeks:</span>
                  <span className="font-bold text-blue-600">${metrics.actualRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowCashFlowModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Update Modal */}
      {showBulkUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-6xl max-h-screen overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Quick Session Updates</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {clients.map((client) => (
                <div key={client.id} className="border rounded-lg p-3">
                  <div className="font-medium text-sm mb-2">{client.name}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateClient(client.id, { sessionsThisWeek: 0, lastSessionDate: '' })}
                      className={`w-8 h-8 rounded text-xs font-bold ${client.sessionsThisWeek === 0 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      0
                    </button>
                    <button
                      onClick={() => updateClient(client.id, { 
                        sessionsThisWeek: 1, 
                        lastSessionDate: new Date().toISOString().split('T')[0] 
                      })}
                      className={`w-8 h-8 rounded text-xs font-bold ${client.sessionsThisWeek === 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      1
                    </button>
                    <button
                      onClick={() => updateClient(client.id, { 
                        sessionsThisWeek: 2, 
                        lastSessionDate: new Date().toISOString().split('T')[0] 
                      })}
                      className={`w-8 h-8 rounded text-xs font-bold ${client.sessionsThisWeek === 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                    >
                      2
                    </button>
                    <span className="text-xs text-gray-500">{client.servicingPeer.split(' ')[0] || 'Unassigned'}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowBulkUpdateModal(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerBillingTracker;
                          
