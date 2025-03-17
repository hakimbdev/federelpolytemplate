import React from 'react';
import { Scaling as Seedling, BookOpen, Link, Tractor, Database, Users } from 'lucide-react';

const Programs = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div 
        className="h-[400px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl md:text-2xl">
              Comprehensive solutions for agricultural transformation
            </p>
          </div>
        </div>
      </div>

      {/* Main Programs */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Seedling,
                title: "Input Distribution",
                description: "Access to quality seeds, fertilizers, and modern farming tools",
                features: [
                  "Drought-resistant seeds",
                  "Organic fertilizers",
                  "Modern farming tools",
                  "Seasonal planning support"
                ]
              },
              {
                icon: BookOpen,
                title: "Capacity Building",
                description: "Training in climate-smart agriculture and modern techniques",
                features: [
                  "Climate-smart practices",
                  "Post-harvest management",
                  "Financial literacy",
                  "Cooperative governance"
                ]
              },
              {
                icon: Link,
                title: "Market Linkages",
                description: "Connecting farmers with processors and buyers",
                features: [
                  "Direct buyer connections",
                  "Price negotiation support",
                  "Quality control training",
                  "Contract farming opportunities"
                ]
              },
              {
                icon: Tractor,
                title: "Mechanization Support",
                description: "Access to modern farming equipment and machinery",
                features: [
                  "Tractor hiring services",
                  "Equipment training",
                  "Maintenance support",
                  "Subsidized access"
                ]
              },
              {
                icon: Database,
                title: "Digital Agriculture",
                description: "Leveraging technology for improved farming",
                features: [
                  "Mobile farming apps",
                  "Weather forecasting",
                  "Crop monitoring",
                  "Market information"
                ]
              },
              {
                icon: Users,
                title: "Cooperative Development",
                description: "Strengthening farmer groups and associations",
                features: [
                  "Group formation",
                  "Leadership training",
                  "Conflict resolution",
                  "Resource sharing"
                ]
              }
            ].map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <program.icon className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">{program.title}</h3>
                <p className="text-gray-600 mb-4 text-center">{program.description}</p>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="h-1.5 w-1.5 bg-green-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      
    </div>
  );
};

export default Programs;