import React, { useState } from 'react';
import './Home.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'mine'
  const [expandedProgress, setExpandedProgress] = useState(null);

  const projects = {
    todo: [
      { 
        id: 1, 
        title: 'Design Club Logo', 
        club: 'Art Club', 
        priority: 'high',
        lead: { name: 'Sarah J.', avatar: 'S', role: 'Designer' },
        team: [
          { name: 'Mike C.', avatar: 'M', role: 'Designer' },
        ],
        dueDate: 'Jan 30',
        assignedToMe: false
      },
      { 
        id: 2, 
        title: 'Prepare Debate Topics', 
        club: 'Debate Team', 
        priority: 'medium',
        lead: { name: 'John D.', avatar: 'J', role: 'Lead' },
        team: [],
        dueDate: 'Feb 1',
        assignedToMe: false
      }
    ],
    inProgress: [
      { 
        id: 3, 
        title: 'Build Website', 
        club: 'Tech Club', 
        priority: 'high',
        lead: { name: 'You', avatar: 'E', role: 'Dev Lead' },
        team: [
          { name: 'Alex K.', avatar: 'A', role: 'Developer' },
        ],
        dueDate: 'Feb 5', 
        progress: 65,
        milestones: { completed: 3, total: 5 },
        checklist: [
          { task: 'Design mockups', done: true },
          { task: 'Set up React project', done: true },
          { task: 'Build components', done: true },
          { task: 'Add authentication', done: false },
          { task: 'Deploy to production', done: false }
        ],
        assignedToMe: true,
        messages: 12,
        files: 8,
        lastActivity: '2h ago'
      },
      { 
        id: 4, 
        title: 'Plan Exhibition', 
        club: 'Art Club', 
        priority: 'medium',
        lead: { name: 'Sarah J.', avatar: 'S', role: 'Curator' },
        team: [
          { name: 'Emma L.', avatar: 'E', role: 'Coordinator' },
        ],
        dueDate: 'Feb 10', 
        progress: 40,
        milestones: { completed: 2, total: 6 },
        checklist: [
          { task: 'Choose venue', done: true },
          { task: 'Select artworks', done: true },
          { task: 'Print invitations', done: false },
          { task: 'Arrange catering', done: false },
          { task: 'Setup displays', done: false },
          { task: 'Final walkthrough', done: false }
        ],
        assignedToMe: false,
        messages: 5,
        files: 3,
        lastActivity: '1d ago'
      }
    ],
    completed: [
      { 
        id: 5, 
        title: 'Workshop Preparation', 
        club: 'Tech Club',
        lead: { name: 'You', avatar: 'E', role: 'Organizer' },
        team: [],
        completedDate: 'Jan 20',
        assignedToMe: true
      }
    ]
  };

  const filteredProjects = viewMode === 'mine' 
    ? {
        todo: projects.todo.filter(p => p.assignedToMe),
        inProgress: projects.inProgress.filter(p => p.assignedToMe),
        completed: projects.completed.filter(p => p.assignedToMe)
      }
    : projects;

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'var(--accent-red)';
      case 'medium': return 'var(--accent-yellow)';
      case 'low': return 'var(--accent-green)';
      default: return 'var(--text-secondary)';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'high': return '🔴 High Priority';
      case 'medium': return '🟡 Medium';
      case 'low': return '🟢 Low';
      default: return '';
    }
  };

  const ProjectCard = ({ project, status }) => (
    <div 
      onClick={() => setSelectedProject(project)}
      style={{
        background: 'var(--bg-tertiary)',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'all var(--transition-base)',
        border: '1px solid var(--border-color)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Project Header */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <h4 style={{ 
            margin: 0, 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            fontSize: '15px',
            flex: 1
          }}>
            {project.title}
          </h4>
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '8px'
        }}>
          <span style={{ 
            fontSize: '12px', 
            color: 'var(--text-secondary)',
            fontWeight: 500
          }}>
            {project.club}
          </span>
          {project.priority && (
            <>
              <span style={{ color: 'var(--text-secondary)' }}>•</span>
              <span style={{ 
                fontSize: '11px', 
                fontWeight: 600,
                color: getPriorityColor(project.priority)
              }}>
                {getPriorityLabel(project.priority)}
              </span>
            </>
          )}
        </div>

        {/* Lead & Team */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          marginTop: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-green))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
              fontWeight: 600,
              border: '2px solid var(--bg-tertiary)'
            }}>
              {project.lead.avatar}
            </div>
            <div style={{ fontSize: '12px' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {project.lead.name}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                {project.lead.role}
              </div>
            </div>
          </div>

          {project.team && project.team.length > 0 && (
            <>
              <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>+</span>
              {project.team.slice(0, 2).map((member, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #9333EA, #F97316)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white',
                    fontWeight: 600
                  }}>
                    {member.avatar}
                  </div>
                </div>
              ))}
              {project.team.length > 2 && (
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  +{project.team.length - 2}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* Progress Bar with Milestones */}
      {project.progress !== undefined && (
        <div 
          style={{ marginBottom: '12px', cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            setExpandedProgress(expandedProgress === project.id ? null : project.id);
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px'
          }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {project.milestones.completed}/{project.milestones.total} tasks • {project.progress}%
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
              {expandedProgress === project.id ? '▼' : '▶'} Details
            </div>
          </div>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            background: 'var(--bg-primary)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${project.progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-green))',
              transition: 'width 0.5s ease-out'
            }}></div>
          </div>
          
          {/* Expanded Checklist */}
          {expandedProgress === project.id && project.checklist && (
            <div style={{ 
              marginTop: '12px', 
              padding: '12px',
              background: 'var(--bg-secondary)',
              borderRadius: '6px',
              fontSize: '12px'
            }}>
              {project.checklist.map((item, idx) => (
                <div key={idx} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  marginBottom: '8px',
                  color: item.done ? 'var(--text-secondary)' : 'var(--text-primary)'
                }}>
                  <span style={{ fontSize: '14px' }}>
                    {item.done ? '✅' : '⬜'}
                  </span>
                  <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer: Due Date & Actions */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          📅 {status === 'completed' ? `Completed ${project.completedDate}` : `Due ${project.dueDate}`}
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {project.messages !== undefined && (
            <div style={{
              padding: '4px 8px',
              background: 'var(--bg-secondary)',
              borderRadius: '4px',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              💬 {project.messages}
            </div>
          )}
          {project.files !== undefined && (
            <div style={{
              padding: '4px 8px',
              background: 'var(--bg-secondary)',
              borderRadius: '4px',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              📎 {project.files}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '6px', 
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--border-color)'
      }}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert('View project details');
          }}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: 'var(--accent-primary)',
            border: 'none',
            borderRadius: '6px',
            color: 'white',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          View
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert('Update project');
          }}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Update
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            alert('Message team');
          }}
          style={{
            padding: '8px 12px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          💬
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-greeting">
          <h1>Projects</h1>
          <span className="school-name">Lightweight Notion + Trello for clubs</span>
        </div>
        <button style={{
          padding: '10px 20px',
          background: 'var(--accent-primary)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600
        }}>
          + Create Project
        </button>
      </div>

      {/* Toggle: My Tasks vs All Projects */}
      <section style={{ marginBottom: '24px' }}>
        <div style={{ 
          display: 'inline-flex',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          padding: '4px'
        }}>
          <button
            onClick={() => setViewMode('mine')}
            style={{
              padding: '8px 16px',
              background: viewMode === 'mine' ? 'var(--accent-primary)' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: viewMode === 'mine' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all var(--transition-base)'
            }}
          >
            🔘 My Assigned Tasks
          </button>
          <button
            onClick={() => setViewMode('all')}
            style={{
              padding: '8px 16px',
              background: viewMode === 'all' ? 'var(--accent-primary)' : 'transparent',
              border: 'none',
              borderRadius: '6px',
              color: viewMode === 'all' ? 'white' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all var(--transition-base)'
            }}
          >
            🔘 All Club Projects
          </button>
        </div>
      </section>

      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
          {/* To Do Column */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>📋 To Do</h3>
              <div style={{
                background: 'var(--bg-tertiary)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}>
                {filteredProjects.todo.length}
              </div>
            </div>
            {filteredProjects.todo.map((project) => (
              <ProjectCard key={project.id} project={project} status="todo" />
            ))}
          </div>

          {/* In Progress Column */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>🔄 In Progress</h3>
              <div style={{
                background: 'rgba(59, 130, 246, 0.15)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '13px',
                color: 'var(--accent-primary)',
                fontWeight: 600
              }}>
                {filteredProjects.inProgress.length}
              </div>
            </div>
            {filteredProjects.inProgress.map((project) => (
              <ProjectCard key={project.id} project={project} status="inProgress" />
            ))}
          </div>

          {/* Completed Column */}
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>✓ Completed</h3>
              <div style={{
                background: 'rgba(34, 197, 94, 0.15)',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '13px',
                color: 'var(--accent-green)',
                fontWeight: 600
              }}>
                {filteredProjects.completed.length}
              </div>
            </div>
            {filteredProjects.completed.map((project) => (
              <div 
                key={project.id}
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  border: '1px solid var(--border-color)',
                  opacity: 0.8
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)', textDecoration: 'line-through' }}>
                  {project.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {project.club} • Completed {project.completedDate}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-green))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white',
                    fontWeight: 600
                  }}>
                    {project.lead.avatar}
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {project.lead.name} • {project.lead.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
