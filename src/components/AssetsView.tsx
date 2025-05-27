
import { useState } from 'react';
import { Search, Grid, List } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";

interface Asset {
  id: number;
  title: string;
  description: string;
  category: string;
  categoryMain: string;
  icon: string;
}

const assetsData: Asset[] = [
  {
    id: 1,
    title: "Cognitive Telescope Network",
    description: "Automated telescopic follow-up of transient astronomical events",
    category: "Research | Astronomy",
    categoryMain: "Research",
    icon: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "Forome Anfisa Analyzer",
    description: "Genomics platform for doing research in rare disease diagnosis and prevention.",
    category: "Research | Healthcare",
    categoryMain: "Research",
    icon: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Cognitive Autonomous Racer",
    description: "Optimization algorithms and models for autonomous cars in a racing scenario.",
    category: "Research | Automotive",
    categoryMain: "Research",
    icon: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Sports AI Coaching Expert",
    description: "Analyzing sports biomechanics with AI to provide expert coaching guidance.",
    category: "Research | Sports",
    categoryMain: "Research",
    icon: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=64&h=64&fit=crop&crop=center"
  }
];

export function AssetsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const filteredAssets = assetsData.filter(asset =>
    asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neutral-900">
            Open Assets
          </h1>
          <Button className="bg-sky-600 hover:bg-sky-700 text-sky-200">
            Join the team
          </Button>
        </div>

        {/* Controls Section */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Toggle
                pressed={viewMode === 'card'}
                onPressedChange={(pressed) => setViewMode(pressed ? 'card' : 'table')}
                aria-label="Card view"
                className="data-[state=on]:bg-neutral-200"
              >
                <Grid className="h-4 w-4" />
              </Toggle>
              <Toggle
                pressed={viewMode === 'table'}
                onPressedChange={(pressed) => setViewMode(pressed ? 'table' : 'card')}
                aria-label="Table view"
                className="data-[state=on]:bg-neutral-200"
              >
                <List className="h-4 w-4" />
              </Toggle>
              <span className="text-sm text-neutral-600">Card / Table View</span>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAssets.map((asset) => (
                <Card key={asset.id} className="hover:shadow-lg transition-shadow cursor-pointer border border-neutral-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={asset.icon} 
                          alt={asset.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-base font-bold text-neutral-900 leading-tight">
                        {asset.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-neutral-900 line-clamp-3">
                        {asset.description}
                      </p>
                      
                      {/* Category */}
                      <p className="text-sm text-neutral-500">
                        <span className="font-bold">{asset.categoryMain}</span>
                        {asset.category.replace(asset.categoryMain, '')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-neutral-600">
              Table view - Implementation coming soon
            </div>
          )}

          {filteredAssets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">No assets found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
