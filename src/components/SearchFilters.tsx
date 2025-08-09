import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';

export interface SearchFiltersType {
  search: string;
  city: string;
  state: string;
  type: string;
  minFees: number;
  maxFees: number;
  minRating: number;
  minPackage: number;
}

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onReset: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange, onReset }) => {
  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
  const states = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'West Bengal'];
  const types = ['Engineering', 'Medical', 'Arts', 'Commerce', 'Law'];

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filters</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Colleges</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name, location..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Select value={filters.city} onValueChange={(value) => updateFilter('city', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Select value={filters.state} onValueChange={(value) => updateFilter('state', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All States</SelectItem>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label>College Type</Label>
          <Select value={filters.type} onValueChange={(value) => updateFilter('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              {types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fees Range */}
        <div className="space-y-3">
          <Label>Annual Fees (in Lakhs)</Label>
          <div className="px-2">
            <Slider
              value={[filters.minFees, filters.maxFees]}
              onValueChange={([min, max]) => {
                updateFilter('minFees', min);
                updateFilter('maxFees', max);
              }}
              max={10}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>₹{filters.minFees}L</span>
              <span>₹{filters.maxFees}L</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label>Minimum Rating</Label>
          <div className="px-2">
            <Slider
              value={[filters.minRating]}
              onValueChange={([value]) => updateFilter('minRating', value)}
              max={5}
              min={0}
              step={0.1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">
              {filters.minRating.toFixed(1)} stars and above
            </div>
          </div>
        </div>

        {/* Package */}
        <div className="space-y-3">
          <Label>Minimum Average Package (in Lakhs)</Label>
          <div className="px-2">
            <Slider
              value={[filters.minPackage]}
              onValueChange={([value]) => updateFilter('minPackage', value)}
              max={25}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">
              ₹{filters.minPackage}L and above
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;