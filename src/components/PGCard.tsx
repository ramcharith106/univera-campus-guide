import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Shield } from 'lucide-react';
import { PG } from '@/lib/firebase';

interface PGCardProps {
  pg: PG;
}

const PGCard: React.FC<PGCardProps> = ({ pg }) => {
  return (
    <Card className="shadow-card hover:shadow-lg transition-smooth group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {pg.name}
            </CardTitle>
            <div className="flex items-center space-x-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{pg.location}</span>
            </div>
          </div>
          <Badge variant={pg.type === 'Boys' ? 'default' : pg.type === 'Girls' ? 'secondary' : 'outline'}>
            {pg.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-warning fill-current" />
            <span className="font-medium">{pg.rating}</span>
          </div>
          <div className="text-lg font-bold text-primary">
            ₹{pg.rent.toLocaleString()}/month
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">Facilities:</div>
          <div className="flex flex-wrap gap-1">
            {pg.facilities.map((facility, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {facility}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-foreground">Nearby Colleges:</div>
          <div className="flex flex-wrap gap-1">
            {pg.nearbyColleges.map((college, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {college}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
          </div>
          <div className="flex items-center text-sm text-success">
            <Shield className="h-4 w-4 mr-1" />
            Verified
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PGCard;