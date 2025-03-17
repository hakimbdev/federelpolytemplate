import React from 'react';
import { ClipboardList, Users, Sprout, BarChart } from 'lucide-react';

const Implementation = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div 
        className="h-[400px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1590682680695-43b964a3ae17?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Implementation Guide</h1>
            <p className="text-xl md:text-2xl">
              A comprehensive approach to agricultural transformation
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Process */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Implementation Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: ClipboardList,
                title: "Planning",
                description: "Comprehensive assessment and strategy development",
                steps: [
                  "Stakeholder engagement",
                  "Baseline surveys",
                  "Resource mapping",
                  "Goal setting"
                ]
              },
              {
                icon: Users,
                title: "Community Engagement",
                description: "Building local partnerships and support",
                steps: [
                  "Community meetings",
                  "Leader involvement",
                  "Cooperative formation",
                  "Local advocacy"
                ]
              },
              {
                icon: Sprout,
                title: "Implementation",
                description: "Executing programs and initiatives",
                steps: [
                  "Training delivery",
                  "Resource distribution",
                  "Technical support",
                  "Market linkages"
                ]
              },
              {
                icon: BarChart,
                title: "Monitoring",
                description: "Tracking progress and impact",
                steps: [
                  "Data collection",
                  "Progress reviews",
                  "Impact assessment",
                  "Feedback loops"
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <phase.icon className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{phase.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.steps.map((step, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-2"></span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Components */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Implementation Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Governance Structure",
                content: "Our implementation is guided by a robust governance framework including national steering committees, state implementation teams, and local government committees."
              },
              {
                title: "Stakeholder Engagement",
                content: "We work closely with state governments, community leaders, NGOs, and development partners to ensure program success."
              },
              {
                title: "Resource Allocation",
                content: "Strategic distribution of resources across seven states, ensuring efficient use of inputs, training materials, and technology."
              },
              {
                title: "Technology Integration",
                content: "Leveraging digital solutions for program management, monitoring, and farmer support through mobile apps and data analytics."
              }
            ].map((component, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{component.title}</h3>
                <p className="text-gray-600">{component.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Implementation Timeline</h2>
          <div className="space-y-8">
            {[
              {
                phase: "Phase 1: Foundation",
                duration: "Months 1-3",
                activities: [
                  "Stakeholder engagement",
                  "Baseline surveys",
                  "Team formation",
                  "Initial planning"
                ]
              },
              {
                phase: "Phase 2: Mobilization",
                duration: "Months 4-6",
                activities: [
                  "Community sensitization",
                  "Resource procurement",
                  "Training preparation",
                  "Pilot programs"
                ]
              },
              {
                phase: "Phase 3: Full Implementation",
                duration: "Months 7-18",
                activities: [
                  "Program rollout",
                  "Regular monitoring",
                  "Adaptive management",
                  "Impact assessment"
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold">{phase.phase}</h3>
                  <span className="text-green-600 font-medium">{phase.duration}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {phase.activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center text-gray-600">
                      <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-2"></span>
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Implementation;