// Factory Dashboard App
// Renders data from DataLoader into the dashboard UI
// Auto-refreshes every 30 seconds for real-time data

const App = {
    data: null,
    currentSection: 'overview',
    autoRefreshEnabled: true,
    
    buildPhases: [
        { id: 1, name: 'Brief', command: '/plan-brief', description: 'Understand requirements and risks' },
        { id: 2, name: 'Slice', command: '/slice', description: 'Break work into vertical slices' },
        { id: 3, name: 'Plan', command: '/plan-slice', description: 'Detailed task planning' },
        { id: 4, name: 'Build', command: '/build', description: 'Implement the feature' },
        { id: 5, name: 'Harden', command: '/harden', description: 'Security, tests, resilience' },
        { id: 6, name: 'Ship', command: '/ship', description: 'Deploy and create PR' }
    ],
    
    designPhases: [
        { id: 'D1', name: 'Brief', command: '/design-brief', description: 'Analyze Figma, extract tokens + assets' },
        { id: 'D2', name: 'Slice', command: '/design-slice', description: 'Break design into component slices' },
        { id: 'D3', name: 'Plan', command: '/design-plan-slice', description: 'Plan execution with Figma context' },
        { id: 'D4', name: 'Build', command: '/design-build', description: 'Generate React+Tailwind code' },
        { id: 'D5', name: 'Verify', command: '/design-verify', description: 'Visual verification + handoff' }
    ],
    
    commands: {
        'Factory Workflow': [
            { name: '/plan-brief', phase: 'Build 1', desc: 'Brief planning with risk analysis' },
            { name: '/slice', phase: 'Build 2', desc: 'Slice recommendation with dependencies' },
            { name: '/plan-slice', phase: 'Build 3+4', desc: 'Task groups + confidence gate' },
            { name: '/build', phase: 'Build 5', desc: 'Implement approved slice' },
            { name: '/harden', phase: 'Build 6', desc: '7+1 parallel hardening agents' },
            { name: '/ship', phase: 'Build 7', desc: 'PR creation + CI/CD' },
            { name: '/update-architecture', phase: 'Post', desc: 'Refresh architecture diagram' },
            { name: '/review-pipeline', phase: 'Review', desc: 'Automated review pipeline' },
            { name: '/orchestrate', phase: 'Meta', desc: 'Dispatch multi-agent tasks' }
        ],
        'Design Workflow': [
            { name: '/design-brief', phase: 'D1', desc: 'Analyze Figma, extract tokens + assets' },
            { name: '/design-slice', phase: 'D2', desc: 'Component slice strategy' },
            { name: '/design-plan-slice', phase: 'D3', desc: 'Component execution plan' },
            { name: '/design-build', phase: 'D4', desc: 'Generate React+Tailwind code' },
            { name: '/design-verify', phase: 'D5', desc: 'Visual verification + handoff' }
        ],
        'Framework Setup': [
            { name: '/factory-setup', phase: 'Setup', desc: 'Bootstrap project (discovery or scube)' },
            { name: '/add-skill', phase: 'Meta', desc: 'Install skills from GitHub or local' },
            { name: '/generate-registry', phase: 'Meta', desc: 'Generate agent registry' }
        ],
        'Context Management': [
            { name: '/context-setup', phase: 'Context', desc: 'Initialize context for new session' },
            { name: '/context-refresh', phase: 'Context', desc: 'Refresh context after code changes' },
            { name: '/context-doctor', phase: 'Context', desc: 'Diagnose context issues' }
        ]
    },
    
    async init() {
        await this.loadData();
        this.render();
        this.bindEvents();
        this.startAutoRefresh();
    },
    
    async loadData() {
        this.data = await DataLoader.loadAll();
    },
    
    bindEvents() {
        document.getElementById('refresh-btn').addEventListener('click', async () => {
            const btn = document.getElementById('refresh-btn');
            btn.style.transform = 'rotate(360deg)';
            await this.loadData();
            this.render();
            setTimeout(() => btn.style.transform = '', 300);
        });
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.navigateTo(section);
            });
        });
    },
    
    startAutoRefresh() {
        if (!this.autoRefreshEnabled) return;
        
        DataLoader.startAutoRefresh(async (newData) => {
            this.data = newData;
            this.render();
        });
        
        this.updateRefreshIndicator();
    },
    
    updateRefreshIndicator() {
        const indicator = document.getElementById('refresh-indicator');
        if (indicator) {
            indicator.textContent = this.autoRefreshEnabled ? 'Auto-refresh: ON' : 'Auto-refresh: OFF';
            indicator.className = this.autoRefreshEnabled ? 'refresh-on' : 'refresh-off';
        }
    },
    
    navigateTo(sectionName) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionName) {
                item.classList.add('active');
            }
        });
        
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });
        
        const targetSection = document.querySelector('[data-nav="' + sectionName + '"]');
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        this.currentSection = sectionName;
        this.render();
    },
    
    render() {
        this.renderHeader();
        
        if (this.currentSection === 'overview') {
            this.renderFactoryStatus();
            this.renderStats();
            this.renderSlicesOverview();
        } else if (this.currentSection === 'phases') {
            this.renderPhasesView();
        } else if (this.currentSection === 'commands') {
            this.renderCommandsView();
        } else if (this.currentSection === 'agents') {
            this.renderAgentsView();
        }
    },
    
    renderHeader() {
        const { projectInfo, lastUpdated } = this.data;
        
        document.getElementById('project-name').textContent = projectInfo.name;
        document.getElementById('project-description').textContent = projectInfo.description;
        document.getElementById('last-updated').textContent = lastUpdated 
            ? 'Updated: ' + new Date(lastUpdated).toLocaleTimeString()
            : 'No data';
        
        const techStack = document.getElementById('tech-stack');
        techStack.innerHTML = '';
        
        const techItems = [
            { label: 'Lang', value: projectInfo.language },
            { label: 'Framework', value: projectInfo.framework },
            { label: 'DB', value: projectInfo.database },
            { label: 'Test', value: projectInfo.testing }
        ].filter(item => item.value);
        
        techItems.forEach(item => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = item.label + ': ' + item.value;
            techStack.appendChild(tag);
        });
    },
    
    renderFactoryStatus() {
        const buildGrid = document.getElementById('build-phase-grid');
        const designGrid = document.getElementById('design-phase-grid');
        buildGrid.innerHTML = '';
        designGrid.innerHTML = '';
        
        const currentBuildPhase = this.getCurrentBuildPhase();
        
        this.buildPhases.forEach(phase => {
            const card = document.createElement('div');
            card.className = 'phase-card';
            
            if (phase.id < currentBuildPhase) {
                card.classList.add('complete');
            } else if (phase.id === currentBuildPhase) {
                card.classList.add('active');
            } else {
                card.classList.add('pending');
            }
            
            card.innerHTML = '<div class="phase-number">Phase ' + phase.id + '</div>' +
                '<div class="phase-name">' + phase.name + '</div>' +
                '<span class="phase-status status-' + this.getBuildPhaseStatus(phase.id) + '">' +
                this.getBuildPhaseStatusText(phase.id) + '</span>';
            
            buildGrid.appendChild(card);
        });
        
        this.designPhases.forEach(phase => {
            const card = document.createElement('div');
            card.className = 'phase-card';
            card.classList.add('pending');
            
            card.innerHTML = '<div class="phase-number">' + phase.id + '</div>' +
                '<div class="phase-name">' + phase.name + '</div>' +
                '<span class="phase-status status-pending">Pending</span>';
            
            designGrid.appendChild(card);
        });
    },
    
    renderStats() {
        const slices = this.getAllSlices();
        const complete = slices.filter(s => s.isComplete).length;
        const total = slices.length;
        const progress = total > 0 ? Math.round((complete / total) * 100) : 0;
        const blockers = this.getBlockersCount();
        
        document.getElementById('stat-slices').textContent = total;
        document.getElementById('stat-complete').textContent = complete;
        document.getElementById('stat-progress').textContent = progress + '%';
        document.getElementById('stat-blockers').textContent = blockers;
    },
    
    getBlockersCount() {
        const { blockers, phaseStates } = this.data;
        let count = 0;
        
        if (phaseStates) {
            phaseStates.forEach(state => {
                if (state.blockers) count += state.blockers.length;
            });
        }
        
        if (blockers) {
            count += blockers.filter(b => b.status !== 'resolved').length;
        }
        
        return count;
    },
    
    getCurrentBuildPhase() {
        const { phaseStates } = this.data;
        if (!phaseStates || phaseStates.length === 0) return 1;
        
        const latest = phaseStates[phaseStates.length - 1];
        const phaseMap = {
            'brief': 1,
            'slice': 2,
            'plan-slice': 3,
            'build': 4,
            'harden': 5,
            'ship': 6
        };
        
        return phaseMap[latest.current_phase] || 1;
    },
    
    getBuildPhaseStatus(phaseId) {
        const currentPhase = this.getCurrentBuildPhase();
        if (phaseId < currentPhase) return 'complete';
        if (phaseId === currentPhase) return 'in-progress';
        return 'pending';
    },
    
    getBuildPhaseStatusText(phaseId) {
        const status = this.getBuildPhaseStatus(phaseId);
        return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ');
    },
    
    renderSlicesOverview() {
        const list = document.getElementById('slices-list');
        list.innerHTML = '';
        
        const slices = this.getAllSlices();
        
        if (slices.length === 0) {
            list.innerHTML = '<div class="no-data">No slices found. Run /slice to create slices.</div>';
            return;
        }
        
        slices.forEach(slice => {
            const item = document.createElement('div');
            item.className = 'slice-item';
            
            if (slice.isCurrent) {
                item.classList.add('active');
            } else if (slice.isComplete) {
                item.classList.add('complete');
            }
            
            item.innerHTML = '<span class="slice-name">' + slice.name + '</span>' +
                '<span class="slice-status status-' + slice.status + '">' + slice.statusText + '</span>';
            
            list.appendChild(item);
        });
    },
    
    getAllSlices() {
        const { phaseStates, executionOutcomes, shippedData } = this.data;
        
        if (!phaseStates || phaseStates.length === 0) {
            return [];
        }
        
        const latest = phaseStates[phaseStates.length - 1];
        const currentSlice = latest.current_slice;
        const slices = latest.slices || [];
        
        return slices.map(sliceName => {
            const isComplete = shippedData && shippedData.some(s => s.slice === sliceName) ||
                              executionOutcomes && executionOutcomes.some(e => e.slice === sliceName && e.outcome === 'success');
            const isCurrent = sliceName === currentSlice;
            
            let status = 'pending';
            let statusText = 'Pending';
            
            if (isComplete) {
                status = 'complete';
                statusText = 'Complete';
            } else if (isCurrent) {
                status = 'in-progress';
                statusText = 'In Progress';
            }
            
            return {
                name: sliceName,
                isCurrent: isCurrent,
                isComplete: isComplete,
                status: status,
                statusText: statusText
            };
        });
    },
    
    renderPhasesView() {
        this.renderBuildPhaseTimeline();
        this.renderBuildPhaseDetails();
        this.renderDesignPhaseTimeline();
        this.renderDesignPhaseDetails();
    },
    
    renderBuildPhaseTimeline() {
        const timeline = document.getElementById('build-phase-timeline');
        timeline.innerHTML = '';
        
        const currentPhase = this.getCurrentBuildPhase();
        
        this.buildPhases.forEach(phase => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            
            if (phase.id < currentPhase) {
                item.classList.add('complete');
            } else if (phase.id === currentPhase) {
                item.classList.add('active');
            }
            
            item.innerHTML = '<div class="timeline-dot">' + phase.id + '</div>' +
                '<div class="timeline-label">' + phase.name + '</div>';
            
            timeline.appendChild(item);
        });
    },
    
    renderBuildPhaseDetails() {
        const grid = document.getElementById('build-phase-detail-grid');
        grid.innerHTML = '';
        
        const { phaseStates, confidenceData, executionOutcomes } = this.data;
        
        this.buildPhases.forEach(phase => {
            const card = document.createElement('div');
            card.className = 'phase-detail-card';
            
            const phaseMap = {
                'brief': 1, 'slice': 2, 'plan-slice': 3,
                'build': 4, 'harden': 5, 'ship': 6
            };
            
            const phaseData = phaseStates && phaseStates.find(s => phaseMap[s.current_phase] === phase.id);
            const confidence = confidenceData && confidenceData[phase.id - 1];
            const outcome = executionOutcomes && executionOutcomes[phase.id - 1];
            
            let html = '<div class="phase-detail-header">' +
                '<span class="phase-detail-title">Phase ' + phase.id + ': ' + phase.name + '</span>' +
                '<span class="phase-status status-' + this.getBuildPhaseStatus(phase.id) + '">' +
                this.getBuildPhaseStatusText(phase.id) + '</span></div>' +
                '<p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">' +
                phase.description + '</p>' +
                '<div class="phase-detail-row"><span class="phase-detail-label">Command</span>' +
                '<span class="phase-detail-value">' + phase.command + '</span></div>' +
                '<div class="phase-detail-row"><span class="phase-detail-label">Status</span>' +
                '<span class="phase-detail-value">' + (phaseData && phaseData.last_completed_step || 'Not started') + '</span></div>';
            
            if (confidence) {
                html += '<div class="phase-detail-row"><span class="phase-detail-label">Confidence</span>' +
                    '<span class="phase-detail-value">' + confidence.overall + '</span></div>';
            }
            
            if (outcome) {
                html += '<div class="phase-detail-row"><span class="phase-detail-label">Outcome</span>' +
                    '<span class="phase-detail-value">' + outcome.outcome + '</span></div>';
            }
            
            card.innerHTML = html;
            grid.appendChild(card);
        });
    },
    
    renderDesignPhaseTimeline() {
        const timeline = document.getElementById('design-phase-timeline');
        timeline.innerHTML = '';
        
        this.designPhases.forEach(phase => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.classList.add('pending');
            
            item.innerHTML = '<div class="timeline-dot">' + phase.id + '</div>' +
                '<div class="timeline-label">' + phase.name + '</div>';
            
            timeline.appendChild(item);
        });
    },
    
    renderDesignPhaseDetails() {
        const grid = document.getElementById('design-phase-detail-grid');
        grid.innerHTML = '';
        
        this.designPhases.forEach(phase => {
            const card = document.createElement('div');
            card.className = 'phase-detail-card';
            
            let html = '<div class="phase-detail-header">' +
                '<span class="phase-detail-title">' + phase.id + ': ' + phase.name + '</span>' +
                '<span class="phase-status status-pending">Pending</span></div>' +
                '<p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">' +
                phase.description + '</p>' +
                '<div class="phase-detail-row"><span class="phase-detail-label">Command</span>' +
                '<span class="phase-detail-value">' + phase.command + '</span></div>' +
                '<div class="phase-detail-row"><span class="phase-detail-label">Status</span>' +
                '<span class="phase-detail-value">Not started</span></div>';
            
            card.innerHTML = html;
            grid.appendChild(card);
        });
    },
    
    renderCommandsView() {
        const container = document.getElementById('commands-container');
        container.innerHTML = '';
        
        Object.entries(this.commands).forEach(([group, cmds]) => {
            const section = document.createElement('div');
            section.className = 'command-group';
            
            let html = '<div class="command-group-header">' + group + '</div>';
            
            cmds.forEach(cmd => {
                html += '<div class="command-item">' +
                    '<div class="command-name">' + cmd.name + '</div>' +
                    '<div class="command-meta">' +
                    '<span class="command-phase">' + cmd.phase + '</span>' +
                    '<span class="command-desc">' + cmd.desc + '</span>' +
                    '</div></div>';
            });
            
            section.innerHTML = html;
            container.appendChild(section);
        });
    },
    
    renderAgentsView() {
        this.renderAgentsFull();
        this.renderRegistry();
    },
    
    renderAgentsFull() {
        const grid = document.getElementById('agents-full-grid');
        grid.innerHTML = '';
        
        const { allAgents } = this.data;
        
        if (!allAgents || allAgents.length === 0) {
            grid.innerHTML = '<div class="no-data">No agents found.</div>';
            return;
        }
        
        allAgents.forEach(agent => {
            const card = document.createElement('div');
            card.className = 'agent-full-card';
            
            if (!agent.hasPerformanceData) {
                card.classList.add('no-data');
            }
            
            const successRate = agent.stats.totalTasks > 0 
                ? Math.round((agent.stats.successCount / agent.stats.totalTasks) * 100)
                : 0;
            
            const lastUsed = agent.stats.lastUsed 
                ? new Date(agent.stats.lastUsed).toLocaleDateString()
                : 'Never';
            
            card.innerHTML = '<div class="agent-full-name">' + agent.name + '</div>' +
                (agent.description ? '<div class="agent-full-desc">' + agent.description + '</div>' : '') +
                '<div class="agent-full-stats">' +
                '<div class="agent-full-stat"><span class="agent-full-stat-label">Total Tasks</span>' +
                '<span class="agent-full-stat-value">' + agent.stats.totalTasks + '</span></div>' +
                '<div class="agent-full-stat"><span class="agent-full-stat-label">Success Rate</span>' +
                '<span class="agent-full-stat-value">' + (agent.stats.totalTasks > 0 ? successRate + '%' : '-') + '</span></div>' +
                '<div class="agent-full-stat"><span class="agent-full-stat-label">Failures</span>' +
                '<span class="agent-full-stat-value">' + agent.stats.failureCount + '</span></div>' +
                '<div class="agent-full-stat"><span class="agent-full-stat-label">Last Used</span>' +
                '<span class="agent-full-stat-value">' + lastUsed + '</span></div>' +
                '</div>';
            
            grid.appendChild(card);
        });
    },
    
    renderRegistry() {
        const list = document.getElementById('registry-list');
        list.innerHTML = '';
        
        const { allAgents } = this.data;
        
        if (!allAgents || allAgents.length === 0) {
            list.innerHTML = '<div class="no-data">No registered agents.</div>';
            return;
        }
        
        allAgents.forEach(agent => {
            const item = document.createElement('div');
            item.className = 'registry-item';
            
            const role = agent.role || agent.description || 'No description';
            
            item.innerHTML = '<div><div class="registry-name">' + agent.name + '</div>' +
                '<div class="registry-capabilities">' + role + '</div></div>';
            
            list.appendChild(item);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
