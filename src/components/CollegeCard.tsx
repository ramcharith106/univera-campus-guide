import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, TrendingUp, Eye, GitCompare } from 'lucide-react';
import { College } from '@/lib/firebase';

interface CollegeCardProps {
  college: College;
  onViewDetails: (id: string) => void;
  onCompare: (college: College) => void;
  isInComparison?: boolean;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ 
  college, 
  onViewDetails, 
  onCompare, 
  isInComparison = false 
}) => {
  return (
    <Card className="shadow-card hover:shadow-lg transition-smooth group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {college.name}
            </CardTitle>
            <div className="flex items-center space-x-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{college.location}</span>
            </div>
          </div>
          <Badge variant="secondary">{college.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-warning fill-current" />
            <span className="font-medium">{college.rating}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            ₹{(college.fees / 100000).toFixed(1)}L fees
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <div>
              <div className="font-medium">₹{(college.avgPackage / 100000).toFixed(1)}L</div>
              <div className="text-muted-foreground">Avg Package</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <div className="font-medium">{college.placementPercentage}%</div>
              <div className="text-muted-foreground">Placed</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {college.courses.slice(0, 2).map((course, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {course}
            </Badge>
          ))}
          {college.courses.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{college.courses.length - 2} more
            </Badge>
          )}
        </div>

        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(college.id)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          <Button 
            variant={isInComparison ? "default" : "outline"} 
            size="sm"
            onClick={() => onCompare(college)}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;