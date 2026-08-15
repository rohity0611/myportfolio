// Data Loader for Factory Dashboard
// Uses server API for dynamic file discovery (real-time data)

const DataLoader = {
    refreshInterval: 30000,
    refreshTimer: null,
    lastData: null,
    onUpdate: null,

    async fetchJSON(url) {
        try {
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Failed to load ${url}:`, error.message);
            return null;
        }
    },

    async loadAll() {
        try {
            const allData = await this.fetchJSON('/api/all');
            const agentsData = await this.fetchJSON('/api/agents');
            
            if (!allData) {
                console.error('Failed to load /api/all');
                return this.lastData || this.getDefaults();
            }
            
            this.lastData = this.transform(allData, agentsData);
            return this.lastData;
        } catch (error) {
            console.error('loadAll error:', error);
            return this.lastData || this.getDefaults();
        }
    },

    transform(apiData, agentsData) {
        const { projectInfo, metrics, sharedState } = apiData;
        
        const phaseStates = [];
        const confidenceData = [];
        const executionOutcomes = [];
        const swarmData = [];
        const shippedData = [];
        
        for (const [key, value] of Object.entries(metrics)) {
            if (key.startsWith('phase-state-')) phaseStates.push(value);
            else if (key.startsWith('confidence-')) confidenceData.push(value);
            else if (key.startsWith('execution-outcome-')) executionOutcomes.push(value);
            else if (key.startsWith('swarm-')) swarmData.push(value);
            else if (key.startsWith('shipped-')) shippedData.push(value);
        }
        
        const blockers = sharedState.blockers || [];
        const conversations = sharedState.conversations || [];
        const phaseStateShared = sharedState['phase-state'] || null;
        
        const allAgents = agentsData?.agents || [];
        
        return {
            projectInfo: projectInfo || { name: 'OpenCode Factory' },
            phaseStates,
            confidenceData,
            executionOutcomes,
            swarmData,
            shippedData,
            agentPerformance: metrics['agent-performance'] || { agents: {} },
            allAgents,
            blockers,
            conversations,
            phaseStateShared,
            lastUpdated: apiData.lastUpdated
        };
    },

    getDefaults() {
        return {
            projectInfo: { name: 'OpenCode Factory', description: 'Agent Guidance Framework' },
            phaseStates: [],
            confidenceData: [],
            executionOutcomes: [],
            swarmData: [],
            shippedData: [],
            agentPerformance: { agents: {} },
            allAgents: [],
            blockers: [],
            conversations: [],
            phaseStateShared: null,
            lastUpdated: null
        };
    },

    startAutoRefresh(callback) {
        this.onUpdate = callback;
        this.stopAutoRefresh();
        this.refreshTimer = setInterval(async () => {
            const data = await this.loadAll();
            if (this.onUpdate) this.onUpdate(data);
        }, this.refreshInterval);
    },

    stopAutoRefresh() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
    }
};
