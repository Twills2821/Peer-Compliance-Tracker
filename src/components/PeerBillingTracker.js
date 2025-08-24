import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Upload,
  Plus,
  Minus,
  Edit3,
  Save,
  X,
  RotateCcw,
  Calculator,
  FileText,
  Clock,
  Target,
  User
} from 'lucide-react';

const PeerBillingTracker = () => {
  // Initial client data with all 68 clients
  const initialClients = [
    { id: 1, name: "Aaliyah Johnson", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 2, name: "Aaron Smith", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 3, name: "Abby Wilson", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 4, name: "Abel Rodriguez", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 5, name: "Abraham Davis", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 6, name: "Adam Brown", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 7, name: "Adrian Martinez", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 8, name: "Adriana Garcia", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 9, name: "Alan Thompson", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 10, name: "Albert White", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 11, name: "Alex Anderson", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 12, name: "Alexander Jackson", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 13, name: "Alexis Lee", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 14, name: "Alice Walker", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 15, name: "Amanda Harris", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 16, name: "Amy Clark", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 17, name: "Ana Lopez", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 18, name: "Andrea Young", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 19, name: "Andrew King", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 20, name: "Angela Wright", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 21, name: "Anthony Green", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 22, name: "Ashley Baker", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 23, name: "Barbara Adams", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 24, name: "Benjamin Nelson", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 25, name: "Betty Hill", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 26, name: "Brandon Scott", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 27, name: "Brian Carter", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 28, name: "Brittany Mitchell", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 29, name: "Carlos Perez", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 30, name: "Carmen Roberts", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 31, name: "Catherine Turner", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 32, name: "Charles Phillips", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 33, name: "Christopher Campbell", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 34, name: "Crystal Parker", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 35, name: "Daniel Evans", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 36, name: "David Edwards", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 37, name: "Deborah Collins", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 38, name: "Diana Stewart", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 39, name: "Diego Sanchez", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 40, name: "Donald Morris", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 41, name: "Dorothy Rogers", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 42, name: "Edward Reed", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 43, name: "Elizabeth Cook", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 44, name: "Emily Morgan", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 45, name: "Eric Bell", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 46, name: "Fernando Murphy", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 47, name: "Frank Bailey", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 48, name: "Gabriel Rivera", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 49, name: "Grace Cooper", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 50, name: "Hannah Richardson", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 51, name: "Henry Cox", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 52, name: "Isabella Ward", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 53, name: "Jack Torres", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 54, name: "Jacob Peterson", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 55, name: "James Gray", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 56, name: "Jennifer Ramirez", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 57, name: "Jessica James", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 58, name: "Joshua Watson", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 59, name: "Julia Brooks", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 60, name: "Karen Kelly", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false },
    { id: 61, name: "Kevin Sanders", sessions: 0, peerSpecialist: "", insurancePayer: "Vaya", isCompliant: false },
    { id: 62, name: "Laura Price", sessions: 0, peerSpecialist: "", insurancePayer: "AmeriHealth", isCompliant: false },
    { id: 63, name: "Maria Bennett", sessions: 0, peerSpecialist: "", insurancePayer: "Carolina Complete Health", isCompliant: false },
    { id: 64, name: "Michael Wood", sessions: 0, peerSpecialist: "", insurancePayer: "UHC Community Plan", isCompliant: false },
    { id: 65, name: "Michelle Barnes", sessions: 0, peerSpecialist: "", insurancePayer: "Alliance", isCompliant: false },
    { id: 66, name: "Patricia Ross", sessions: 0, peerSpecialist: "", insurancePayer: "Trillium", isCompliant: false },
    { id: 67, name: "Robert Henderson", sessions: 0, peerSpecialist: "", insurancePayer: "BCBS NC", isCompliant: false },
    { id: 68, name: "William Coleman", sessions: 0, peerSpecialist: "", insurancePayer: "NC Healthy Blue", isCompliant: false }
  ];

  // Insurance payers list
  const insurancePayers = [
    "Alliance",
    "Trillium", 
    "BCBS NC",
    "NC Healthy Blue",
    "Vaya",
    "AmeriHealth",
    "Carolina Complete Health",
    "UHC Community Plan"
  ];

  // State management
  const [clients, setClients] = useState([]);
  const [peerSpecialists, setPeerSpecialists] = useState([]);
  const [newPeerName, setNewPeerName] = useState('');
  const [editingClient, setEditingClient] = useState(null);
  const [showCashFlowModal, setShowCashFlowModal] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState('');
  const [quickUpdateSessions, setQuickUpdateSessions] = useState('');
  const [selectedPeerForQuickUpdate, setSelectedPeerForQuickUpdate] = useState('');
  const [quickUpdateInsurance, setQuickUpdateInsurance] = useState('');

  // Load data on component mount
  useEffect(() => {
    const currentDate = new Date();
    const weekStart = getWeekStart(currentDate);
    setCurrentWeekStart(weekStart);

    // Load saved data or use initial data
    const savedClients = localStorage.getItem(`billing_data_${weekStart}`);
    const savedPeers = localStorage.getItem('peer_specialists');

    if (savedClients) {
      setClients(JSON.parse(savedClients));
    } else {
      setClients(initialClients);
    }

    if (savedPeers) {
      setPeerSpecialists(JSON.parse(savedPeers));
    } else {
      setPeerSpecialists(['Sarah Johnson', 'Michael Chen', 'Ashley Williams', 'David Martinez']);
    }
  }, []);

  // Save data whenever clients or peers change
  useEffect(() => {
    if (clients.length > 0 && currentWeekStart) {
      localStorage.setItem(`billing_data_${currentWeekStart}`, JSON.stringify(clients));
    }
  }, [clients, currentWeekStart]);

  useEffect(() => {
    if (peerSpecialists.length > 0) {
      localStorage.setItem('peer_specialists', JSON.stringify(peerSpecialists));
    }
  }, [peerSpecialists]);

  // Helper functions
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    d.setDate(diff);
    return d.toISOString().split('T')[0];
  };

  const updateClientSessions = (clientId, newSessions) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? { ...client, sessions: newSessions, isCompliant: newSessions >= 2 }
          : client
      )
    );
  };

  const updateClientPeer = (clientId, peerSpecialist) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? { ...client, peerSpecialist }
          : client
      )
    );
  };

  const updateClientInsurance = (clientId, insurancePayer) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? { ...client, insurancePayer }
          : client
      )
    );
  };

  const addPeerSpecialist = () => {
    if (newPeerName.trim() && !peerSpecialists.includes(newPeerName.trim())) {
      setPeerSpecialists([...peerSpecialists, newPeerName.trim()]);
      setNewPeerName('');
    }
  };

  const removePeerSpecialist = (peerToRemove) => {
    setPeerSpecialists(peerSpecialists.filter(peer => peer !== peerToRemove));
    setClients(prevClients =>
      prevClients.map(client =>
        client.peerSpecialist === peerToRemove
          ? { ...client, peerSpecialist: '' }
          : client
      )
    );
  };

  const resetWeek = () => {
    if (window.confirm('Are you sure you want to reset all session counts for this week? This cannot be undone.')) {
      const resetClients = clients.map(client => ({
        ...client,
        sessions: 0,
        isCompliant: false
      }));
      setClients(resetClients);
    }
  };

  const quickUpdateAllSessions = () => {
    const sessionsToAdd = parseInt(quickUpdateSessions) || 0;
    if (sessionsToAdd > 0) {
      setClients(prevClients =>
        prevClients.map(client => {
          const matchesPeer = !selectedPeerForQuickUpdate || client.peerSpecialist === selectedPeerForQuickUpdate;
          const matchesInsurance = !quickUpdateInsurance || client.insurancePayer === quickUpdateInsurance;
          
          if (matchesPeer && matchesInsurance) {
            const newSessions = client.sessions + sessionsToAdd;
            return {
              ...client,
              sessions: newSessions,
              isCompliant: newSessions >= 2
            };
          }
          return client;
        })
      );
      setQuickUpdateSessions('');
    }
  };

  const exportToCSV = () => {
    const headers = ['Client Name', 'Peer Specialist', 'Sessions', 'Compliance Status', 'Insurance Payer', 'Revenue'];
    const csvData = clients.map(client => [
      client.name,
      client.peerSpecialist || 'Unassigned',
      client.sessions,
      client.isCompliant ? 'Compliant' : 'Non-Compliant',
      client.insurancePayer,
      `$${(client.sessions * 155).toFixed(2)}`
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `billing_report_${currentWeekStart}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate metrics
  const totalSessions = clients.reduce((sum, client) => sum + client.sessions, 0);
  const compliantClients = clients.filter(client => client.isCompliant).length;
  const totalRevenue = totalSessions * 155;
  const complianceRate = clients.length > 0 ? (compliantClients / clients.length * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Life Abundantly LLC - Peer Billing Tracker
              </h1>
              <p className="text-gray-600">
                Healthcare Revenue Protection & Compliance Monitoring
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Week of {currentWeekStart}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <button
                onClick={() => setShowCashFlowModal(true)}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Cash Flow
              </button>
              <button
                onClick={exportToCSV}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={resetWeek}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Week
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Compliant Clients</p>
                <p className="text-3xl font-bold text-green-600">{compliantClients}</p>
                <p className="text-sm text-gray-500">{complianceRate}% compliance</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Sessions</p>
                <p className="text-3xl font-bold text-purple-600">{totalSessions}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-yellow-600">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500">$155/session</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Update Panel */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
            Quick Update
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sessions to Add
              </label>
              <input
                type="number"
                min="1"
                value={quickUpdateSessions}
                onChange={(e) => setQuickUpdateSessions(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Peer (Optional)
              </label>
              <select
                value={selectedPeerForQuickUpdate}
                onChange={(e) => setSelectedPeerForQuickUpdate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Peers</option>
                {peerSpecialists.map(peer => (
                  <option key={peer} value={peer}>{peer}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Insurance (Optional)
              </label>
              <select
                value={quickUpdateInsurance}
                onChange={(e) => setQuickUpdateInsurance(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">All Insurance</option>
                {insurancePayers.map(payer => (
                  <option key={payer} value={payer}>{payer}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={quickUpdateAllSessions}
                disabled={!quickUpdateSessions}
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Update Sessions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Peer Management */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-green-600" />
            Peer Specialists Management
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {peerSpecialists.map(peer => (
              <div key={peer} className="flex items-center bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                <span className="text-green-800 font-medium mr-2">{peer}</span>
                <button
                  onClick={() => removePeerSpecialist(peer)}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPeerName}
              onChange={(e) => setNewPeerName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPeerSpecialist()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter peer specialist name"
            />
            <button
              onClick={addPeerSpecialist}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Peer
            </button>
          </div>
        </div>
      </div>

      {/* Client Management Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-gray-600" />
              Client Session Tracking
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Peer Specialist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Insurance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sessions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingClient === client.id ? (
                        <select
                          value={client.peerSpecialist}
                          onChange={(e) => updateClientPeer(client.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          <option value="">Select Peer</option>
                          {peerSpecialists.map(peer => (
                            <option key={peer} value={peer}>{peer}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm text-gray-900">
                          {client.peerSpecialist || 'Unassigned'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingClient === client.id ? (
                        <select
                          value={client.insurancePayer}
                          onChange={(e) => updateClientInsurance(client.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          {insurancePayers.map(payer => (
                            <option key={payer} value={payer}>{payer}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-sm text-gray-900">{client.insurancePayer}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateClientSessions(client.id, Math.max(0, client.sessions - 1))}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                          {client.sessions}
                        </span>
                        <button
                          onClick={() => updateClientSessions(client.id, client.sessions + 1)}
                          className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.isCompliant ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Compliant</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm font-medium">Non-Compliant</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        ${(client.sessions * 155).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setEditingClient(editingClient === client.id ? null : client.id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {editingClient === client.id ? (
                          <Save className="w-4 h-4" />
                        ) : (
                          <Edit3 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cash Flow Modal */}
      {showCashFlowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-green-600" />
                  3-Week Cash Flow Projection
                </h3>
                <button
                  onClick={() => setShowCashFlowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Current Week (Payment in 3 weeks)
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700">Total Sessions: <span className="font-medium">{totalSessions}</span></p>
                      <p className="text-blue-700">Compliant Clients: <span className="font-medium">{compliantClients}/68</span></p>
                    </div>
                    <div>
                      <p className="text-blue-700">Expected Revenue: <span className="font-medium">${totalRevenue.toLocaleString()}</span></p>
                      <p className="text-blue-700">Compliance Rate: <span className="font-medium">{complianceRate}%</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2 flex items-center">
                    <Target className="w-4 h-4 mr-2" />
                    Optimal Performance Targets
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-green-700">Target Sessions: <span className="font-medium">136</span> (2 per client)</p>
                      <p className="text-green-700">Target Compliance: <span className="font-medium">68/68 (100%)</span></p>
                    </div>
                    <div>
                      <p className="text-green-700">Maximum Revenue: <span className="font-medium">$21,080</span></p>
                      <p className="text-green-700">Revenue Gap: <span className="font-medium">${(21080 - totalRevenue).toLocaleString()}</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Insurance Payer Breakdown</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {insurancePayers.map(payer => {
                      const payerClients = clients.filter(c => c.insurancePayer === payer);
                      const payerSessions = payerClients.reduce((sum, c) => sum + c.sessions, 0);
                      const payerRevenue = payerSessions * 155;
                      return (
                        <div key={payer} className="flex justify-between">
                          <span className="text-yellow-700">{payer}:</span>
                          <span className="font-medium text-yellow-700">${payerRevenue.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Insurance payments typically arrive 3 weeks after service delivery</li>
                    <li>• Maintaining 100% compliance ensures maximum reimbursement</li>
                    <li>• Each missed session represents $155 in lost revenue</li>
                    <li>• Weekly session tracking enables proactive compliance management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerBillingTracker;