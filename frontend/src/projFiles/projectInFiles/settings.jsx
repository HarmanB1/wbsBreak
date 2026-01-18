import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Download,
  Upload,
  Users,
  Bell,
  Lock,
  Trash2,
  Archive,
  Copy,
  Share2,
  Calendar,
  Tag,
  Palette,
  FileText,
  Database,
  GitBranch,
  AlertTriangle,
  CheckCircle2,
  Globe,
  Zap,
  Clock,
  Target,
  FolderOpen,
  Link2,
  Code,
  Eye,
  EyeOff,
  Save,
  RotateCcw
} from 'lucide-react';

const SETTING_CATEGORIES = [
  {
    id: 'general',
    name: 'General',
    icon: Settings,
    sections: [
      {
        title: 'Project Information',
        settings: [
          { id: 'project-name', label: 'Project Name', type: 'text', value: 'Marketing Campaign Q1', description: 'The display name for this project' },
          { id: 'project-description', label: 'Description', type: 'textarea', value: 'Q1 2024 marketing campaign planning and execution', description: 'Brief overview of the project' },
          { id: 'project-code', label: 'Project Code', type: 'text', value: 'MKT-Q1-2024', description: 'Unique identifier for this project' },
          { id: 'project-status', label: 'Status', type: 'select', value: 'active', options: ['Planning', 'Active', 'On Hold', 'Completed', 'Archived'], description: 'Current project status' }
        ]
      },
      {
        title: 'Dates & Timeline',
        settings: [
          { id: 'start-date', label: 'Start Date', type: 'date', value: '2024-01-01', description: 'When the project begins' },
          { id: 'end-date', label: 'End Date', type: 'date', value: '2024-03-31', description: 'Expected completion date' },
          { id: 'timezone', label: 'Timezone', type: 'select', value: 'America/New_York', options: ['America/New_York', 'America/Los_Angeles', 'Europe/London', 'Asia/Tokyo'], description: 'Project timezone for deadlines' }
        ]
      }
    ]
  },
  {
    id: 'team',
    name: 'Team & Access',
    icon: Users,
    sections: [
      {
        title: 'Team Members',
        settings: [
          { id: 'project-owner', label: 'Project Owner', type: 'user-select', value: 'Sarah Johnson', description: 'Primary project manager' },
          { id: 'default-role', label: 'Default Member Role', type: 'select', value: 'member', options: ['Viewer', 'Member', 'Editor', 'Admin'], description: 'Role assigned to new members' }
        ]
      },
      {
        title: 'Access Control',
        settings: [
          { id: 'visibility', label: 'Project Visibility', type: 'select', value: 'private', options: ['Private', 'Team', 'Organization', 'Public'], description: 'Who can view this project' },
          { id: 'require-approval', label: 'Require Approval for New Members', type: 'toggle', value: true, description: 'Owner must approve new member requests' },
          { id: 'allow-guests', label: 'Allow Guest Access', type: 'toggle', value: false, description: 'Enable read-only guest links' }
        ]
      }
    ]
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: Bell,
    sections: [
      {
        title: 'Email Notifications',
        settings: [
          { id: 'notify-updates', label: 'Task Updates', type: 'toggle', value: true, description: 'Get notified when tasks are updated' },
          { id: 'notify-assignments', label: 'New Assignments', type: 'toggle', value: true, description: 'Alert when assigned to tasks' },
          { id: 'notify-mentions', label: 'Mentions', type: 'toggle', value: true, description: 'When someone @mentions you' },
          { id: 'notify-deadlines', label: 'Deadline Reminders', type: 'toggle', value: true, description: 'Reminders before task deadlines' },
          { id: 'notify-submissions', label: 'Submission Reviews', type: 'toggle', value: true, description: 'When submissions need review' }
        ]
      },
      {
        title: 'Notification Preferences',
        settings: [
          { id: 'digest-frequency', label: 'Digest Frequency', type: 'select', value: 'daily', options: ['Real-time', 'Hourly', 'Daily', 'Weekly', 'Never'], description: 'How often to receive email digests' },
          { id: 'quiet-hours', label: 'Quiet Hours', type: 'toggle', value: false, description: 'Pause notifications during set hours' }
        ]
      }
    ]
  },
  {
    id: 'export',
    name: 'Export & Import',
    icon: Download,
    sections: [
      {
        title: 'Export Options',
        settings: [
          { id: 'export-format', label: 'Default Export Format', type: 'select', value: 'pdf', options: ['PDF', 'Excel', 'CSV', 'JSON', 'MS Project'], description: 'Preferred format for exports' },
          { id: 'export-includes', label: 'Include in Exports', type: 'multi-select', value: ['tasks', 'timeline', 'files'], options: ['Tasks', 'Timeline', 'Files', 'Comments', 'History'], description: 'What data to include' }
        ]
      },
      {
        title: 'Quick Actions',
        buttons: [
          { id: 'export-wbs', label: 'Export WBS Tree', icon: Download, variant: 'primary', description: 'Download complete WBS structure' },
          { id: 'export-timeline', label: 'Export Timeline', icon: Calendar, variant: 'primary', description: 'Download Gantt chart and timeline' },
          { id: 'export-all', label: 'Export Everything', icon: Database, variant: 'secondary', description: 'Full project backup' },
          { id: 'import-project', label: 'Import Data', icon: Upload, variant: 'secondary', description: 'Import from file or another project' }
        ]
      }
    ]
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Zap,
    sections: [
      {
        title: 'Connected Services',
        settings: [
          { id: 'slack-integration', label: 'Slack Workspace', type: 'integration', connected: true, value: 'team-workspace', description: 'Send notifications to Slack' },
          { id: 'github-integration', label: 'GitHub Repository', type: 'integration', connected: false, value: null, description: 'Link code commits to tasks' },
          { id: 'google-drive', label: 'Google Drive', type: 'integration', connected: true, value: 'project-folder', description: 'Sync files with Drive' },
          { id: 'jira-integration', label: 'Jira', type: 'integration', connected: false, value: null, description: 'Two-way task sync' }
        ]
      },
      {
        title: 'Webhooks',
        settings: [
          { id: 'webhook-url', label: 'Webhook URL', type: 'text', value: '', description: 'Receive real-time project updates' },
          { id: 'webhook-events', label: 'Trigger Events', type: 'multi-select', value: [], options: ['Task Created', 'Task Updated', 'Task Completed', 'Submission Made'], description: 'Which events trigger webhooks' }
        ]
      }
    ]
  },
  {
    id: 'customization',
    name: 'Customization',
    icon: Palette,
    sections: [
      {
        title: 'Appearance',
        settings: [
          { id: 'project-color', label: 'Project Color', type: 'color', value: '#3B82F6', description: 'Theme color for this project' },
          { id: 'project-icon', label: 'Project Icon', type: 'icon-select', value: 'target', description: 'Icon shown in sidebar' },
          { id: 'custom-fields', label: 'Custom Task Fields', type: 'toggle', value: false, description: 'Add custom metadata to tasks' }
        ]
      },
      {
        title: 'Task Templates',
        settings: [
          { id: 'default-template', label: 'Default Task Template', type: 'select', value: 'standard', options: ['Standard', 'Development', 'Design', 'Marketing'], description: 'Template for new tasks' },
          { id: 'auto-assign', label: 'Auto-assign Tasks', type: 'toggle', value: false, description: 'Automatically assign based on rules' }
        ]
      }
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: Code,
    sections: [
      {
        title: 'Project Settings',
        settings: [
          { id: 'auto-save', label: 'Auto-save Changes', type: 'toggle', value: true, description: 'Automatically save modifications' },
          { id: 'version-history', label: 'Enable Version History', type: 'toggle', value: true, description: 'Track all project changes' },
          { id: 'task-dependencies', label: 'Enforce Task Dependencies', type: 'toggle', value: false, description: 'Block tasks until dependencies complete' },
          { id: 'time-tracking', label: 'Enable Time Tracking', type: 'toggle', value: false, description: 'Track time spent on tasks' }
        ]
      },
      {
        title: 'Data & Privacy',
        settings: [
          { id: 'data-retention', label: 'Data Retention Period', type: 'select', value: '2-years', options: ['6 months', '1 year', '2 years', 'Forever'], description: 'How long to keep deleted items' },
          { id: 'analytics', label: 'Enable Analytics', type: 'toggle', value: true, description: 'Track project performance metrics' }
        ]
      }
    ]
  },
  {
    id: 'danger',
    name: 'Danger Zone',
    icon: AlertTriangle,
    sections: [
      {
        title: 'Destructive Actions',
        buttons: [
          { id: 'archive-project', label: 'Archive Project', icon: Archive, variant: 'warning', description: 'Archive this project (can be restored)' },
          { id: 'duplicate-project', label: 'Duplicate Project', icon: Copy, variant: 'secondary', description: 'Create a copy of this project' },
          { id: 'transfer-ownership', label: 'Transfer Ownership', icon: Users, variant: 'secondary', description: 'Transfer to another team member' },
          { id: 'delete-project', label: 'Delete Project', icon: Trash2, variant: 'danger', description: 'Permanently delete this project (cannot be undone)' }
        ]
      }
    ]
  }
];

export const SettingProject = () =>{
  const [activeCategory, setActiveCategory] = useState('general');
  const [settings, setSettings] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (settingId, value) => {
    setSettings({ ...settings, [settingId]: value });
    setHasChanges(true);
  };

  const saveChanges = () => {
    console.log('Saving settings:', settings);
    setHasChanges(false);
  };

  const resetChanges = () => {
    setSettings({});
    setHasChanges(false);
  };

  const currentCategory = SETTING_CATEGORIES.find(cat => cat.id === activeCategory);

  const renderSetting = (setting) => {
    switch (setting.type) {
      case 'text':
        return (
          <input
            type="text"
            defaultValue={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'textarea':
        return (
          <textarea
            defaultValue={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            defaultValue={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        );

      case 'select':
      case 'user-select':
        return (
          <select
            defaultValue={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            {(setting.options || []).map(option => (
              <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={setting.value}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );

      case 'color':
        return (
          <div className="flex items-center gap-3">
            <input
              type="color"
              defaultValue={setting.value}
              onChange={(e) => handleSettingChange(setting.id, e.target.value)}
              className="w-16 h-10 rounded-lg cursor-pointer border border-gray-300"
            />
            <span className="text-sm text-gray-600">{setting.value}</span>
          </div>
        );

      case 'integration':
        return (
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${setting.connected
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
              }`}>
              {setting.connected ? 'Connected' : 'Not Connected'}
            </span>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {setting.connected ? 'Configure' : 'Connect'}
            </button>
          </div>
        );

      default:
        return <span className="text-gray-400">Not implemented</span>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-6 h-6 text-gray-600" />
            Settings
          </h2>
        </div>

        <nav className="p-4 space-y-1">
          {SETTING_CATEGORIES.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            const isDanger = category.id === 'danger';

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                  ? isDanger
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                  : isDanger
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {React.createElement(currentCategory.icon, { className: 'w-7 h-7 text-blue-600' })}
                {currentCategory.name}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {currentCategory.id === 'general' && 'Manage basic project information and settings'}
                {currentCategory.id === 'team' && 'Control team access and permissions'}
                {currentCategory.id === 'notifications' && 'Configure how you receive updates'}
                {currentCategory.id === 'export' && 'Export and backup project data'}
                {currentCategory.id === 'integrations' && 'Connect with external tools and services'}
                {currentCategory.id === 'customization' && 'Personalize your project workspace'}
                {currentCategory.id === 'advanced' && 'Advanced configuration options'}
                {currentCategory.id === 'danger' && 'Destructive actions - proceed with caution'}
              </p>
            </div>

            {hasChanges && (
              <div className="flex items-center gap-2">
                <button
                  onClick={resetChanges}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={saveChanges}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl space-y-8">
            {currentCategory.sections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
                </div>

                <div className="p-6">
                  {/* Regular Settings */}
                  {section.settings && (
                    <div className="space-y-6">
                      {section.settings.map(setting => (
                        <div key={setting.id} className="flex items-start justify-between gap-8">
                          <div className="flex-1">
                            <label className="block font-semibold text-gray-800 mb-1">
                              {setting.label}
                            </label>
                            {setting.description && (
                              <p className="text-sm text-gray-600">{setting.description}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0" style={{ minWidth: '300px' }}>
                            {renderSetting(setting)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {section.buttons && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.buttons.map(button => {
                        const Icon = button.icon;
                        return (
                          <button
                            key={button.id}
                            className={`flex items-start gap-4 p-4 rounded-lg border-2 transition-all text-left ${button.variant === 'danger'
                              ? 'border-red-300 bg-red-50 hover:bg-red-100 hover:border-red-400'
                              : button.variant === 'warning'
                                ? 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100 hover:border-yellow-400'
                                : button.variant === 'primary'
                                  ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 hover:border-blue-400'
                                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'
                              }`}
                          >
                            <Icon className={`w-6 h-6 flex-shrink-0 ${button.variant === 'danger' ? 'text-red-600' :
                              button.variant === 'warning' ? 'text-yellow-600' :
                                button.variant === 'primary' ? 'text-blue-600' :
                                  'text-gray-600'
                              }`} />
                            <div className="flex-1">
                              <div className={`font-semibold mb-1 ${button.variant === 'danger' ? 'text-red-700' :
                                button.variant === 'warning' ? 'text-yellow-700' :
                                  button.variant === 'primary' ? 'text-blue-700' :
                                    'text-gray-700'
                                }`}>
                                {button.label}
                              </div>
                              <div className="text-sm text-gray-600">{button.description}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
